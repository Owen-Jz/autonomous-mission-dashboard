"use client";

import { Play, Square, Loader2 } from "lucide-react";
import { StatusBadge, WorkerStatus } from "./status-badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface WorkerCardProps {
    id?: string;
    departmentId?: string;
    name: string;
    description: string;
    status?: WorkerStatus;
    promptTemplate?: string;
    logs?: string[];
    output?: string;
    sessionId?: string | null;
    className?: string;
    onStatusChange?: (workerId: string, newStatus: WorkerStatus, output?: string) => void;
    onComplete?: (workerId: string) => void;
}

export function WorkerCard({
    id = '',
    departmentId = '',
    name,
    description,
    status = 'Idle',
    promptTemplate = '',
    logs: initialLogs = [],
    output,
    sessionId = null,
    className,
    onStatusChange,
    onComplete,
}: WorkerCardProps) {
    // Only show logs when there's an active session
    const [isRunning, setIsRunning] = useState(false);
    const [workerStatus, setWorkerStatus] = useState<WorkerStatus>(status);
    const [workerLogs, setWorkerLogs] = useState<string[]>([]);
    const [workerOutput, setWorkerOutput] = useState<string | undefined>(undefined);
    
    // Sync with props
    useEffect(() => {
        setWorkerStatus(status);
    }, [status]);

    // Update logs and output based on session and props
    useEffect(() => {
        // Check if there's a valid session and data
        const hasSession = sessionId && sessionId !== null;
        const hasLogs = initialLogs && initialLogs.length > 0;
        const hasOutput = output && output.length > 0;
        
        if (hasSession) {
            // Show actual logs/output when session exists
            if (hasLogs) {
                setWorkerLogs(initialLogs);
            } else {
                setWorkerLogs([]);
            }
            if (hasOutput) {
                setWorkerOutput(output);
            } else {
                setWorkerOutput(undefined);
            }
        } else {
            // No session - show placeholder
            setWorkerLogs(["Run a session to see logs."]);
            setWorkerOutput(undefined);
        }
    }, [sessionId, initialLogs, output]);

    const handleRun = async () => {
        if (!promptTemplate) {
            alert('No prompt template defined for this worker');
            return;
        }

        setIsRunning(true);
        setWorkerStatus('Running');
        const startLog = `[${new Date().toLocaleTimeString()}] Starting worker...`;
        setWorkerLogs([startLog, `[${new Date().toLocaleTimeString()}] Processing...`]);

        try {
            // Make API call
            const response = await fetch('/api/agents/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    agentId: 'picaso',
                    prompt: promptTemplate,
                    workerId: id || name,
                    departmentId: departmentId || 'default',
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                const completedLog = `[${new Date().toLocaleTimeString()}] Task completed`;
                const outputPreview = data.response ? data.response.substring(0, 100) + '...' : '';
                
                setWorkerLogs([startLog, `[${new Date().toLocaleTimeString()}] Processing...`, completedLog, outputPreview]);
                setWorkerStatus('Completed');
                setWorkerOutput(data.response);
                
                // Notify parent
                if (onStatusChange) {
                    onStatusChange(id || name, 'Completed', data.response);
                }
                // Trigger refresh
                if (onComplete) {
                    onComplete(id || name);
                }
            } else {
                setWorkerLogs([startLog, `[${new Date().toLocaleTimeString()}] Error: ${data.error}`]);
                setWorkerStatus('Failed');
                
                if (onStatusChange) {
                    onStatusChange(id || name, 'Failed');
                }
            }
        } catch (error: any) {
            const errorLog = `[${new Date().toLocaleTimeString()}] Error: ${error.message || error}`;
            setWorkerLogs([startLog, errorLog]);
            setWorkerStatus('Failed');
            
            if (onStatusChange) {
                onStatusChange(id || name, 'Failed');
            }
        } finally {
            setIsRunning(false);
        }
    };

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
                    <StatusBadge status={workerStatus} className="mt-0.5" />
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full transition-colors border border-white/5",
                            isRunning 
                                ? "bg-red-500/20 hover:bg-red-500/30" 
                                : "bg-white/10 hover:bg-white/20"
                        )}
                        title={isRunning ? "Running..." : "Start Worker"}
                    >
                        {isRunning ? (
                            <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                        ) : (
                            <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                        )}
                    </button>
                </div>
            </div>

            <div className="mt-2 p-3 bg-zinc-900/80 rounded-lg border border-zinc-800/50 flex flex-col gap-1.5 h-24 overflow-y-auto font-mono">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    Logs {isRunning && <Loader2 className="w-3 h-3 inline animate-spin ml-1" />}
                </div>
                {workerLogs.map((log, index) => (
                    <div key={index} className="text-xs text-zinc-300 whitespace-pre-wrap break-words">
                        <span className="text-zinc-600 mr-2">›</span>
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
}
