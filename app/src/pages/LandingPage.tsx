import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export function LandingPage() {
  const { t } = useI18n();

  return <div className="landing-page">
    <section className="landing-hero">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      <div className="landing-hero-inner">
        <div className="landing-hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" />{t("landingEyebrow")}</div>
          <h1>{t("landingTitle")}<br /><em>{t("landingTitleAccent")}</em></h1>
          <p>{t("landingCopy")}</p>
          <div className="landing-actions"><Link to="/register" className="button button-primary">{t("getStarted")} <ArrowUpRight size={16} /></Link><Link to="/projects" className="button button-ghost landing-browse">{t("browseProjects")} <ArrowRight size={16} /></Link></div>
          <div className="landing-checks"><span><CheckCircle2 size={15} />{t("noPayment")}</span><span><CheckCircle2 size={15} />{t("remote")}</span></div>
        </div>
        <div className="landing-hero-visual" aria-hidden="true">
          <div className="landing-visual-label">ARCHER / 01</div>
          <div className="landing-visual-card landing-visual-card-main"><span className="landing-visual-kicker">{t("landingTrust")}</span><strong>{t("goodWorkStarts")}</strong><em>{t("withTheRightPeople")}</em><div className="landing-visual-line" /><small>10k+ {t("talents")}</small></div>
          <div className="landing-visual-card landing-visual-card-float"><Sparkles size={17} /><span>{t("qualityTitle")}</span></div>
        </div>
      </div>
    </section>

    <section className="landing-trust"><span>{t("landingTrust")}</span><div className="landing-trust-list"><strong>Northstar</strong><strong>Fieldwork</strong><strong>Studio 24</strong><strong>Common Ground</strong></div></section>

    <section className="landing-section landing-features"><div className="landing-section-heading"><div><div className="eyebrow dark"><span className="eyebrow-dot" />{t("betterWayToWork")}</div><h2>{t("moreThan")}<br /><em>{t("marketplace")}</em></h2></div><p>{t("betterWayCopy")}</p></div><div className="landing-feature-grid"><article><span className="landing-feature-icon"><Sparkles size={20} /></span><h3>{t("qualityTitle")}</h3><p>{t("qualityCopy")}</p></article><article><span className="landing-feature-icon"><Users size={20} /></span><h3>{t("peopleTitle")}</h3><p>{t("peopleCopy")}</p></article><article><span className="landing-feature-icon"><Zap size={20} /></span><h3>{t("momentumTitle")}</h3><p>{t("momentumCopy")}</p></article></div></section>

    <section className="landing-section landing-process" id="how-it-works"><div className="landing-section-heading"><div><div className="eyebrow dark"><span className="eyebrow-dot" />{t("landingHowEyebrow")}</div><h2>{t("landingHowTitle")}<br /><em>{t("landingHowTitleAccent")}</em></h2></div></div><div className="landing-step-grid"><article><span>01</span><h3>{t("landingStepOne")}</h3><p>{t("landingStepOneCopy")}</p></article><article><span>02</span><h3>{t("landingStepTwo")}</h3><p>{t("landingStepTwoCopy")}</p></article><article><span>03</span><h3>{t("landingStepThree")}</h3><p>{t("landingStepThreeCopy")}</p></article></div></section>

    <section className="landing-cta" id="talent"><div><div className="eyebrow"><span className="eyebrow-dot" />{t("readyWhenYouAre")}</div><h2>{t("landingCtaTitle")}</h2><p>{t("landingCtaCopy")}</p></div><Link to="/register" className="button button-primary">{t("createAccount")} <ArrowUpRight size={16} /></Link></section>
  </div>;
}
