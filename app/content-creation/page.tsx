import { WorkerCard } from "@/components/worker-card";
import { AgentNotes, Note } from "@/components/agent-notes";

const WORKERS = [
    {
        name: "Idea Generator",
        description: "Feed my content engine endlessly",
        status: "Completed" as const,
        logs: [
            "[INFO] Scanning Twitter trends...",
            "[INFO] Generating 50 hook ideas...",
            "[SUCCESS] Saved to content calendar."
        ],
    },
    {
        name: "Production Worker",
        description: "Actually write the content.",
        status: "Running" as const,
        logs: [
            "[INFO] Drafting post #12 about AI UI...",
            "[INFO] Adjusting tone to 'professional but edgy'...",
            "[PROCESSING] Formatting bullet points..."
        ],
    },
    {
        name: "Repurposing Worker",
        description: "Multiply output for cross-platform.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Waiting for final blog post approval..."
        ],
    },
    {
        name: "SEO Content Worker",
        description: "Generate SEO Content continually",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Queue is empty."
        ],
    },
    {
        name: "Growth Experiment Worker",
        description: "Test marketing ideas.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Awaiting new experiment hypothesis."
        ],
    },
];

const DEPARTMENT_NOTES: Note[] = [
    {
        id: "cc-1",
        title: "Content Ideas for Next Week",
        content: "Drafted hook variations based on Twitter trending topics:\n1. The Future of AI in Design\n2. How to leverage autonomous agents\n3. Overcoming the blank page syndrome using AI\n\nAll variants passed the viral probability threshold.",
        date: "Today",
        agent: "R.Y.A.N",
    }
];

export default function ContentCreationDepartment() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                    Content Creation (Personal)
                    <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        BOT-R.Y.A.N
                    </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Content marketing team overview. Endlessly generating ideas, producing written content, and repurposing it across X, LinkedIn, and blogs.
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
