"use client";

import { useState, useEffect } from "react";
import { Department, Worker, WorkerStatus, Session } from "@/lib/types";
import { WorkerCard } from "@/components/worker-card";
import { Play, RotateCcw, Clock, CheckCircle, XCircle, Loader2, ChevronDown, ChevronUp, FileText, Trash2 } from "lucide-react";

// Timezone: Africa/Lagos (UTC+1)
const TIMEZONE = 'Africa/Lagos';

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', { timeZone: TIMEZONE });
}

interface DesignDepartmentProps {
    initialDepartment?: Department;
}

export default function DesignDepartment() {
    const [department, setDepartment] = useState<Department | null>(null);
    const [loading, setLoading] = useState(true);
    const [departmentStatus, setDepartmentStatus] = useState<'Idle' | 'Running' | 'Completed'>('Idle');
    const [sessions, setSessions] = useState<Session[]>([]);
    const [currentSession, setCurrentSession] = useState<Session | null>(null);
    const [showSessions, setShowSessions] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [expandedWorker, setExpandedWorker] = useState<string | null>(null);

    useEffect(() => {
        fetchDepartment();
        fetchSessions();
    }, []);

    // Load session worker data when session is selected
    useEffect(() => {
        if (currentSession) {
            loadSessionWorkerData(currentSession.id);
        }
    }, [currentSession?.id]);

    const loadSessionWorkerData = async (sessionId: string) => {
        try {
            // Get current workers from state
            const currentWorkers = department?.workers || [];
            
            const response = await fetch(`/api/sessions?sessionId=${sessionId}`);
            const data = await response.json();
            
            if (data.session) {
                const session = data.session;
                
                // Update department workers with session worker data
                if (session.workers && currentWorkers.length > 0) {
                    const updatedWorkers = currentWorkers.map((worker, index) => {
                        const sessionWorker = session.workers[index];
                        if (sessionWorker) {
                            return {
                                ...worker,
                                status: sessionWorker.status === 'completed' ? 'Completed' as WorkerStatus :
                                        sessionWorker.status === 'failed' ? 'Failed' as WorkerStatus :
                                        sessionWorker.status === 'running' ? 'Running' as WorkerStatus : 'Idle' as WorkerStatus,
                                output: sessionWorker.output || '',
                                logs: sessionWorker.logs || [],
                            };
                        }
                        return worker;
                    });
                    
                    setDepartment(prev => prev ? { ...prev, workers: updatedWorkers } : prev);
                }
            }
        } catch (error) {
            console.error('Error loading session worker data:', error);
        }
    };

    const fetchDepartment = async () => {
        try {
            const response = await fetch('/api/departments');
            const data = await response.json();
            
            const designDept = data.departments?.find((d: Department) => d.id === 'design');
            if (designDept) {
                setDepartment(designDept);
                setDepartmentStatus(designDept.status);
            }
        } catch (error) {
            console.error('Error fetching department:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSessions = async () => {
        try {
            const response = await fetch('/api/sessions?departmentId=design');
            const data = await response.json();
            setSessions(data.sessions || []);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const handleWorkerStatusChange = (workerId: string, newStatus: WorkerStatus, output?: string) => {
        setDepartment(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                workers: prev.workers.map(w => 
                    w.id === workerId ? { 
                        ...w, 
                        status: newStatus,
                        output: output || w.output,
                    } : w
                )
            };
        });
    };

    const handleWorkerComplete = (workerId: string) => {
        fetchDepartment();
    };

    const handleStartDepartment = async () => {
        setDepartmentStatus('Running');
        
        // Create a new session
        const sessionResponse = await fetch('/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'create',
                departmentId: 'design',
            }),
        });
        
        const sessionData = await sessionResponse.json();
        const newSession: Session = {
            id: sessionData.sessionId,
            departmentId: 'design',
            status: 'running',
            startedAt: new Date(),
            workers: [],
            outputs: {},
            notes: [],
            emailSent: false,
        };
        setCurrentSession(newSession);
        
        // Run workers sequentially - CHAIN OUTPUTS
        let previousOutput = '';
        
        if (department?.workers) {
            for (let i = 0; i < department.workers.length; i++) {
                const worker = department.workers[i];
                
                if (worker.promptTemplate) {
                    // Update status to running
                    setDepartment(prev => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            workers: prev.workers.map(w => 
                                w.id === worker.id ? { ...w, status: 'Running' as WorkerStatus } : w
                            )
                        };
                    });
                    
                    // Build prompt with previous worker output (if not first worker)
                    let combinedPrompt = worker.promptTemplate;
                    if (previousOutput && i > 0) {
                        const prevWorker = department.workers[i - 1];
                        combinedPrompt = `CONTEXT FROM PREVIOUS WORKER (${prevWorker.name}):\n${previousOutput}\n\n---\n\nYOUR TASK:\n${worker.promptTemplate}`;
                    }
                    
                    try {
                        const response = await fetch('/api/agents/run', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                agentId: 'picaso',
                                prompt: combinedPrompt,
                                workerId: worker.id,
                                departmentId: 'design',
                            }),
                        });
                        
                        const data = await response.json();
                        
                        // Store output for next worker
                        previousOutput = data.response || '';
                        
                        // Update session with worker output and logs
                        await fetch('/api/sessions', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                action: 'update',
                                sessionId: sessionData.sessionId,
                                workerId: worker.id,
                                workerName: worker.name,
                                workerIndex: i,
                                status: data.success ? 'completed' : 'failed',
                                output: data.response,
                                logs: [
                                    `[${formatDate(new Date())}] Starting...`,
                                    `[${formatDate(new Date())}] Task completed`,
                                    data.success ? '✅ Worker completed successfully' : '❌ Worker failed'
                                ],
                            }),
                        });
                        
                        setDepartment(prev => {
                            if (!prev) return prev;
                            return {
                                ...prev,
                                workers: prev.workers.map(w => 
                                    w.id === worker.id ? { 
                                        ...w, 
                                        status: data.success ? 'Completed' as WorkerStatus : 'Failed' as WorkerStatus,
                                        output: data.response,
                                    } : w
                                )
                            };
                        });
                    } catch (error) {
                        console.error('Error running worker:', error);
                        setDepartment(prev => {
                            if (!prev) return prev;
                            return {
                                ...prev,
                                workers: prev.workers.map(w => 
                                    w.id === worker.id ? { ...w, status: 'Failed' as WorkerStatus } : w
                                )
                            };
                        });
                    }
                }
            }
        }
        
        setDepartmentStatus('Completed');
        
        // Refresh sessions
        fetchSessions();
    };

    const handleReset = async () => {
        setDepartmentStatus('Idle');
        setCurrentSession(null);
        
        // Delete all sessions and reset workers
        await fetch('/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'deleteAll' }),
        });
        
        await fetch('/api/departments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'reset',
                departmentId: 'design',
            }),
        });
        
        fetchDepartment();
        fetchSessions();
    };

    if (loading) {
        return (
            <div className="p-6 lg:p-10 flex items-center justify-center h-full">
                <div className="text-zinc-400 flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading department...
                </div>
            </div>
        );
    }

    const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', sessionId }),
            });
            if (currentSession?.id === sessionId) {
                setCurrentSession(null);
            }
            fetchSessions();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-white/90 text-2xl font-bold tracking-wide flex items-center gap-3">
                        Design Department
                        <span className="px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                            BOT-P.I.C.A.S.O
                        </span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSessions(!showSessions)}
                            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-3 py-2 rounded transition-all"
                        >
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-bold">Sessions ({sessions.length})</span>
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-3 py-2 rounded transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleStartDepartment}
                            disabled={departmentStatus === 'Running'}
                            className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {departmentStatus === 'Running' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm font-bold tracking-widest uppercase">Running...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    <span className="text-sm font-bold tracking-widest uppercase">Start All</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Overview of the design team agents. These workers handle scraping, pattern extraction, project generation, and design system creation. Each worker runs sequentially.
                </p>
            </header>

            {/* Sessions Panel */}
            {showSessions && (
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4">
                    <h2 className="text-white font-bold mb-4">Previous Sessions</h2>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => setCurrentSession(session)}
                                className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-left group"
                            >
                                <div>
                                    <div className="text-white text-sm font-bold">{session.id}</div>
                                    <div className="text-zinc-500 text-xs">
                                        {formatDate(session.startedAt)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => handleDeleteSession(session.id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-600 rounded text-zinc-400 hover:text-red-400 transition-all"
                                        title="Delete session"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {session.status === 'completed' ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                    ) : session.status === 'failed' ? (
                                        <XCircle className="w-4 h-4 text-red-400" />
                                    ) : (
                                        <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                                    )}
                                    <span className="text-xs text-zinc-400 capitalize">{session.status}</span>
                                </div>
                            </div>
                        ))}
                        {sessions.length === 0 && (
                            <p className="text-zinc-500 text-sm">No previous sessions</p>
                        )}
                    </div>
                </div>
            )}

            {/* Current Session Info */}
            {currentSession && (
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-white font-bold">Current Session: {currentSession.id}</h2>
                        {sendingEmail && <span className="text-zinc-400 text-sm flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Sending notification...</span>}
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Started: {formatDate(currentSession.startedAt)}
                    </p>
                </div>
            )}

            {/* Worker Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {department?.workers.map((worker) => (
                    <WorkerCard
                        key={worker.id}
                        id={worker.id}
                        departmentId={worker.departmentId}
                        name={worker.name}
                        description={worker.description}
                        status={worker.status}
                        promptTemplate={worker.promptTemplate}
                        output={worker.output}
                        logs={worker.logs || []}
                        sessionId={currentSession?.id}
                        onStatusChange={handleWorkerStatusChange}
                        onComplete={handleWorkerComplete}
                    />
                ))}
            </div>

            {/* Worker Outputs / Notes Section */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-green-400" />
                    <h2 className="text-white font-bold text-lg">Worker Outputs & Notes</h2>
                </div>
                
                <div className="space-y-4">
                    {department?.workers.filter(w => w.output).map((worker) => (
                        <div key={worker.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                            <button
                                onClick={() => setExpandedWorker(expandedWorker === worker.id ? null : worker.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-zinc-700 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        worker.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                        worker.status === 'Running' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-zinc-500/20 text-zinc-400'
                                    }`}>
                                        {worker.status.toUpperCase()}
                                    </span>
                                    <span className="text-white font-bold">{worker.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-500 text-xs">
                                        {worker.output?.substring(0, 50)}...
                                    </span>
                                    {expandedWorker === worker.id ? (
                                        <ChevronUp className="w-4 h-4 text-zinc-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                                    )}
                                </div>
                            </button>
                            
                            {expandedWorker === worker.id && worker.output && (
                                <div className="p-4 border-t border-zinc-700">
                                    <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-mono bg-zinc-900 p-4 rounded-lg overflow-auto max-h-96">
                                        {worker.output}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {!department?.workers.some(w => w.output) && (
                        <p className="text-zinc-500 text-sm">No worker outputs yet. Run a worker to see results here.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
