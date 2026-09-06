import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Sparkles, Users, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { getCategories, getProjects } from "../api/client";
import { demoProjects } from "../api/demo";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/Button";
import { SearchIcon } from "../components/AppShell";

const fallbackCategories = ["Design & Creative", "Development", "Marketing", "Writing & Content"];

export function HomePage() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const categories = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const query = useMemo(() => {
    const params = new URLSearchParams({ page: "1", pageSize: "6" });
    if (search.trim()) params.set("q", search.trim());
    if (currency) params.set("currency", currency);
    if (activeCategory) params.set("categoryId", activeCategory);
    return `?${params.toString()}`;
  }, [search, currency, activeCategory]);
  const projects = useQuery({ queryKey: ["projects", query], queryFn: () => getProjects(query) });
  const categoryItems = categories.data?.data ?? [];
  const visibleProjects = projects.data?.data ?? (projects.isError ? demoProjects.data : []);
  const usingDemoData = projects.isError;
  const projectError = projects.error instanceof Error ? projects.error.message : "The API could not be reached.";

  return <>
    <section className="hero"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-inner"><div className="eyebrow"><span className="eyebrow-dot" />The future of independent work</div><h1>Good work starts<br /><em>with the right people.</em></h1><p className="hero-copy">Archer brings ambitious teams and exceptional independent talent together — with less noise, more trust, and a better way to work.</p><form className="hero-search" onSubmit={(event) => { event.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}><SearchIcon /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="What kind of work do you need help with?" aria-label="Search projects" /><Button type="submit">Search projects <ArrowUpRight size={16} /></Button></form><div className="popular-searches"><span>Popular:</span><button onClick={() => setSearch("branding")}>Brand identity</button><button onClick={() => setSearch("website")}>Website design</button><button onClick={() => setSearch("content")}>Content writing</button></div></div><div className="hero-note"><span>↓</span><span>Scroll to explore</span></div></section>
    <section className="trust-strip"><div><strong>Built for meaningful work</strong><span>Independent talent, thoughtfully matched</span></div><div className="trust-stats"><span><strong>10k+</strong>talents</span><span><strong>4.9/5</strong>average rating</span><span><strong>48h</strong>to first match</span></div></section>
    <section className="section projects-section" id="projects"><div className="section-heading"><div><div className="eyebrow dark"><span className="eyebrow-dot" />Explore the marketplace</div><h2>Find your next<br /><em>great collaboration.</em></h2></div><p>From one-off projects to long-term partnerships, discover people who care about the craft as much as you do.</p></div><div className="filter-bar"><div className="filter-categories"><button className={!activeCategory ? "filter-pill active" : "filter-pill"} onClick={() => setActiveCategory("")}>All projects</button>{(categoryItems.length ? categoryItems.slice(0, 4) : fallbackCategories.map((name) => ({ id: name, name }))).map((category) => <button key={category.id} className={activeCategory === category.id ? "filter-pill active" : "filter-pill"} onClick={() => categoryItems.length && setActiveCategory(category.id)}>{category.name}</button>)}</div><label className="select-wrap">Currency <select value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="">All currencies</option><option value="USD">USD</option><option value="THB">THB</option></select><ArrowDown size={14} /></label></div>{projects.isLoading ? <div className="loading-grid">{[1, 2, 3].map((item) => <div className="skeleton" key={item} />)}</div> : <>{usingDemoData && <div className="connection-banner"><div><strong>API is offline — showing sample projects</strong><span>{projectError} Start the API on port 5001 to load live data.</span></div><button onClick={() => projects.refetch()}>Retry connection</button></div>}<div className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}</div>{!visibleProjects.length && <div className="empty-state"><h3>No projects found</h3><p>Try another search or clear the filters.</p></div>}</>}{projects.data?.meta && <div className="results-footer"><span>Showing {projects.data.data.length} of {projects.data.meta.total} projects</span><button>View all projects <ChevronRight size={16} /></button></div>}</section>
    <section className="section how-section" id="how-it-works"><div className="how-copy"><div className="eyebrow dark"><span className="eyebrow-dot" />A better way to work</div><h2>More than a<br /><em>marketplace.</em></h2><p>Archer is designed around the things that make independent work great: clear expectations, mutual respect, and room to do your best work.</p><Button variant="secondary">Learn how it works <ArrowUpRight size={16} /></Button></div><div className="principles"><div className="principle"><span className="principle-icon"><Sparkles size={20} /></span><div><h3>Quality, not quantity</h3><p>Profiles and projects with enough substance to make a thoughtful decision.</p></div></div><div className="principle"><span className="principle-icon"><Users size={20} /></span><div><h3>People, not profiles</h3><p>Build lasting working relationships beyond a single brief.</p></div></div><div className="principle"><span className="principle-icon"><Zap size={20} /></span><div><h3>Momentum from day one</h3><p>Clear communication and simple tools keep good work moving.</p></div></div></div></section>
    <section className="cta-section" id="talent"><div><span className="eyebrow"><span className="eyebrow-dot" />Ready when you are</span><h2>Bring your next idea<br /><em>to life with Archer.</em></h2></div><div className="cta-actions"><p>Whether you’re building a team or building your practice, there’s a place for your best work here.</p><Button>Get started <ArrowUpRight size={16} /></Button><span className="cta-check"><Check size={15} />No payment integration yet — just great work.</span></div></section>
  </>;
}
