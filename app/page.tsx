import { DepartmentCard } from "@/components/department-card";

const DEPARTMENTS = [
  {
    title: "Designs",
    botName: "P.I.C.A.S.O👨🎨",
    role: "Design Engineer",
    href: "/design",
    status: "Completed" as const,
    workers: [
      { name: "Scrape top Designs from Dribble, Behance, Awwwards" },
      { name: "Export Patterns - Layout, Colors, Typography, Styles" },
      { name: "Generate Similar Project, Sitemap, Structure Etc" },
      { name: "Generate Landing Page - Dashboard, Startup website" },
      { name: "Re-evaluate Generated Design, Find Flaws and Fix" },
      { name: "Evaluate Design System and Integrate features" },
    ],
  },
  {
    title: "Development",
    botName: "D.E.X.T.E.R",
    role: "Senior Developer",
    href: "/development",
    status: "Completed" as const,
    workers: [
      { name: "Analyze engineering trends" },
      { name: "Generate product Ideas" },
      { name: "System Architect" },
      { name: "Repository bug hunting and optimization" },
      { name: "Generate Landing Page - Dashboard, Startup website" },
    ],
  },
  {
    title: "Content Creator",
    botName: "R.Y.A.N",
    role: "Marketing Director",
    href: "/content-creation",
    status: "Running" as const,
    workers: [
      { name: "Content Idea Generator", description: "Feed my content engine endlessly" },
      { name: "Content Production Worker", description: "actually write the content." },
      { name: "Content Repurposing Worker", description: "multiply output." },
      { name: "SEO Content Worker", description: "Generate Content continually" },
      { name: "Growth Experiment Worker", description: "Test marketing ideas." },
    ],
  },
  {
    title: "Marketing",
    botName: "S.A.M",
    role: "Marketing Director",
    href: "/marketing",
    status: "Running" as const,
    workers: [
      { name: "Market Intelligence Worker", description: "Understand what people care about right now." },
      { name: "Content Idea Generator", description: "Feed my content engine endlessly" },
      { name: "Content Production Worker", description: "actually write the content." },
      { name: "Content Repurposing Worker", description: "multiply output." },
      { name: "SEO Content Worker", description: "Generate Content continually" },
      { name: "Lead Generation Worker", description: "find potential clients." },
      { name: "Outreach Worker", description: "generate personalized emails" },
      { name: "Analytics Worker", description: "Analyze post engagements" },
      { name: "Growth Experiment Worker", description: "Test marketing ideas." },
    ],
  },
  {
    title: "Leads",
    botName: "S.A.M",
    role: "Outreach & Pipeline Manager",
    href: "/leads",
    status: "Completed" as const,
    workers: [
      { name: "Opportunity Scanner", description: "Purpose: constantly find potential clients." },
      { name: "Website Analyzer", description: "Purpose: identify companies with bad websites." },
      { name: "Lead Qualifier", description: "filter serious opportunities." },
      { name: "Contact Finder", description: "Purpose: locate the actual decision maker." },
      { name: "Personalization Worker", description: "Purpose: avoid generic outreach." },
      { name: "Outreach Generator", description: "Purpose: create different outreach styles." },
      { name: "CRM Tracker", description: "Purpose: keep everything organized." },
    ],
  },
  {
    title: "Investment",
    botName: "W.A.R.R.E.N",
    role: "Investment Manager",
    href: "/investments",
    status: "Completed" as const,
    workers: [
      { name: "Market Intelligence Worker", description: "Purpose: track global market movements and sentiment." },
      { name: "Opportunity Scanner", description: "Purpose: detect assets with unusual activity or strong potential." },
      { name: "Fundamental Analysis Worker", description: "Purpose: evaluate long-term value using financial and ecosystem data." },
      { name: "Technical Analysis Worker", description: "Purpose: analyze price behavior and market trends." },
      { name: "Risk Management Worker", description: "Purpose: determine position sizing and protect capital." },
      { name: "Portfolio Manager", description: "Purpose: manage asset allocation and rebalance the portfolio." },
      { name: "Trade Execution Planner", description: "Purpose: generate structured trade setups and entry strategies." },
      { name: "Performance Tracker", description: "Purpose: monitor trade performance and portfolio returns." },
      { name: "Investment Research Worker", description: "Purpose: discover emerging sectors, startups, and financial opportunities." },
      { name: "Strategy Improvement Worker", description: "Purpose: analyze past performance and refine trading strategies." },
    ],
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-8 h-full">
      <header className="flex flex-col gap-2">
        <h1 className="text-white text-2xl font-bold tracking-widest uppercase font-['Monda']">
          Autonomous Mission Dashboard
        </h1>
        <p className="text-zinc-400 text-[13px] max-w-2xl font-bold font-['Monda']">
          OVERVIEW OF ALL AI DEPARTMENTS AND ACTIVE MISSION STATUS. CLICK ON START TO LAUNCH OPERATIONS.
        </p>
      </header>

      <div className="flex flex-wrap gap-6 items-start pb-10">
        {DEPARTMENTS.map((dept, index) => (
          <DepartmentCard key={index} {...dept} />
        ))}
      </div>
    </div>
  );
}
