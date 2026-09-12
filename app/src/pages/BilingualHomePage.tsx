import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Sparkles, Users, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { getCategories, getProjects } from "../api/client";
import { demoProjects } from "../api/demo";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/Button";
import { SearchIcon } from "../components/AppShell";
import { useI18n } from "../i18n/I18nProvider";

const fallbackCategories = ["Design & Creative", "Development", "Marketing", "Writing & Content"];

export function BilingualHomePage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const categories = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const query = useMemo(() => { const params = new URLSearchParams({ page: "1", pageSize: "6" }); if (search.trim()) params.set("q", search.trim()); if (currency) params.set("currency", currency); if (activeCategory) params.set("categoryId", activeCategory); return `?${params.toString()}`; }, [search, currency, activeCategory]);
  const projects = useQuery({ queryKey: ["projects", query], queryFn: () => getProjects(query) });
  const categoryItems = categories.data?.data ?? [];
  const visibleProjects = projects.data?.data ?? (projects.isError ? demoProjects.data : []);
  const projectError = projects.error instanceof Error ? projects.error.message : "The API could not be reached.";

  return <>
    <section className="hero"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-inner"><div className="eyebrow"><span className="eyebrow-dot" />{t("futureOfIndependentWork")}</div><h1>{t("goodWorkStarts")}<br /><em>{t("withTheRightPeople")}</em></h1><p className="hero-copy">{t("heroCopy")}</p><form className="hero-search" onSubmit={(event) => { event.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}><SearchIcon /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("searchPlaceholder")} aria-label={t("searchProjects")} /><Button type="submit">{t("searchProjects")} <ArrowUpRight size={16} /></Button></form><div className="popular-searches"><span>{t("popular")}</span><button onClick={() => setSearch("branding")}>{t("brandIdentity")}</button><button onClick={() => setSearch("website")}>{t("websiteDesign")}</button><button onClick={() => setSearch("content")}>{t("contentWriting")}</button></div></div><div className="hero-note"><span>↓</span><span>{t("scrollToExplore")}</span></div></section>
    <section className="trust-strip"><div><strong>{t("builtForMeaningfulWork")}</strong><span>{t("thoughtfullyMatched")}</span></div><div className="trust-stats"><span><strong>10k+</strong>{t("talents")}</span><span><strong>4.9/5</strong>{t("averageRating")}</span><span><strong>48h</strong>{t("firstMatch")}</span></div></section>
    <section className="section projects-section" id="projects"><div className="section-heading"><div><div className="eyebrow dark"><span className="eyebrow-dot" />{t("exploreMarketplace")}</div><h2>{t("findNext")}<br /><em>{t("greatCollaboration")}</em></h2></div><p>{t("marketplaceCopy")}</p></div><div className="filter-bar"><div className="filter-categories"><button className={!activeCategory ? "filter-pill active" : "filter-pill"} onClick={() => setActiveCategory("")}>{t("allProjects")}</button>{(categoryItems.length ? categoryItems.slice(0, 4) : fallbackCategories.map((name) => ({ id: name, name }))).map((category) => <button key={category.id} className={activeCategory === category.id ? "filter-pill active" : "filter-pill"} onClick={() => categoryItems.length && setActiveCategory(category.id)}>{category.name}</button>)}</div><label className="select-wrap">{t("currency")} <select value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="">{t("allCurrencies")}</option><option value="USD">USD</option><option value="THB">THB</option></select><ArrowDown size={14} /></label></div>{projects.isLoading ? <div className="loading-grid">{[1, 2, 3].map((item) => <div className="skeleton" key={item} />)}</div> : <>{projects.isError && <div className="connection-banner"><div><strong>{t("apiOffline")}</strong><span>{projectError} {t("startApi")}</span></div><button onClick={() => projects.refetch()}>{t("retryConnection")}</button></div>}<div className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}</div></>}{projects.data?.meta && <div className="results-footer"><span>{t("showProjects", { count: projects.data.data.length, total: projects.data.meta.total })}</span><button>{t("viewAllProjects")} <ChevronRight size={16} /></button></div>}</section>
    <section className="section how-section" id="how-it-works"><div className="how-copy"><div className="eyebrow dark"><span className="eyebrow-dot" />{t("betterWayToWork")}</div><h2>{t("moreThan")}<br /><em>{t("marketplace")}</em></h2><p>{t("betterWayCopy")}</p><Button variant="secondary">{t("learnHowItWorks")} <ArrowUpRight size={16} /></Button></div><div className="principles"><div className="principle"><span className="principle-icon"><Sparkles size={20} /></span><div><h3>{t("qualityTitle")}</h3><p>{t("qualityCopy")}</p></div></div><div className="principle"><span className="principle-icon"><Users size={20} /></span><div><h3>{t("peopleTitle")}</h3><p>{t("peopleCopy")}</p></div></div><div className="principle"><span className="principle-icon"><Zap size={20} /></span><div><h3>{t("momentumTitle")}</h3><p>{t("momentumCopy")}</p></div></div></div></section>
    <section className="cta-section" id="talent"><div><span className="eyebrow"><span className="eyebrow-dot" />{t("readyWhenYouAre")}</span><h2>{t("bringNextIdea")}<br /><em>{t("toLifeWithArcher")}</em></h2></div><div className="cta-actions"><p>{t("ctaCopy")}</p><Button>{t("getStarted")} <ArrowUpRight size={16} /></Button><span className="cta-check"><Check size={15} />{t("noPayment")}</span></div></section>
  </>;
}
