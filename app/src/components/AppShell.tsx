import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { useTheme } from "../theme/ThemeProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  return <div className="app-shell">
    <header className="site-header"><div className="header-inner"><Link to="/" className="brand" aria-label="Archer home"><span className="brand-mark">A</span><span>Archer</span></Link><nav className={menuOpen ? "nav-links nav-open" : "nav-links"}><NavLink to="/projects" end>{t("findWork")}</NavLink><a href="#how-it-works">{t("howItWorks")}</a><a href="#talent">{t("forTalent")}</a></nav><div className="header-actions"><button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={theme === "dark"} aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")} title={theme === "dark" ? t("switchToLight") : t("switchToDark")}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button><label className="language-switcher"><span>{t("language")}</span><select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "my")}><option value="en">{t("english")}</option><option value="my">{t("burmese")}</option></select></label><button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={20} /></button><Link to="/login" className="header-login">{t("signIn")}</Link><Link to="/register" className="button button-primary header-cta">{t("postProject")} <ArrowUpRight size={16} /></Link></div></div></header>
    <main>{children}</main>
    <footer className="site-footer"><div className="footer-inner"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">A</span><span>Archer</span></Link><p>{t("footerTagline")}</p></div><div className="footer-links"><a href="#how-it-works">{t("howItWorks")}</a><a href="#talent">{t("findTalent")}</a><a href="#projects">{t("exploreProjects")}</a><Link to="/login">{t("signIn")}</Link></div><small>© 2026 Archer. {t("builtForMeaningfulWork")}.</small></div></footer>
  </div>;
}
export function SearchIcon() { return <Search size={18} strokeWidth={2.2} />; }
