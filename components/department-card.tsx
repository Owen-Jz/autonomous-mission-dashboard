import Link from "next/link";
import { Play } from "lucide-react";
import { WorkerStatus } from "./status-badge";
import { cn } from "@/lib/utils";

interface WorkerSummary {
    name: string;
    description?: string;
    count?: number;
}

interface DepartmentCardProps {
    title: string;
    botName: string;
    role: string;
    href: string;
    status: WorkerStatus;
    workers: WorkerSummary[];
    className?: string;
}

export function DepartmentCard({
    title,
    botName,
    role,
    href,
    status,
    workers,
    className,
}: DepartmentCardProps) {
    return (
        <div
            className={cn(
                "w-full sm:w-[320px] px-3 py-4 bg-neutral-800 rounded-[10px] outline outline-[1px] outline-offset-[-1px] outline-neutral-700 inline-flex flex-col justify-center items-start gap-4 overflow-hidden",
                className
            )}
        >
            <div className="self-stretch flex flex-col justify-start items-start gap-1 pb-1">
                <div className="self-stretch inline-flex justify-between items-center">
                    <div className="justify-start text-white/80 text-sm font-bold font-['Monda'] leading-tight">
                        {title}
                    </div>
                    <Link
                        href={href}
                        className="flex justify-start items-center gap-1 group transition-transform"
                        title="Start Operations"
                    >
                        <div className="relative overflow-hidden cursor-pointer hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-white fill-white group-hover:fill-green-400 group-hover:text-green-400 transition-colors" />
                        </div>
                    </Link>
                </div>

                <div className="self-stretch inline-flex justify-between items-start mt-2 border-b border-zinc-700/30 pb-3">
                    <div className="inline-flex flex-col justify-start items-start gap-px">
                        <div className="inline-flex justify-end items-start gap-1">
                            <div className="justify-start text-white text-[11px] font-bold font-['Monda']">
                                BOT-
                            </div>
                            <div className="justify-start text-white text-[11px] font-normal font-['Monda']">
                                {botName}
                            </div>
                        </div>
                        <div className="justify-start text-zinc-500 text-[10px] font-bold font-['Monda'] mt-0.5">
                            {role}
                        </div>
                    </div>

                    <div className="inline-flex flex-col justify-center items-end gap-1">
                        <div className="inline-flex justify-end items-start gap-1">
                            <div className="justify-start text-white text-[10px] font-bold font-['Monda']">
                                PROCESS
                            </div>
                            <div
                                className={cn(
                                    "justify-start text-[10px] font-normal font-['Monda']",
                                    status === "Completed"
                                        ? "text-green-400"
                                        : status === "Running"
                                            ? "text-yellow-300"
                                            : "text-zinc-500"
                                )}
                            >
                                {status === "Running" ? "PROCESSING" : status.toUpperCase()}
                            </div>
                        </div>
                        <Link
                            href={href}
                            className="justify-start text-zinc-500 text-[10px] font-bold font-['Monda'] hover:text-white transition-colors border-b border-transparent hover:border-zinc-500"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>

            <div className="self-stretch p-0.5 rounded-md flex flex-col justify-start items-start gap-1.5">
                {workers.map((worker, i) => (
                    <div
                        key={i}
                        className="self-stretch px-3 py-2 bg-zinc-700 rounded outline outline-[0.5px] outline-offset-[-0.5px] outline-white/20 flex flex-col justify-start items-start gap-0.5 overflow-hidden hover:bg-zinc-600/50 transition-colors"
                    >
                        <div className="justify-start text-white text-[11px] font-normal font-['Monda'] leading-snug">
                            {worker.name}
                        </div>
                        {worker.description && (
                            <div className="justify-start text-white/50 text-[10px] font-normal font-['Monda'] leading-snug">
                                {worker.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
