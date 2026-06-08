import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

/* ─── Service Categories ─── */
type Category = 'ALL' | 'AI' | 'WEB' | 'INFRA' | 'BIZ';

interface Service {
  num: string;
  title: string;
  desc: string;
  logs: string[];
  tags: Category[];
}

const services: Service[] = [
  {
    num: "01",
    title: "Custom Chatbots",
    desc: "24/7 Sales & Support Reps",
    logs: ["> training knowledge base...", "> 24/7 sales rep active..."],
    tags: ['AI']
  },
  {
    num: "02",
    title: "Full-Stack Web",
    desc: "Modern & Secure Architectures",
    logs: ["> compiling frontend...", "> establishing secure backend..."],
    tags: ['WEB']
  },
  {
    num: "03",
    title: "Cloud Infra",
    desc: "Containerized Deployments",
    logs: ["> provisioning GCP compute...", "> deploying docker containers..."],
    tags: ['INFRA']
  },
  {
    num: "04",
    title: "AI Dashboard",
    desc: "Smart Business Analytics",
    logs: ["> connecting data sources...", "> rendering analytics panels...", "> AI insights generated..."],
    tags: ['AI', 'BIZ']
  },
  {
    num: "05",
    title: "Local LLM Setup",
    desc: "Private AI On Your Machine",
    logs: ["> downloading model weights...", "> configuring GPU inference...", "> local AI server active..."],
    tags: ['AI', 'INFRA']
  },
  {
    num: "06",
    title: "Portfolio Sites",
    desc: "Professional Web Presence",
    logs: ["> scaffolding site structure...", "> deploying to custom domain..."],
    tags: ['WEB']
  },
  {
    num: "07",
    title: "VPS Setup",
    desc: "Your Own Cloud Server",
    logs: ["> spinning up instance...", "> hardening firewall rules...", "> server deployed & secured..."],
    tags: ['INFRA']
  },
  {
    num: "08",
    title: "Domain & Hosting",
    desc: "Get Your Business Online",
    logs: ["> registering domain...", "> configuring DNS records...", "> SSL certificates active..."],
    tags: ['INFRA', 'BIZ']
  },
  {
    num: "09",
    title: "E-Commerce Store",
    desc: "Start Selling Online",
    logs: ["> building product catalog...", "> integrating payment flow...", "> storefront live..."],
    tags: ['WEB', 'BIZ']
  },
  // ── Below fold ──
  {
    num: "10",
    title: "Workflow Bots",
    desc: "Automate Repetitive Tasks",
    logs: ["> mapping workflow triggers...", "> deploying automation agents...", "> tasks automated..."],
    tags: ['AI', 'BIZ']
  },
  {
    num: "11",
    title: "Business Email",
    desc: "Professional Mail Systems",
    logs: ["> configuring mail server...", "> setting up SPF & DKIM...", "> professional inbox ready..."],
    tags: ['BIZ', 'INFRA']
  },
  {
    num: "12",
    title: "Payment Gateway",
    desc: "Accept Online Payments",
    logs: ["> integrating payment processor...", "> webhook listeners active...", "> payments flowing..."],
    tags: ['BIZ', 'WEB']
  },
  {
    num: "13",
    title: "SEO & Analytics",
    desc: "Get Found on Google",
    logs: ["> crawling site structure...", "> optimizing meta tags...", "> search rankings climbing..."],
    tags: ['WEB']
  },
  {
    num: "14",
    title: "Landing Pages",
    desc: "High-Converting Sales Pages",
    logs: ["> A/B testing layouts...", "> optimizing call-to-actions...", "> conversion rate boosted..."],
    tags: ['WEB']
  },
  {
    num: "15",
    title: "Inventory Mgmt",
    desc: "AI-Powered Stock Control",
    logs: ["> syncing product database...", "> training demand predictor...", "> stock alerts configured..."],
    tags: ['AI', 'BIZ']
  },
  {
    num: "16",
    title: "CRM Setup",
    desc: "Customer Management System",
    logs: ["> importing contact lists...", "> configuring sales pipeline...", "> CRM dashboard live..."],
    tags: ['BIZ']
  },
  {
    num: "17",
    title: "Data Migration",
    desc: "Move Your Business Data",
    logs: ["> scanning legacy systems...", "> mapping data schema...", "> migration complete. 0 loss..."],
    tags: ['BIZ', 'INFRA']
  },
  {
    num: "18",
    title: "API Integration",
    desc: "Connect All Your Tools",
    logs: ["> mapping API endpoints...", "> building middleware layer...", "> systems synchronized..."],
    tags: ['INFRA', 'WEB']
  },
  {
    num: "19",
    title: "Social Bots",
    desc: "Automated Posts & Growth",
    logs: ["> scheduling content queue...", "> deploying engagement bots...", "> social reach expanding..."],
    tags: ['AI', 'BIZ']
  },
  {
    num: "20",
    title: "Backup Systems",
    desc: "Never Lose Your Data",
    logs: ["> configuring backup cron...", "> encrypting snapshots...", "> disaster recovery ready..."],
    tags: ['INFRA']
  },
  {
    num: "21",
    title: "AI Content Gen",
    desc: "Automated Copy & Blogs",
    logs: ["> training brand voice model...", "> generating content pipeline...", "> publishing workflow active..."],
    tags: ['AI', 'WEB']
  },
  {
    num: "22",
    title: "Enterprise RAG",
    desc: "Data Pipelines & Multi-LLM",
    logs: ["> indexing vector db...", "> embedding documents...", "> semantic search active..."],
    tags: ['AI']
  },
  {
    num: "23",
    title: "AI Voice Orders",
    desc: "Voice-First Commerce",
    logs: ["> intercepting orders...", "> initiating AI voice confirmation..."],
    tags: ['AI', 'BIZ']
  },
  {
    num: "24",
    title: "Digital Brand",
    desc: "Brand Strategy & Identity Consult",
    logs: ["> auditing brand presence...", "> mapping competitor landscape...", "> strategy deck compiled..."],
    tags: ['BIZ', 'WEB']
  },
  {
    num: "25",
    title: "Cyber Audit",
    desc: "Vulnerability Assessment",
    logs: ["> scanning network surface...", "> enumerating attack vectors...", "> audit report generated..."],
    tags: ['INFRA']
  },
  {
    num: "26",
    title: "Security Audit",
    desc: "Compliance & Hardening",
    logs: ["> reviewing access controls...", "> testing auth flows...", "> compliance checklist passed..."],
    tags: ['INFRA', 'BIZ']
  },
  {
    num: "27",
    title: "Auto Security",
    desc: "Red-Teaming Agents",
    logs: ["> deploying red-team agents...", "> compiling threat model..."],
    tags: ['INFRA', 'AI']
  }
];

