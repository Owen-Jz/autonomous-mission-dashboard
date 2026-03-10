export default function Settings() {
    return (
        <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
            <header className="flex flex-col gap-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wide">
                    Settings
                </h1>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Manage system configurations, global AI parameters, API keys, and notification channels.
                </p>
            </header>

            <div className="flex flex-col gap-6 max-w-2xl">
                <div className="p-6 bg-zinc-800 rounded-xl border border-zinc-700 space-y-4">
                    <h2 className="text-white font-medium text-lg border-b border-zinc-700/50 pb-2">Global System Tuning</h2>
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-300">Strict Error Halting</span>
                            <div className="w-10 h-5 bg-zinc-600 rounded-full flex items-center p-1">
                                <div className="w-3.5 h-3.5 bg-zinc-400 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-300">Verbose System Logs</span>
                            <div className="w-10 h-5 bg-green-500 rounded-full flex items-center p-1 justify-end">
                                <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-zinc-800 rounded-xl border border-zinc-700 space-y-4 opacity-50 cursor-not-allowed">
                    <h2 className="text-white font-medium text-lg border-b border-zinc-700/50 pb-2">Agent Overrides</h2>
                    <p className="text-xs text-zinc-400 pb-2">Modify global limits across all worker threads. (Requires Admin Pro)</p>
                    <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-white">Max Concurrency Models</label>
                            <input disabled type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-500" value="8" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-white">Main API Gateway URL</label>
                            <input disabled type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-500" value="wss://internal-hq.agent.systems/v1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
