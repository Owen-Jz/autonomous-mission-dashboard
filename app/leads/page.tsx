import { WorkerCard } from "@/components/worker-card";
import { AgentNotes, Note } from "@/components/agent-notes";

const WORKERS = [
    {
        name: "Opportunity Scanner",
        description: "Constantly find potential clients.",
        status: "Completed" as const,
        logs: [
            "[INFO] Scanning 'Looking for devs' tweets...",
            "[SUCCESS] Found 14 matching requests."
        ],
    },
    {
        name: "Website Analyzer",
        description: "Identify companies with bad websites.",
        status: "Completed" as const,
        logs: [
            "[INFO] Checking lighthouse scores for domains...",
            "[WARN] 4 sites have LCP > 3.5s.",
            "[SUCCESS] Marked 4 as high potential leads."
        ],
    },
    {
        name: "Lead Qualifier",
        description: "Filter serious opportunities.",
        status: "Completed" as const,
        logs: [
            "[SUCCESS] Validated funding and team size."
        ],
    },
    {
        name: "Contact Finder",
        description: "Locate the actual decision maker.",
        status: "Running" as const,
        logs: [
            "[INFO] Searching target: VP of Engineering...",
            "[INFO] ZoomInfo API hit...",
            "[PROCESSING] Resolving email syntax."
        ],
    },
    {
        name: "Personalization Worker",
        description: "Avoid generic outreach.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Need contact details."
        ],
    },
    {
        name: "Outreach Generator",
        description: "Create different outreach styles.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Awaiting personalization context."
        ],
    },
    {
        name: "CRM Tracker",
        description: "Keep everything organized.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Ready to sync."
        ],
    },
];

const DEPARTMENT_NOTES: Note[] = [
    {
        id: "lds-1",
        title: "Leads Output - High Priority",
        content: "Found 4 companies with poor LCP scores on homepage. Sent to CRM. Recommend immediate individualized outreach focusing on site speeds.",
        date: "5 hours ago",
        agent: "S.A.M",
    }
];

export default function LeadsDepartment() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                    Leads Pipeline
                    <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        BOT-S.A.M
                    </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Automated sales intelligence. Analyzing company websites, fetching key personnel info, crafting specialized cold emails, and logging CRMs.
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
