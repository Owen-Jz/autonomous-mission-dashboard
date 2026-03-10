import { WorkerCard } from "@/components/worker-card";
import { AgentNotes, Note } from "@/components/agent-notes";

const WORKERS = [
    {
        name: "Market Intelligence",
        description: "Understand what people care about right now.",
        status: "Completed" as const,
        logs: [
            "[INFO] Analyzing sentiment across subreddits...",
            "[SUCCESS] Market report updated."
        ],
    },
    {
        name: "Idea Generator",
        description: "Feed my content engine endlessly",
        status: "Completed" as const,
        logs: [
            "[SUCCESS] 20 campaign ideas generated."
        ],
    },
    {
        name: "Content Production",
        description: "Actually write the content.",
        status: "Completed" as const,
        logs: [
            "[SUCCESS] All drafted copy approved."
        ],
    },
    {
        name: "Repurposing Worker",
        description: "Multiply output for various platforms.",
        status: "Completed" as const,
        logs: [
            "[SUCCESS] Platform-specific variants created."
        ],
    },
    {
        name: "SEO Content Worker",
        description: "Generate Content continually.",
        status: "Running" as const,
        logs: [
            "[INFO] Injecting keywords...",
            "[PROCESSING] Validating readability score..."
        ],
    },
    {
        name: "Lead Generation",
        description: "Find potential clients.",
        status: "Running" as const,
        logs: [
            "[INFO] Scraping recent funding rounds...",
            "[PROCESSING] Enriching data..."
        ],
    },
    {
        name: "Outreach Worker",
        description: "Generate personalized emails",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Awaiting verified email list."
        ],
    },
    {
        name: "Analytics Worker",
        description: "Analyze post engagements",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Waiting for 24h metrics window."
        ],
    },
    {
        name: "Growth Experiment",
        description: "Test marketing ideas.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Need approval to launch Ad set."
        ],
    },
];

const DEPARTMENT_NOTES: Note[] = [
    {
        id: "mkt-1",
        title: "Marketing Campaign Performance",
        content: "Campaign 'AI Founders' hit a 4.2% CTR on X. Recommended budget scaling by 20% for the next 48 hours.",
        date: "Today, 10:15 AM",
        agent: "S.A.M",
    }
];

export default function MarketingDepartment() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                    Marketing (Personal)
                    <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        BOT-S.A.M
                    </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Marketing and growth overview. Combines intelligence, content distribution, and automated outbound lead tracking.
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
