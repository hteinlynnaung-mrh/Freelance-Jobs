import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, Search } from "lucide-react";
import { useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell">
    <header className="site-header"><div className="header-inner"><Link to="/" className="brand" aria-label="Archer home"><span className="brand-mark">A</span><span>Archer</span></Link><nav className={menuOpen ? "nav-links nav-open" : "nav-links"}><NavLink to="/" end>Find work</NavLink><a href="#how-it-works">How it works</a><a href="#talent">For talent</a></nav><div className="header-actions"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={20} /></button><Link to="/login" className="header-login">Sign in</Link><Link to="/login?mode=register" className="button button-primary header-cta">Post a project <ArrowUpRight size={16} /></Link></div></div></header>
    <main>{children}</main>
    <footer className="site-footer"><div className="footer-inner"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">A</span><span>Archer</span></Link><p>A calmer way to find exceptional people for important work.</p></div><div className="footer-links"><a href="#how-it-works">How it works</a><a href="#talent">Find talent</a><a href="#projects">Explore projects</a><Link to="/login">Sign in</Link></div><small>© 2026 Archer. Built for better work.</small></div></footer>
  </div>;
}
export function SearchIcon() { return <Search size={18} strokeWidth={2.2} />; }
