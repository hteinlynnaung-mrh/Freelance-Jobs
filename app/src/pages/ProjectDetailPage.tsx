import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Clock3, DollarSign, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProject } from "../api/client";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
const money = (amountMinor: number, currency: string) => new Intl.NumberFormat(currency === "THB" ? "th-TH" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amountMinor / 100);
export function ProjectDetailPage() {
  const { id = "" } = useParams();
  const project = useQuery({ queryKey: ["project", id], queryFn: () => getProject(id) });
  if (project.isLoading) return <div className="detail-state">Loading project…</div>;
  if (project.isError || !project.data) return <div className="detail-state"><h2>Project not found</h2><Link to="/">Back to projects</Link></div>;
  const item = project.data.data;
  return <div className="detail-page"><div className="detail-inner"><Link to="/" className="back-link"><ArrowLeft size={16} />Back to projects</Link><div className="detail-layout"><article className="detail-main"><div className="eyebrow dark"><span className="eyebrow-dot" />Project brief</div><h1>{item.title}</h1><div className="detail-tags"><Badge>{item.category?.name ?? "Independent"}</Badge>{item.skills.map(({ skill }) => <span key={skill.id}>{skill.name}</span>)}</div><div className="detail-divider" /><h2>About the project</h2><p className="detail-description">{item.description}</p><h2>What you’ll work on</h2><ul className="detail-list"><li><CheckCircle2 size={18} />Shape a clear, thoughtful solution from brief to delivery.</li><li><CheckCircle2 size={18} />Collaborate directly with the project owner.</li><li><CheckCircle2 size={18} />Bring your point of view and high standard of craft.</li></ul></article><aside className="detail-sidebar"><div className="brief-card"><div className="brief-label">Project budget</div><strong>{money(item.budgetMinor, item.currency)}</strong><span>{item.budgetType === "HOURLY" ? "per hour" : "fixed price"}</span><div className="brief-row"><DollarSign size={17} /><div><small>Currency</small><b>{item.currency}</b></div></div><div className="brief-row"><Clock3 size={17} /><div><small>Timeline</small><b>{item.deadline ? `Due ${new Date(item.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "Flexible"}</b></div></div><div className="brief-row"><MapPin size={17} /><div><small>Work style</small><b>Remote</b></div></div><Button className="full-button">Apply to this project <ArrowUpRight size={16} /></Button><p className="sidebar-note"><CalendarDays size={14} /> No payment is collected at this stage.</p></div></aside></div></div></div>;
}
