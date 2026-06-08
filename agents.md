# System Directive: Cloud & AI Engineering Portfolio

## 1. Global Aesthetic & Core Identity
- **Brand Identity:** A high-performance Junior Cloud Engineer and AI Application Builder focused on asynchronous workflows, containerized environments, and autonomous AI systems.
- **Strict Monochrome:** Use ONLY `#111111` (Background) and `#fefefe` / `#ffffff` (Text/Borders) to match the targeted studio aesthetic. No gradients, no soft shadows, no border-radius.
- **Typography:** Strict utilization of the custom 'ak' font family. Headings must use `font-weight: 700` with aggressive `tracking-tighter` kerning. Body text must remain clean, monospaced-adjacent, and highly structured (like a terminal).
- **Neo-Brutalism Grid:** All sections, service blocks, and layouts are defined by sharp, 1px solid white borders (`border-white`) with zero artificial padding gaps.

## 2. Dynamic Interactions & Physics
- **The Core Engine:** Implement `@studio-freight/lenis` for smooth momentum scrolling. Use `framer-motion` for kinetic text layouts, typing effects, and hover states. Use `gsap` (ScrollTrigger) for scroll-linked pinning and timeline reveals.
- **Conversational Realism:** The interface must feel like a live computing environment. Components should alter their typographic layouts, trigger terminal data logs (e.g., `> Deploying Docker container...`), or activate X-ray image masks based on live cursor feedback.
- **Preloader:** Prevent all FOUC (Flash of Unstyled Content) during GSAP timelines using `useLayoutEffect`. The loader must simulate a system boot sequence.

## 3. Verified Contact & Developer Constants
- **Developer Name:** Riduan Hasan Shabab
- **Title:** Junior Cloud Engineer | AI Application Builder
- **HQ Location:** Dhaka, Bangladesh
- **Primary Comms:** 01872392010 | sababhasan24@gmail.com
- **GitHub:** github.com/sababbro

## 4. Code Quality & Architecture
- Build strictly as a Next.js App Router application (Static Site Generation).
- Use Tailwind CSS with `clsx` and `tailwind-merge` for utility class management.
- Keep components modular (e.g., `<Loader />`, `<Hero />`, `<ServicesGrid />`, `<ProjectVault />`).