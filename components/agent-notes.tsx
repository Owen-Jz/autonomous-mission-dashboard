import { FileText, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Note {
    id: string | number;
    title: string;
    content: string;
    date: string;
    agent: string;
}

interface AgentNotesProps {
    notes: Note[];
    className?: string;
}

export function AgentNotes({ notes, className }: AgentNotesProps) {
    return (
        <div className={cn("flex flex-col gap-4 mt-8", className)}>
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <FileText className="w-5 h-5 text-zinc-400" />
                <h2 className="text-white text-lg font-bold tracking-widest font-['Monda']">
                    AGENT NOTES & LOGS
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-[#151515] rounded-xl border border-zinc-800 p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-white font-bold tracking-wider text-[15px] font-['Monda']">
                                    {note.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-zinc-500 font-['Monda']">
                                        BOT-{note.agent}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                    <span className="text-[10px] font-semibold text-zinc-600 tracking-wider">
                                        {note.date}
                                    </span>
                                </div>
                            </div>
                            <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="text-zinc-400 text-sm leading-relaxed p-3 bg-[#0a0a0a]/50 rounded-lg border border-zinc-800/50 font-['Monda'] whitespace-pre-wrap">
                            {note.content}
                        </div>
                    </div>
                ))}

                {notes.length === 0 && (
                    <div className="py-8 text-center border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 text-sm font-['Monda']">No notes have been logged for this department yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
