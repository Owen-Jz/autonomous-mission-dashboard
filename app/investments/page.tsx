import { WorkerCard } from "@/components/worker-card";
import { AgentNotes, Note } from "@/components/agent-notes";

const WORKERS = [
    {
        name: "Market Intelligence",
        description: "Track global market movements and sentiment.",
        status: "Completed" as const,
        logs: [
            "[INFO] Processing macro data...",
            "[SUCCESS] Evaluated inflation / interest trends."
        ],
    },
    {
        name: "Opportunity Scanner",
        description: "Detect assets with unusual activity or strong potential.",
        status: "Completed" as const,
        logs: [
            "[INFO] Scanning crypto/stock volumes...",
            "[SUCCESS] Found 3 anomalies."
        ],
    },
    {
        name: "Fundamental Analysis",
        description: "Evaluate long-term value using financial and ecosystem data.",
        status: "Completed" as const,
        logs: [
            "[INFO] Reading Q3 earnings transcripts...",
            "[SUCCESS] Adjusted intrinsic value model."
        ],
    },
    {
        name: "Technical Analysis",
        description: "Analyze price behavior and market trends.",
        status: "Running" as const,
        logs: [
            "[INFO] Checking 4H RSI and MACD crossing...",
            "[INFO] Drawing fib channels...",
            "[PROCESSING] Waiting for candlestick close."
        ],
    },
    {
        name: "Risk Management",
        description: "Determine position sizing and protect capital.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Awaiting trade setup details."
        ],
    },
    {
        name: "Portfolio Manager",
        description: "Manage asset allocation and rebalance.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] No rebalancing needed."
        ],
    },
    {
        name: "Trade Execution Planner",
        description: "Generate structured trade setups and entry strategies.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Awaiting Risk Management approval."
        ],
    },
    {
        name: "Performance Tracker",
        description: "Monitor trade performance and portfolio returns.",
        status: "Running" as const,
        logs: [
            "[INFO] Polling live API for PnL...",
            "[INFO] Daily change: +1.2%",
            "[PROCESSING] Tracking max drawdown."
        ],
    },
    {
        name: "Investment Research",
        description: "Discover emerging sectors, startups, and financial opportunities.",
        status: "Completed" as const,
        logs: [
            "[SUCCESS] AI infra tier list compiled."
        ],
    },
    {
        name: "Strategy Improvement",
        description: "Analyze past performance and refine trading strategies.",
        status: "Idle" as const,
        logs: [
            "[STANDBY] Weekly backtest scheduled for Sunday."
        ],
    },
];

const DEPARTMENT_NOTES: Note[] = [
    {
        id: "inv-1",
        title: "Market Setup - Q3 Anomalies",
        content: "Unusual volume detected on AI infra tokens.\nInitial Technical Indicators:\n- RSI: 43 (Neutral)\n- MACD: Bullish crossover on 4H chart\n\nStrategy adjusted. Capital allocation primed for breakout.",
        date: "2 Days ago",
        agent: "W.A.R.R.E.N",
    }
];

export default function InvestmentsDepartment() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                    Investment Operations
                    <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        BOT-W.A.R.R.E.N
                    </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Automated asset management. Monitoring charts, scanning emerging opportunities, fundamental analysis, and algorithmic risk management modeling.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                {WORKERS.map((worker, i) => (
                    <WorkerCard key={i} {...worker} />
                ))}
            </div>

            <AgentNotes notes={DEPARTMENT_NOTES} />
        </div>
    );
}
