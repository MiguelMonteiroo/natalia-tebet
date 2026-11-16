import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

const whatsappUrl = "https://wa.me/5521996096926";
const instagramUrl = "https://www.instagram.com/dranataliatebet";
const doctoraliaUrl = "https://www.doctoralia.com.br/perfil/natalia-castro-vicente-tebet";

const navItems = [
  ["Início", "#inicio"],
  ["Sobre", "#sobre"],
  ["Atendimentos", "#atendimentos"],
  ["Colonoscopia", "#colonoscopia"],
  ["Hemorróidas", "#hemorroidas"],
  ["Cirurgia a laser", "#laser"],
  ["Toxina", "#toxina"],
  ["Estética íntima", "#estetica"],
  ["Contato", "#contato"],
];

const services = [
  {
    title: "Consulta em Coloproctologia",
    description:
      "Avaliação completa das condições do intestino, reto e ânus, com escuta atenta e plano de tratamento individualizado.",
  },
  {
    title: "Colonoscopia",
    description:
      "Exame de rastreamento e diagnóstico do cólon e reto, indicado para investigação de sangramento, alterações intestinais e prevenção de câncer.",
  },
  {
    title: "Tratamento de Hemorróidas",
    description:
      "Opções clínicas e cirúrgicas para alívio da dor, sangramento e incômodo, com técnicas minimamente invasivas quando indicado.",
  },
  {
    title: "Cirurgia a Laser",
    description:
      "Tecnologia moderna para tratamento de fissuras, fístulas e hemorróidas, com menos dor no pós-operatório e recuperação mais rápida.",
  },
  {
    title: "Toxina Botulínica",
    description:
      "Aplicação segura para condições específicas da região anal, como fissuras crônicas e hipertrofia do esfíncter, sempre sob avaliação médica.",
  },
  {
    title: "Estética Íntima",
    description:
      "Procedimentos para reposicionamento e rejuvenescimento da região genital, com abordagem médica, discreta e individualizada.",
  },
];

const credentials = [
  "Médica formada pela UFRJ",
  "Residência médica em Cirurgia Geral pelo HFCFF",
  "Especialização em Coloproctologia",
  "CRM/RJ 901733",
];

