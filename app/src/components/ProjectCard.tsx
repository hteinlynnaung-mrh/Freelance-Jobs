import { ArrowUpRight, Bookmark, Clock3, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/Badge";
import type { Project } from "../api/types";
const money = (amountMinor: number, currency: Project["currency"]) => new Intl.NumberFormat(currency === "THB" ? "th-TH" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amountMinor / 100);
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={featured ? "project-card featured-card" : "project-card"}><div className="card-topline"><Badge>{project.category?.name ?? "Independent"}</Badge><button className="save-button" aria-label="Save project"><Bookmark size={17} /></button></div><Link to={`/projects/${project.id}`} className="project-title">{project.title}</Link><p className="project-excerpt">{project.description}</p><div className="skill-list">{project.skills.slice(0, 3).map(({ skill }) => <span key={skill.id}>{skill.name}</span>)}</div><div className="project-meta"><span><DollarSign size={15} />{money(project.budgetMinor, project.currency)} {project.budgetType === "HOURLY" ? "/ hr" : "fixed"}</span><span><Clock3 size={15} />{project.deadline ? `Due ${new Date(project.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : "Flexible timeline"}</span></div><Link to={`/projects/${project.id}`} className="card-link">View project <ArrowUpRight size={16} /></Link></article>;
}
