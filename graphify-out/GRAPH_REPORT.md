# Graph Report - portfolio-ncls-2026  (2026-11-18)

## Corpus Check
- 106 files · ~32,605 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .ttf 16, (none) 1, .ico 1)

## Summary
- 550 nodes · 1136 edges · 37 communities (30 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1457dc98`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- Button
- [locale]/layout.tsx
- next
- components.json
- devDependencies
- dependencies
- 🔐 Guia do Painel Administrativo
- framer-motion
- Cinematic GSAP Lenis Motion System
- compilerOptions
- Scroll-Scrubbed Visual Sequence
- Scroll-Scrubbed Word Reveal
- package.json
- RichTextEditor/index.tsx
- projects/route.ts
- Masked Reveal
- Recreate the demo
- Recreate the demo
- Recreate the demo
- HomeHero.tsx
- Codex Browser Animation Profiling
- eslint.config.mjs
- Optimize Web Animations
- interface
- interface
- interface
- scripts
- README.md
- firebase.ts
- expected-output.md
- input.md
- clsx
- firebase-admin
- @tailwindcss/line-clamp@^0.4.4
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `react` - 36 edges
2. `Button()` - 35 edges
3. `framer-motion` - 29 edges
4. `next` - 27 edges
5. `next-intl` - 27 edges
6. `cn()` - 23 edges
7. `lucide-react` - 22 edges
8. `Link` - 21 edges
9. `Project` - 20 edges
10. `Cinematic GSAP Lenis Motion System` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Header()` --calls--> `Button()`  [EXTRACTED]
  app/components/Header/index.tsx → app/components/ui/button.tsx
- `Header()` --calls--> `Link`  [EXTRACTED]
  app/components/Header/index.tsx → app/i18n/navigation.ts
- `LocaleLayout()` --calls--> `Header()`  [EXTRACTED]
  app/[locale]/layout.tsx → app/components/Header/index.tsx
- `ProjectFormFieldsProps` --references--> `Project`  [EXTRACTED]
  app/components/admin/ProjectFormFields.tsx → app/types/projects.ts
- `AdminProjectListProps` --references--> `Project`  [EXTRACTED]
  app/components/admin/AdminProjectList.tsx → app/types/projects.ts

## Import Cycles
- None detected.

## Communities (37 total, 7 thin omitted)

### Community 0 - "react"
Cohesion: 0.13
Nodes (25): AdminProjectsPage(), AdminProjectList(), AdminProjectsContent(), ViewMode, ease, Field(), Panel(), ProjectFormFields() (+17 more)

### Community 1 - "Button"
Cohesion: 0.10
Nodes (38): AdminLoginPage(), AboutHero(), socialIcons, StatKey, AboutTimeline(), ease, getTimeline(), socials (+30 more)

### Community 2 - "[locale]/layout.tsx"
Cohesion: 0.16
Nodes (10): FooterDecoration(), Footer(), FooterReveal(), EMAIL, RESUME_URL, WHATSAPP_URL, HtmlLang(), PageTransition() (+2 more)

### Community 3 - "next"
Cohesion: 0.06
Nodes (31): AdminTopBar(), AdminTopBarProps, ViewMode, Header(), MenuModal(), ProgressiveBlur(), ProgressiveBlurProps, useTheme() (+23 more)

### Community 4 - "components.json"
Cohesion: 0.10
Nodes (20): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/dompurify@^3.2.0, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "dependencies"
Cohesion: 0.09
Nodes (22): dependencies, class-variance-authority@^0.7.1, framer-motion@^12.35.0, @headlessui/react@^2.2.10, lucide-react@^1.74.0, next-intl@^4.13.6, radix-ui@^1.8.1, react@19.2.8 (+14 more)

### Community 7 - "🔐 Guia do Painel Administrativo"
Cohesion: 0.10
Nodes (19): 📝 Adicionar Novo Projeto, Alterando a Senha, Campos Obrigatórios, Campos Opcionais, 🚀 Como Acessar, 🔒 Configurações de Segurança, ✍️ Editor Rich Text, Erros de Autenticação (+11 more)

### Community 8 - "framer-motion"
Cohesion: 0.09
Nodes (36): AdminProjectListProps, disciplineLabel, ease, ProjectsStack(), StackCard(), summary(), MenuModalProps, Lightbox() (+28 more)

### Community 9 - "Cinematic GSAP Lenis Motion System"
Cohesion: 0.10
Nodes (19): Base Tokens, Choreography Rules, Cinematic GSAP Lenis Motion System, Clip Image Reveals, CSS Foundation, Custom Cursor, Init Order, Markup API (+11 more)

### Community 10 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 11 - "Scroll-Scrubbed Visual Sequence"
Cohesion: 0.11
Nodes (15): Experience, Implementation contract, Minimal prompt, Recreate the demo, Remix prompt, Scroll-Scrubbed Visual Sequence Demo Prompts, References, Build the scroll stage (+7 more)

### Community 12 - "Scroll-Scrubbed Word Reveal"
Cohesion: 0.11
Nodes (15): Experience, Implementation contract, Minimal prompt, Recreate the demo, Remix prompt, Scroll-Scrubbed Word Reveal Demo Prompts, References, Clean up (+7 more)

### Community 13 - "package.json"
Cohesion: 0.12
Nodes (15): dompurify@^3.4.13, lenis@^1.3.26, moment@^2.30.1, motion@^12.35.0, react-dom@19.2.8, tailwind-merge@^3.6.0, name, private (+7 more)

### Community 14 - "RichTextEditor/index.tsx"
Cohesion: 0.14
Nodes (12): RichTextEditorProps, ResizableImage, @tiptap/extension-image@^3.30.0, @tiptap/extension-link@^3.30.0, @tiptap/extension-placeholder@^3.30.0, @tiptap/react@^3.30.0, @tiptap/starter-kit@^3.30.0, @tiptap/extension-image (+4 more)

### Community 15 - "projects/route.ts"
Cohesion: 0.18
Nodes (20): DELETE(), failure(), GET(), isAuthorized(), POST(), PUT(), unauthorized(), isAuthorized() (+12 more)

### Community 16 - "Masked Reveal"
Cohesion: 0.20
Nodes (9): CSS Mask, GSAP ScrollTrigger, HTML, Masked Reveal, Motion Defaults, Quick Checks, React Cleanup Pattern, Taste Rules (+1 more)

### Community 17 - "Recreate the demo"
Cohesion: 0.22
Nodes (8): Acceptance checks, Canonical example, Cinematic GSAP Lenis Motion System Demo Prompts, Deliverable, Direction, Minimal prompt, Recreate the demo, Remix prompt

### Community 18 - "Recreate the demo"
Cohesion: 0.22
Nodes (8): Fidelity target, Masked Reveal Demo Prompts, Minimal prompt, Product brief, Recreate the demo, Reference snapshot, Remix prompt, Skill direction

### Community 19 - "Recreate the demo"
Cohesion: 0.22
Nodes (8): Acceptance checks, Canonical example, Deliverable, Direction, Minimal prompt, Optimize Web Animations Demo Prompts, Recreate the demo, Remix prompt

### Community 20 - "HomeHero.tsx"
Cohesion: 0.13
Nodes (18): BackToTopButton(), BrandIcon(), Client(), HomeClients(), ease, HomeHero(), NameLines(), HomeProjects() (+10 more)

### Community 21 - "Codex Browser Animation Profiling"
Cohesion: 0.29
Nodes (6): Attach To Codex Browser, Codex Browser Animation Profiling, CSS Animation Profiler, Idle And Route-Cycle Checks, Memory And Leak Audit Sampler, Suggested Measurement Pass

### Community 22 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.0, eslint, eslint-config-next

### Community 23 - "Optimize Web Animations"
Cohesion: 0.33
Nodes (5): Avoid, Core Rule, Good Fix Patterns, Optimize Web Animations, Workflow

### Community 24 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 25 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 26 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 27 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 28 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 29 - "firebase.ts"
Cohesion: 0.33
Nodes (5): db, firebaseConfig, storage, firebase@^12.17.1, firebase

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `react`, `Button`, `[locale]/layout.tsx`, `framer-motion`, `package.json`, `projects/route.ts`, `HomeHero.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.1310483870967742 - nodes in this community are weakly interconnected._
- **Why does `react` connect `framer-motion` to `react`, `Button`, `[locale]/layout.tsx`, `next`, `dependencies`, `package.json`, `RichTextEditor/index.tsx`, `HomeHero.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Should `Button` be split into smaller, more focused modules?**
  _Cohesion score 0.10303030303030303 - nodes in this community are weakly interconnected._
- **Why does `framer-motion` connect `framer-motion` to `react`, `Button`, `[locale]/layout.tsx`, `next`, `dependencies`, `package.json`, `HomeHero.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.06155632984901278 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._