const locations = [
  {
    name: "Vila da Penha",
    address: "Edifício Punto Office\nEstrada Padre Roser, 42 - sala 604\nVila da Penha, Rio de Janeiro/RJ\nCEP 21220-560",
    phones: ["(21) 99609-6926", "(21) 3988-8547"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Estrada+Padre+Roser+42+Vila+da+Penha+Rio+de+Janeiro+RJ",
  },
  {
    name: "Barra da Tijuca",
    address: "Clínica Vidha\nAv. Ayrton Senna, 3000 - sala 3095\nBarra da Tijuca, Rio de Janeiro/RJ",
    phones: ["(21) 97255-0629", "(21) 99906-5921"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Av+Ayrton+Senna+3000+Barra+da+Tijuca+Rio+de+Janeiro+RJ",
  },
  {
    name: "Hospital Quinta D'Or",
    address: "Centro de Especialidades\nRua Almirante Baltazar, 435\nSão Cristóvão, Rio de Janeiro/RJ",
    phones: ["(21) 99609-6926"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Almirante+Baltazar+435+Rio+de+Janeiro+RJ",
  },
];

function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M10 5l5 5-5 5" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const menuButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (menuOpen) return;
    if (latest < 80) {
      setHidden(false);
    } else if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.querySelector("main")?.setAttribute("inert", "");
      document.querySelector("footer")?.setAttribute("inert", "");
      return () => {
        document.body.style.overflow = originalOverflow;
        document.querySelector("main")?.removeAttribute("inert");
        document.querySelector("footer")?.removeAttribute("inert");
      };
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const headerHidden = !menuOpen && hidden && !hasFocus;

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ y: 0 }}
        animate={{ y: headerHidden ? "-100%" : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setHasFocus(false);
          }
        }}
      >
        <div className="header-inner">
          <a className="wordmark" href="#inicio" aria-label="Dra. Natália Tebet, início">
            <img src="/assets/logo.png" alt="" />
            <span>Dra. Natália Tebet</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>

          <motion.button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={reduceMotion ? undefined : { y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            <span /><span />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            id="mobile-navigation"
            aria-label="Navegação principal"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
            <a
              className="button button-primary mobile-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Agendar pelo WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollReveal({ children, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? false : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <Header />

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="section-wrap hero-inner">
            <div className="hero-copy">
              <span className="hero-eyebrow">Coloproctologia no Rio de Janeiro</span>
              <h1 id="hero-title">
                Cuidado especializado para a sua saúde <span>intestinal e pélvica</span>
              </h1>
              <p className="hero-lead">
                Dra. Natália Tebet é médica coloproctologista e oferece atendimento humanizado, discreto e embasado em evidências para adultos e adolescentes a partir dos 14 anos.
              </p>
              <div className="hero-detail">
                <span>CRM/RJ 901733</span>
                <span>Coloproctologista</span>
              </div>
              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} />
                  Agendar pelo WhatsApp
                </a>
                <a className="button button-secondary" href={doctoraliaUrl} target="_blank" rel="noreferrer">
                  Ver perfil na Doctoralia
                </a>
              </div>
            </div>
            <div className="hero-portrait">
              <div className="portrait-frame">
                <img
                  src="/assets/natalia.jpg"
                  alt="Dra. Natália Tebet, coloproctologista"
                  width="800"
                  height="1067"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section about-band" id="sobre" aria-labelledby="about-title">
          <div className="section-wrap about-inner">
            <ScrollReveal>
              <div className="about-copy">
                <span className="section-label">Sobre mim</span>
                <h2 id="about-title" className="section-title">Formação e atuação dedicada à coloproctologia</h2>
                <p>
                  A Dra. Natália Tebet acompanha pacientes com afecções do intestino, reto e ânus, sempre com uma escuta atenta e um olhar técnico. Entende que sintomas nessa área podem causar constrangimento e, por isso, prioriza um ambiente acolhedor e respeitoso.
                </p>
                <p>
                  Sua prática reúne o diagnóstico clínico, exames como colonoscopia e anuscopia, e tratamentos que vão desde condutas conservadoras até procedimentos cirúrgicos minimamente invasivos.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ul className="credentials-list">
                {credentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section className="section" id="atendimentos" aria-labelledby="services-title">
          <div className="section-wrap">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">Atendimentos</span>
                <h2 id="services-title" className="section-title">Serviços em coloproctologia</h2>
                <p className="section-subtitle">
                  Avaliação, diagnóstico e tratamento das principais condições que afetam o intestino, reto, ânus e região pélvica.
                </p>
              </div>
            </ScrollReveal>
            <div className="card-grid">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 0.05}>
                  <article className="info-card">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="colonoscopia" aria-labelledby="colonoscopy-title">
          <div className="section-wrap">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">Colonoscopia</span>
                <h2 id="colonoscopy-title" className="section-title">Rastreamento e diagnóstico do cólon e reto</h2>
                <p className="section-subtitle">
                  Exame essencial para investigar sangramentos, alterações do hábito intestinal, dores abdominais e para o rastreamento do câncer colorretal.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="info-card" style={{ maxWidth: "760px" }}>
                <h3>Quando fazer?</h3>
                <p>
                  A colonoscopia é indicada para pessoas a partir dos 45 anos sem sintomas, para rastreamento do câncer colorretal, e também para investigar sangramento, anemia, dor, alterações do hábito intestinal ou histórico familiar. A Dra. Natália orienta a preparação e realiza o exame com segurança.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section about-band" id="hemorroidas" aria-labelledby="hemorrhoids-title">
          <div className="section-wrap about-inner">
            <ScrollReveal>
              <div className="about-copy">
                <span className="section-label">Hemorróidas</span>
                <h2 id="hemorrhoids-title" className="section-title">Tratamento sem julgamento</h2>
                <p>
                  As hemorróidas são comuns e tratáveis. Os sintomas incluem sangramento, coceira, dor e incômodo ao evacuar. O tratamento pode ser clínico, com mudanças de hábitos, ou cirúrgico, quando necessário.
                </p>
                <p>
                  A Dra. Natália avalia cada caso individualmente e indica a melhor conduta, que pode incluir ligadura elástica, escleroterapia ou hemorroidectomia, sempre explicando os benefícios e cuidados de cada opção.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="info-card">
                <h3>Sintomas comuns</h3>
                <p>
                  Sangramento ao evacuar, nódulos na região anal, dor, coceira, sensação de peso e dificuldade de higiene. Se você tem algum desses sintomas, procure avaliação.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section" id="laser" aria-labelledby="laser-title">
          <div className="section-wrap">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">Cirurgia a laser</span>
                <h2 id="laser-title" className="section-title">Tecnologia para menos dor e recuperação mais rápida</h2>
                <p className="section-subtitle">
                  O laser pode ser utilizado no tratamento de hemorróidas, fissuras anais e fístulas, com precisão e menor trauma tecidual.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="info-card" style={{ maxWidth: "760px" }}>
                <h3>Vantagens</h3>
                <p>
                  Menor sangramento durante o procedimento, menos dor no pós-operatório, recuperação mais rápida e retorno mais cedo às atividades diárias. A indicação é feita após avaliação individual.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section about-band" id="toxina" aria-labelledby="toxin-title">
          <div className="section-wrap about-inner">
            <ScrollReveal>
              <div className="about-copy">
                <span className="section-label">Toxina botulínica</span>
                <h2 id="toxin-title" className="section-title">Alívio para fissuras anais crônicas</h2>
                <p>
                  A toxina botulínica pode ser indicada no tratamento de fissuras anais crônicas que não responderam a outras medidas. A aplicação relaxa o músculo anal, reduzindo a dor e permitindo a cicatrização.
                </p>
                <p>
                  É um procedimento ambulatorial, realizado com anestesia local, e deve sempre ser conduzido por um coloproctologista após avaliação criteriosa.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section" id="estetica" aria-labelledby="aesthetic-title">
          <div className="section-wrap">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">Estética íntima</span>
                <h2 id="aesthetic-title" className="section-title">Procedimentos com abordagem médica e discreta</h2>
                <p className="section-subtitle">
                  Avaliação e tratamentos para reposicionamento, rejuvenescimento e correção de alterações da região genital, sempre com foco na saúde e bem-estar da paciente.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="info-card" style={{ maxWidth: "760px" }}>
                <h3>Atendimento individualizado</h3>
                <p>
                  Cada paciente passa por uma avaliação detalhada, com discussão das expectativas, indicações e cuidados pós-procedimento. O ambiente é preparado para oferecer privacidade e conforto.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section" id="contato" aria-labelledby="contact-title">
          <div className="section-wrap">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">Contato</span>
                <h2 id="contact-title" className="section-title">Onde atendemos</h2>
                <p className="section-subtitle">
                  Três endereços no Rio de Janeiro para maior conveniência. Entre em contato pelo WhatsApp ou pela Doctoralia para agendar sua consulta.
                </p>
              </div>
            </ScrollReveal>
            <div className="location-grid">
              {locations.map((location, index) => (
                <ScrollReveal key={location.name} delay={index * 0.05}>
                  <div className="location-card">
                    <h3>{location.name}</h3>
                    <address>{location.address}</address>
                    {location.phones.map((phone) => (
                      <p key={phone}>
                        <a href={`tel:${phone.replace(/\D/g, "")}`}>{phone}</a>
                      </p>
                    ))}
                    <a href={location.mapUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginTop: "10px" }}>
                      Ver no mapa <ArrowIcon size={16} />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band" aria-labelledby="cta-title">
          <div className="section-wrap">
            <h2 id="cta-title">Agende sua consulta</h2>
            <p>
              Cuide da sua saúde com discrição e segurança. Entre em contato pelo WhatsApp ou pelo perfil da Dra. Natália na Doctoralia.
            </p>
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} />
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-top">
          <div>
            <div className="footer-wordmark">Dra. Natália Tebet</div>
            <div className="footer-legal">
              Médica Coloproctologista · CRM/RJ 901733
            </div>
          </div>
          <div className="footer-links">
            <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a href={doctoraliaUrl} target="_blank" rel="noreferrer">Doctoralia</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="section-wrap footer-bottom">
          <span>Coloproctologia no Rio de Janeiro</span>
          <a href="https://www.dranataliatebet.com/" target="_blank" rel="noreferrer">Site oficial</a>
        </div>
      </footer>
    </MotionConfig>
  );
}

export default App;
