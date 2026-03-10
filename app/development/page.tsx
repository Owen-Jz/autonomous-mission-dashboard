import { WorkerCard } from "@/components/worker-card";
import { AgentNotes, Note } from "@/components/agent-notes";

const WORKERS = [
    {
        name: "Engineering Analyst",
        description: "Analyze engineering trends",
        status: "Completed" as const,
        logs: [
            "[INFO] Scanning GitHub trending...",
            "[INFO] Aggregating tech stacks...",
            "[SUCCESS] Report generated."
        ],
    },
    {
        name: "Product Ideator",
        description: "Generate product Ideas",
        status: "Completed" as const,
        logs: [
            "[INFO] Brainstorming 10 new micro-SaaS ideas...",
            "[SUCCESS] Ideas saved to Notion."
        ],
    },
    {
        name: "System Architect",
        description: "System Architect",
        status: "Completed" as const,
        logs: [
            "[INFO] Designing database schema...",
            "[INFO] Mapping API routes...",
            "[SUCCESS] Architecture document ready."
        ],
    },
    {
        name: "Bug Hunter",
        description: "Repository bug hunting and optimization",
        status: "Running" as const,
        logs: [
            "[INFO] Checking /src for vulnerabilities...",
            "[INFO] Optimizing React re-renders...",
            "[PROCESSING] Waiting for test suite..."
        ],
    },
    {
        name: "Frontend Engineer",
        description: "Generate Landing Page - Dashboard, Startup website",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Awaiting design system tokens..."
        ],
    },
];

const DEPARTMENT_NOTES: Note[] = [
    {
        id: "dev-1",
        title: "React Re-renders Optimized",
        content: "Identified 3 top-level context providers causing unnecessary sub-tree dismounts. Wrapped primary app context into split providers.\n\nPerformance metrics increased by 14% on complex renders.",
        date: "Today, 08:32 AM",
        agent: "D.E.X.T.E.R",
    },
    {
        id: "dev-2",
        title: "Database Schema Draft v1",
        content: "Finished designing the relational mapping out for users, agent states, and logging triggers. Need approval before pushing Prisma migration.",
        date: "Yesterday",
        agent: "D.E.X.T.E.R",
    }
];

export default function DevelopmentDepartment() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                    Development Department
                    <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        BOT-D.E.X.T.E.R
                    </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Overview of the development team agents. These workers handle code generation, bug hunting, architecture planning, and frontend/backend tasks.
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
