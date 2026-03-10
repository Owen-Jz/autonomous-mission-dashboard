import { Plus, Search, MoreVertical } from "lucide-react";

export default function NotesPage() {
    const NOTES = [
        {
            id: 1,
            title: "Content Ideas for Next Week",
            agent: "BOT-R.Y.A.N",
            preview: "1. The Future of AI in Design 2. How to leverage autonomous agents...",
            date: "2 hours ago",
        },
        {
            id: 2,
            title: "Leads Output - High Priority",
            agent: "BOT-S.A.M",
            preview: "Found 4 companies with poor LCP scores on homepage. Sent to CRM.",
            date: "5 hours ago",
        },
        {
            id: 3,
            title: "Design Pattern Extraction",
            agent: "BOT-P.I.C.A.S.O",
            preview: "Colors extracted from top 50 Dribbble posts: #121212, #FFFFFF, #4ADE80...",
            date: "Yesterday",
        },
        {
            id: 4,
            title: "Market Setup - Q3 Anomalies",
            agent: "BOT-W.A.R.R.E.N (Investments)",
            preview: "Unusual volume detected on AI infra tokens. Strategy adjusted.",
            date: "2 Days ago",
        },
    ];

    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white/90 text-2xl font-bold tracking-wide">
                            Agent Notes
                        </h1>
                        <p className="text-zinc-400 text-sm max-w-2xl">
                            A central repository for insights, logs, drafted outputs, and strategy parameters saved by your agents.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-bold tracking-widest uppercase">New Note</span>
                    </button>
                </div>

                <div className="relative mt-2">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search notes globally..."
                        className="w-full max-w-lg bg-zinc-900/50 border border-zinc-700/80 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10 mt-4">
                {NOTES.map((note) => (
                    <div key={note.id} className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white font-bold tracking-wider text-[15px] group-hover:text-green-400 transition-colors">
                                {note.title}
                            </h3>
                            <button className="text-zinc-600 hover:text-zinc-300">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                            {note.preview}
                        </p>

                        <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{note.agent}</span>
                            </div>
                            <span className="text-[10px] font-semibold text-zinc-600 tracking-wider uppercase">
                                {note.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
