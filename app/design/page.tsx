import { WorkerCard } from "@/components/worker-card";
import { AgentNotes, Note } from "@/components/agent-notes";

const WORKERS = [
    {
        name: "Design Scraper",
        description: "Scrape top Designs from Dribble, Behance, Awwwards",
        status: "Completed" as const,
        logs: [
            "[INFO] Connected to Behance API",
            "[INFO] Scraping top 50 trending designs...",
            "[SUCCESS] Extracted 42 relevant UI cards."
        ],
    },
    {
        name: "Pattern Exporter",
        description: "Export Patterns - Layout, Colors, Typography, Styles",
        status: "Completed" as const,
        logs: [
            "[INFO] Analyzing color palettes...",
            "[INFO] Extracting font stacks...",
            "[SUCCESS] Created design token JSON."
        ],
    },
    {
        name: "Similar Project Generator",
        description: "Generate Similar Project, Sitemap, Structure Etc",
        status: "Completed" as const,
        logs: [
            "[INFO] Generating site architecture...",
            "[SUCCESS] Sitemap generated successfully."
        ],
    },
    {
        name: "Landing Page Generator",
        description: "Generate Landing Page - Dashboard, Startup website",
        status: "Completed" as const,
        logs: [
            "[INFO] Assembling landing page blocks...",
            "[SUCCESS] Draft v1 ready."
        ],
    },
    {
        name: "Design Evaluator",
        description: "Re-evaluate Generated Design, Find Flaws and Fix",
        status: "Completed" as const,
        logs: [
            "[WARN] Contrast ratio low on primary button.",
            "[INFO] Adjusting primary button hex...",
            "[SUCCESS] Accessibility checks passed."
        ],
    },
    {
        name: "System Integrator",
        description: "Evaluate Design System and Integrate features",
        status: "Completed" as const,
        logs: [
            "[INFO] Exporting to Figma...",
            "[SUCCESS] Figma tokens updated."
        ],
    },
];

const DEPARTMENT_NOTES: Note[] = [
    {
        id: "des-1",
        title: "Design Pattern Extraction",
        content: "Colors extracted from top 50 Dribbble posts:\n- Primary: #121212\n- Secondary: #FFFFFF\n- Accent: #4ADE80\n\nTypography preference leans heavily towards geometric sans-serif (e.g., Monda, Rajdhani).",
        date: "Yesterday",
        agent: "P.I.C.A.S.O",
    },
    {
        id: "des-2",
        title: "Sitemap Finalization",
        content: "Drafted 5-page structure based on similar dashboard components. Sent wireframe to Development team for initial React component creation.",
        date: "4 hours ago",
        agent: "P.I.C.A.S.O",
    }
];

export default function DesignDepartment() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                    Design Department
                    <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        BOT-P.I.C.A.S.O 👨🎨
                    </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Overview of the design team agents. These workers handle scraping, pattern extraction, asset generation, and layout construction.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {WORKERS.map((worker, i) => (
                    <WorkerCard key={i} {...worker} />
                ))}
            </div>

            <AgentNotes notes={DEPARTMENT_NOTES} />
        </div>
    );
}
