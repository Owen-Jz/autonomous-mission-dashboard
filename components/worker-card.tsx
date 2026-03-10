import { Play } from "lucide-react";
import { StatusBadge, WorkerStatus } from "./status-badge";
import { cn } from "@/lib/utils";

interface WorkerCardProps {
    name: string;
    description: string;
    status: WorkerStatus;
    logs?: string[];
    className?: string;
}

export function WorkerCard({
    name,
    description,
    status,
    logs = ["Initializing worker...", "Ready for instructions."],
    className,
}: WorkerCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-3 p-4 bg-zinc-800 rounded-xl border border-zinc-700 outline outline-1 outline-offset-[-1px] outline-black/20",
                className
            )}
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-white/90">{name}</h3>
                    <p className="text-xs text-zinc-400 max-w-sm">{description}</p>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status={status} className="mt-0.5" />
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/5"
                        title="Start Worker"
                    >
                        <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                    </button>
                </div>
            </div>

            <div className="mt-2 p-3 bg-zinc-900/80 rounded-lg border border-zinc-800/50 flex flex-col gap-1.5 h-24 overflow-hidden relative">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    Live Logs
                </div>
                {logs.map((log, index) => (
                    <div key={index} className="text-xs text-zinc-300 font-mono">
                        <span className="text-zinc-600 mr-2">&gt;</span>
                        {log}
                    </div>
                ))}
                {/* Gradient fade to simulate scrollable logs */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900/80 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
