import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const API_KEY = process.env.JULES_API_KEY;

if (!API_KEY) {
  console.error("JULES_API_KEY environment variable is not set.");
  process.exit(1);
}

const BASE_URL = "https://jules.googleapis.com/v1alpha";

async function fetchJules(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "x-goog-api-key": API_KEY,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Jules API error: ${response.status} ${response.statusText}\n${errorBody}`);
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

const server = new Server(
  {
    name: "jules-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "jules_list_sources",
        description: "List available sources connected to Jules (e.g., GitHub repositories).",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "jules_create_session",
        description: "Create a new session with Jules for a specific source context.",
        inputSchema: {
          type: "object",
          properties: {
            prompt: { type: "string", description: "The initial prompt for the session." },
            source: { type: "string", description: "The source name (e.g., sources/github/owner/repo)." },
            startingBranch: { type: "string", description: "The starting branch (e.g., main)." },
            automationMode: { type: "string", description: "Automation mode, e.g., AUTO_CREATE_PR", enum: ["AUTO_CREATE_PR"] },
            title: { type: "string", description: "Title of the session." },
            requirePlanApproval: { type: "boolean", description: "Require explicit plan approval." },
          },
          required: ["prompt", "source", "startingBranch", "title"],
        },
      },
      {
        name: "jules_list_sessions",
        description: "List recent Jules sessions.",
        inputSchema: {
          type: "object",
          properties: {
            pageSize: { type: "number", description: "Number of sessions to return." }
          },
        },
      },
      {
        name: "jules_approve_plan",
        description: "Approve a plan for a specific session.",
        inputSchema: {
          type: "object",
          properties: {
            sessionId: { type: "string", description: "The session ID (just the number or sessions/ID)." }
          },
          required: ["sessionId"],
        },
      },
      {
        name: "jules_list_activities",
        description: "List activities within a session to see agent responses and progress.",
        inputSchema: {
          type: "object",
          properties: {
            sessionId: { type: "string", description: "The session ID." },
            pageSize: { type: "number", description: "Number of activities to return." }
          },
          required: ["sessionId"],
        },
      },
      {
        name: "jules_send_message",
        description: "Send a follow-up message to the agent in a session.",
        inputSchema: {
          type: "object",
          properties: {
            sessionId: { type: "string", description: "The session ID." },
            prompt: { type: "string", description: "The message prompt." }
          },
          required: ["sessionId", "prompt"],
        },
      }
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    let result;

    switch (request.params.name) {
      case "jules_list_sources": {
        result = await fetchJules("/sources");
        break;
      }
      
      case "jules_create_session": {
        const { prompt, source, startingBranch, automationMode, title, requirePlanApproval } = request.params.arguments;
        const body = {
          prompt,
          title,
          sourceContext: {
            source,
            githubRepoContext: { startingBranch }
          }
        };
        if (automationMode) body.automationMode = automationMode;
        if (requirePlanApproval !== undefined) body.requirePlanApproval = requirePlanApproval;

        result = await fetchJules("/sessions", {
          method: "POST",
          body: JSON.stringify(body),
        });
        break;
      }

      case "jules_list_sessions": {
        const pageSize = request.params.arguments?.pageSize || 5;
        result = await fetchJules(`/sessions?pageSize=${pageSize}`);
        break;
      }

      case "jules_approve_plan": {
        let { sessionId } = request.params.arguments;
        if (!sessionId.startsWith("sessions/")) sessionId = `sessions/${sessionId}`;
        result = await fetchJules(`/${sessionId}:approvePlan`, { method: "POST", body: "{}" });
        break;
      }

      case "jules_list_activities": {
        let { sessionId, pageSize } = request.params.arguments;
        if (!sessionId.startsWith("sessions/")) sessionId = `sessions/${sessionId}`;
        pageSize = pageSize || 30;
        result = await fetchJules(`/${sessionId}/activities?pageSize=${pageSize}`);
        break;
      }

      case "jules_send_message": {
        let { sessionId, prompt } = request.params.arguments;
        if (!sessionId.startsWith("sessions/")) sessionId = `sessions/${sessionId}`;
        result = await fetchJules(`/${sessionId}:sendMessage`, {
          method: "POST",
          body: JSON.stringify({ prompt }),
        });
        break;
      }

      default:
        throw new Error("Unknown tool");
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing ${request.params.name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Jules MCP server is running on stdio");
}

run().catch(console.error);
