"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Paintbrush,
    Code2,
    PenTool,
    Megaphone,
    Briefcase,
    TrendingUp,
    Settings,
    UserCircle2,
    Notebook,
} from "lucide-react";

const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Notes", href: "/notes", icon: Notebook },
    { name: "Design", href: "/design", icon: Paintbrush },
    { name: "Development", href: "/development", icon: Code2 },
    { name: "Content Creation", href: "/content-creation", icon: PenTool },
    { name: "Marketing", href: "/marketing", icon: Megaphone },
    { name: "Leads", href: "/leads", icon: Briefcase },
    { name: "Investments", href: "/investments", icon: TrendingUp },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "w-64 flex-shrink-0 h-full px-5 py-6 bg-zinc-950 border-r border-[#1a1a1a] flex flex-col justify-between overflow-y-auto z-20 shadow-2xl transition-all",
                className
            )}
        >
            <div className="flex flex-col gap-10">
                <div className="px-2 flex items-center gap-3">
                    <div className="w-9 h-9 border border-zinc-700 rounded flex items-center justify-center bg-zinc-900 shadow-inner">
                        <span className="text-white font-bold text-sm tracking-widest">OS</span>
                    </div>
                    <div className="font-bold text-white text-xl tracking-widest uppercase">
                        AMD CORE
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3.5 px-4 py-3 rounded-lg transition-all duration-300 text-[15px] font-semibold tracking-wide border",
                                    isActive
                                        ? "bg-[#111] text-white border-zinc-700 shadow-md transform scale-[1.02]"
                                        : "text-zinc-500 border-transparent hover:bg-zinc-900 hover:text-white"
                                )}
                            >
                                <Icon className={cn("w-4 h-4", isActive ? "text-green-500 dropdown-shadow" : "")} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-3 px-2">
                <UserCircle2 className="w-10 h-10 text-zinc-600" />
                <div className="flex flex-col overflow-hidden">
                    <span className="text-white text-sm font-bold truncate tracking-wider">
                        Owen Freaking J
                    </span>
                    <span className="text-green-500 text-xs font-semibold uppercase tracking-widest truncate">
                        Admin Pro
                    </span>
                </div>
            </div>
        </aside>
    );
}