const categories: { key: Category; label: string }[] = [
  { key: 'ALL', label: 'ALL' },
  { key: 'AI', label: 'AI & AUTO' },
  { key: 'WEB', label: 'WEB & APPS' },
  { key: 'INFRA', label: 'INFRA' },
  { key: 'BIZ', label: 'BUSINESS' },
];

const INITIAL_VISIBLE = 9;

export default function ServicesGrid() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return services.filter(s => {
      const matchesCategory = activeCategory === 'ALL' || s.tags.includes(activeCategory);
      const q = search.toLowerCase();
      const matchesSearch = q === '' ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  // When searching or filtering, show all results. Otherwise respect the fold.
  const isFiltering = search !== '' || activeCategory !== 'ALL';
  const visibleServices = isFiltering ? filtered : (showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE));
  const hasMore = !isFiltering && filtered.length > INITIAL_VISIBLE;

  // Pad count for clean grid borders
  const lgPad = visibleServices.length > 0 && visibleServices.length % 3 !== 0 ? 3 - (visibleServices.length % 3) : 0;
  const mdPad = visibleServices.length > 0 && visibleServices.length % 2 !== 0 ? 1 : 0;

  return (
    <section aria-label="Services" className="relative z-[1] bg-[#111111] w-full flex flex-col items-center py-24 px-4 md:px-8 border-b border-[#fefefe]">

      {/* ── Search & Category Filter Bar ── */}
      <div className="w-full max-w-7xl mx-auto border border-[#fefefe] p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] uppercase tracking-widest opacity-70 shrink-0">{">"} Find_Service:</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH..."
            className="w-full bg-transparent outline-none font-bold uppercase tracking-widest text-sm placeholder:text-[#fefefe]/30 border-b border-[#fefefe]/40 pb-1 focus:border-[#fefefe] transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setShowAll(false); }}
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border border-[#fefefe] transition-colors duration-200",
                activeCategory === cat.key
                  ? "bg-[#fefefe] text-[#111111]"
                  : "bg-transparent text-[#fefefe] hover:bg-[#fefefe]/10"
              )}
            >
              {cat.label}
            </button>
          ))}
          <span className="font-mono text-[11px] opacity-50 ml-auto hidden md:inline">
            [ {visibleServices.length} / {services.length} ]
          </span>
        </div>
      </div>

      {/* ── Service Grid (single persistent grid — no AnimatePresence swap) ── */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-[#fefefe]">
          {visibleServices.map((service) => (
            <ServicePanel key={service.num} service={service} />
          ))}
          {/* Pad lg (3 cols) */}
          {Array.from({ length: lgPad }).map((_, i) => (
            <div key={`pad-lg-${i}`} className="hidden lg:block border-r border-b border-[#fefefe]" />
          ))}
          {/* Pad md (2 cols) */}
          {mdPad > 0 && (
            <div className="hidden md:block lg:hidden border-r border-b border-[#fefefe]" />
          )}
        </div>

        {/* Empty State */}
        {visibleServices.length === 0 && (
          <div className="border border-[#fefefe] border-t-0 p-12 flex flex-col items-center justify-center gap-2">
            <p className="font-mono text-[13px] opacity-50">{">"} NO_SERVICES_FOUND</p>
            <p className="font-mono text-[11px] opacity-30">Try a different keyword or category.</p>
          </div>
        )}

        {/* Show More / Show Less */}
        {hasMore && (
          <div className="border-l border-r border-b border-[#fefefe] flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-4 font-mono text-[12px] uppercase tracking-widest opacity-70 hover:opacity-100 hover:bg-[#fefefe]/5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{showAll ? '▲ Show Less' : '▼ See All Our Services'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Credentials Strip ── */}
      <CredentialsStrip />

    </section>
  );
}

/* ─── Service Panel (original card logic preserved) ─── */
function ServicePanel({ service }: { service: Service }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="relative flex flex-col justify-between aspect-square border-r border-b border-[#fefefe] p-6 lg:p-12 overflow-hidden group hover:bg-[#fefefe] transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-xl font-bold font-mono opacity-70 group-hover:text-[#111111] transition-colors duration-300">{service.num}</div>

      <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-12 pointer-events-none">
        <motion.h2
          className="text-3xl lg:text-5xl font-bold uppercase tracking-tighter z-10 group-hover:text-[#111111]"
          animate={{ y: isHovered ? -40 : 0, opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          {service.title}
        </motion.h2>

        <AnimatePresence>
          {isHovered && (
            <div className="absolute inset-x-6 lg:inset-x-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-0">
              {service.logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.08, duration: 0.2 }}
                  className="font-mono text-[13px] text-[#111111]"
                >
                  {log}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: service.logs.length * 0.08, duration: 0.2 }}
                className="pt-6 pointer-events-auto"
              >
                <a href="#contact" className="inline-block bg-[#111111] text-[#fefefe] border border-transparent rounded-[4px] px-4 py-2 font-bold tracking-tight uppercase hover:bg-black transition-colors text-xs">
                  Discuss Project
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-sm uppercase tracking-widest opacity-50 group-hover:text-[#111111] transition-colors duration-300 mt-auto">
        // {service.desc} //
      </div>
    </article>
  );
}

/* ─── Credentials Strip (graceful image fallback) ─── */
function CredentialsStrip() {
  const [adkLoaded, setAdkLoaded] = useState(true);
  const [gearLoaded, setGearLoaded] = useState(true);

  if (!adkLoaded && !gearLoaded) return null;

  return (
    <div className="w-full max-w-7xl mx-auto border border-[#fefefe] mt-12 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
      <span className="font-mono text-[11px] uppercase tracking-widest opacity-70 shrink-0">// Credentials</span>
      <div className="flex items-center gap-4 md:gap-6">
        {adkLoaded && (
          <div className="border border-[#fefefe]/30 p-1.5 hover:border-[#fefefe] transition-colors duration-300">
            <img
              src="/assets/badge-adk.jpg"
              alt="Google Cloud — Build Agents with Agent Development Kit (ADK)"
              className="h-12 md:h-16 w-auto"
              onError={() => setAdkLoaded(false)}
            />
          </div>
        )}
        {gearLoaded && (
          <div className="border border-[#fefefe]/30 p-1.5 hover:border-[#fefefe] transition-colors duration-300">
            <img
              src="/assets/badge-gear.png"
              alt="Google Cloud — Gemini Enterprise Agent Ready"
              className="h-12 md:h-16 w-auto"
              onError={() => setGearLoaded(false)}
            />
          </div>
        )}
      </div>
      <span className="font-mono text-[11px] opacity-30 hidden md:inline ml-auto">GOOGLE CLOUD VERIFIED</span>
    </div>
  );
}
