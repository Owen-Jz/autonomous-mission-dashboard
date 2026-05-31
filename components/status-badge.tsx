import { cn } from "@/lib/utils";

export type WorkerStatus = "Idle" | "Running" | "Error" | "Completed" | "Failed";

interface StatusBadgeProps {
    status: WorkerStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const statusConfig = {
        Idle: "text-zinc-500",
        Running: "text-yellow-400",
        Error: "text-red-500",
        Completed: "text-green-400",
        Failed: "text-red-500",
    };

    const statusText = {
        Idle: "IDLE",
        Running: "PROCESSING",
        Error: "ERROR",
        Completed: "COMPLETED",
        Failed: "FAILED",
    };

    return (
        <div className={cn("inline-flex justify-end items-start gap-1 font-bold tracking-wider", className)}>
            <div className="text-white text-[9px] leading-tight">PROCESS</div>
            <div className={cn("text-[9px] leading-tight", statusConfig[status])}>
                {statusText[status]}
            </div>
        </div>
    );
}
