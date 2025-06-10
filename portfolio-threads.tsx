"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Mail, MapPin, Linkedin } from "lucide-react"

const gradients = [
  "linear-gradient(to bottom, #232323 0%, #35322b 100%)",
  "linear-gradient(to bottom, #232323 0%, #3a3327 30%, #bfa76a 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #bfa76a 40%, #e0c97f 60%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #6a7a5f 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #7a6a5f 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #3a4a47 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #8c7a5f 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #bfa76a 20%, #e0c97f 80%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #2a3a4a 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #3a4a5f 50%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #4a6a8c 60%, #232323 100%)",
  "linear-gradient(to bottom, #232323 0%, #2e3e5c 40%, #bfa76a 100%)",
]

const info = {
  about: {
    title: "Sobre Mí",
    description:
      "Hola, soy Ain Moises Ponce, un desarrollador full-stack apasionado por crear soluciones web innovadoras y eficientes. Con experiencia en el desarrollo de aplicaciones modernas utilizando tecnologías como React, Node.js y bases de datos relacionales y no relacionales, entre otras tecnologías.",
    experience: {
      title: "Experiencia",
      description:
        "He trabajado en diversos proyectos, desde pequeñas aplicaciones hasta sistemas empresariales complejos. Mi enfoque se centra en escribir código limpio, mantenible y escalable.",
    },
    approach: {
      title: "Enfoque",
      description:
        "Me especializo en el desarrollo de aplicaciones web modernas, con un fuerte énfasis en la experiencia del usuario y el rendimiento. Siempre estoy aprendiendo nuevas tecnologías y mejores prácticas para mejorar mis habilidades.",
    },
  },
  contact: {
    title: "Contacto",
    description:
      "¿Tenés un proyecto en mente? ¡Me encantaría escuchar sobre él! Puedes contactarme a través de cualquiera de los siguientes medios:",
    location: {
      title: "Ubicación",
      description: "Actualmente basado en Buenos Aires, Argentina",
    },
    linkedin: {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/ainponce",
    },
    email: {
      title: "Email",
      address: "ponce.ain@gmail.com",
    },
  },
  skills: {
    frontend: {
      title: "Frontend",
      technologies: ["TypeScript", "Next", "tRPC", "Redux"],
    },
    backend: {
      title: "Backend",
      technologies: ["Node", "Express", "Prisma", "PostgreSQL", "tRPC"],
    },
    tools: {
      title: "Herramientas y Otros",
      technologies: ["Docker", "AWS"],
    },
  },
}

const sectionThreads = [
  { idx: 30, section: "about", className: "about-thread", color: "#ffe082" },
  { idx: 90, section: "main", className: "main-thread", color: "#ffffff" }, // Thread central
  { idx: 150, section: "contact", className: "contact-thread", color: "#82baff" },
]

export default function PortfolioThreads({ onCentralThreadClick }: { onCentralThreadClick?: () => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showBlackout, setShowBlackout] = useState(true)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isContentReady, setIsContentReady] = useState(false)
  const [threadStyles, setThreadStyles] = useState<Array<{
    background: string;
    opacity: number;
    animationDuration: string;
    animationDelay: string;
  }>>([])
  const [isExiting, setIsExiting] = useState(false)
  const wallRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlackout(false)
      setIsHeaderVisible(true)
      setIsContentReady(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const styles = Array.from({ length: 180 }, (_, i) => {
      const sectionThread = sectionThreads.find((st) => st.idx === i)
      const isSpecialThread = !!sectionThread

      return {
        background: isSpecialThread
          ? `linear-gradient(to bottom, ${sectionThread.color} 0%, ${sectionThread.color}80 100%)`
          : gradients[Math.floor(Math.random() * gradients.length)],
        opacity: 0.7 + Math.random() * 0.3,
        animationDuration: 1.2 + Math.random() * 1.2 + "s",
        animationDelay: Math.random() * 2 + "s",
      }
    })
    setThreadStyles(styles)
  }, [])

  const handleThreadClick = (section: string) => {
    if (isTransitioning) return
    if (section === "main" && onCentralThreadClick) {
      setIsExiting(true)
      setTimeout(() => {
        onCentralThreadClick()
      }, 600) // Duración de la animación de salida
      return
    }
    setIsTransitioning(true)
    setActiveSection(section)
  }

  const handleBack = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSection(null)
      setIsTransitioning(false)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeSection) {
        handleBack()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [activeSection])

  const renderContent = (section: string) => {
    if (section === "about") {
      return (
        <div className="content-wrapper">
          <h1 className="section-title">{info.about.title}</h1>
          <p className="section-description">{info.about.description}</p>

          <div className="subsection">
            <h2>{info.about.experience.title}</h2>
            <p>{info.about.experience.description}</p>
          </div>

          <div className="subsection">
            <h2>{info.about.approach.title}</h2>
            <p>{info.about.approach.description}</p>
          </div>
        </div>
      )
    }

    if (section === "contact") {
      return (
        <div className="content-wrapper">
          <h1 className="section-title">{info.contact.title}</h1>
          <p className="section-description">{info.contact.description}</p>

          <div className="contact-grid">
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <div>
                <h3>{info.contact.location.title}</h3>
                <p>{info.contact.location.description}</p>
              </div>
            </div>

            <div className="contact-item">
              <Linkedin className="contact-icon" />
              <div>
                <h3>{info.contact.linkedin.title}</h3>
                <a href={info.contact.linkedin.url} target="_blank" rel="noopener noreferrer">
                  {info.contact.linkedin.url}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <Mail className="contact-icon" />
              <div>
                <h3>{info.contact.email.title}</h3>
                <a href={`mailto:${info.contact.email.address}`}>{info.contact.email.address}</a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (section === "main") {
      return (
        <div className="content-wrapper main-content">
          <div className="main-section">
            <h1 className="section-title">{info.about.title}</h1>
            <p className="section-description">{info.about.description}</p>

            <div className="experience-approach-grid">
              <div className="subsection">
                <h2>{info.about.experience.title}</h2>
                <p>{info.about.experience.description}</p>
              </div>

              <div className="subsection">
                <h2>{info.about.approach.title}</h2>
                <p>{info.about.approach.description}</p>
              </div>
            </div>
          </div>

          <div className="main-section">
            <h1 className="section-title">Skills</h1>
            <div className="skills-grid">
              <div className="skill-category">
                <h2>{info.skills.frontend.title}</h2>
                <ul>
                  {info.skills.frontend.technologies.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="skill-category">
                <h2>{info.skills.backend.title}</h2>
                <ul>
                  {info.skills.backend.technologies.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="skill-category">
                <h2>{info.skills.tools.title}</h2>
                <ul>
                  {info.skills.tools.technologies.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="main-section">
            <h1 className="section-title">{info.contact.title}</h1>
            <p className="section-description">{info.contact.description}</p>

            <div className="contact-grid">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h3>{info.contact.location.title}</h3>
                  <p>{info.contact.location.description}</p>
                </div>
              </div>

              <div className="contact-item">
                <Linkedin className="contact-icon" />
                <div>
                  <h3>{info.contact.linkedin.title}</h3>
                  <a href={info.contact.linkedin.url} target="_blank" rel="noopener noreferrer">
                    {info.contact.linkedin.url}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <h3>{info.contact.email.title}</h3>
                  <a href={`mailto:${info.contact.email.address}`}>{info.contact.email.address}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Fallback para cualquier sección no reconocida
    return (
      <div className="content-wrapper">
        <h1 className="section-title">Sección no encontrada</h1>
        <p className="section-description">La sección solicitada no existe.</p>
      </div>
    )
  }

  return (
    <div className={`portfolio-container ${activeSection ? `active-${activeSection}` : ""} ${isExiting ? "fade-exit" : ""}`}>
      {/* Blackout overlay */}
      <div className={`blackout ${!showBlackout ? "fade-out" : ""}`} />

      {/* Header */}
      {isContentReady && !isExiting && (
        <div className={`header-text ${activeSection ? "hidden" : ""} ${isHeaderVisible ? "visible" : ""}`}>
          Ain Moises Ponce
          <br />
          <span>Software Developer</span>
        </div>
      )}

      {/* Wall of threads */}
      {!isExiting && (
        <div className={`wall ${activeSection ? "wall-hidden" : ""}`} ref={wallRef}>
          {Array.from({ length: 180 }, (_, i) => {
            const sectionThread = sectionThreads.find((st) => st.idx === i)
            const isSpecialThread = !!sectionThread
            const style = threadStyles[i] || {}

            return (
              <div
                key={i}
                className={`thread ${isSpecialThread ? `section-thread ${sectionThread.className}` : ""}`}
                style={style}
                onClick={() => isSpecialThread && handleThreadClick(sectionThread.section)}
              />
            )
          })}
        </div>
      )}

      {/* Content overlay */}
      {activeSection && !isExiting && (
        <div className={`content-overlay ${isTransitioning ? "transitioning" : "visible"}`} style={{ zIndex: 2000 }}>
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            Volver
          </button>

          <div className="content-container">{renderContent(activeSection)}</div>
        </div>
      )}

      <style jsx>{`
        .portfolio-container {
          margin: 0;
          padding: 0;
          height: 100vh;
          background: #181818;
          overflow: hidden;
          position: relative;
          transition: background 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .portfolio-container.active-about {
          background: linear-gradient(135deg, #ffe082 0%, #bfa76a 100%);
        }
        
        .portfolio-container.active-contact {
          background: linear-gradient(135deg, #82baff 0%, #2a3a4a 100%);
        }
        
        .portfolio-container.active-skills {
          background: linear-gradient(135deg, #aaff82 0%, #3a4a47 100%);
        }

        .portfolio-container.active-main {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        }
        
        .blackout {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: #111;
          opacity: 1;
          transition: opacity 2s cubic-bezier(0.77, 0, 0.18, 1);
          pointer-events: none;
          z-index: 900;
        }
        
        .blackout.fade-out {
          opacity: 0;
        }
        
        .wall {
          width: 100vw;
          height: 100vh;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .wall.wall-hidden {
          opacity: 0;
          transform: scale(1.1);
        }
        
        .thread {
          flex: 0 0 auto;
          width: 1.2vw;
          min-width: 10px;
          height: 100%;
          margin: 0 0.05vw;
          border-radius: 2px;
          opacity: 0.85;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
                      box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
                      opacity 0.4s;
          will-change: transform;
          animation: vibrar 1.5s infinite ease-in-out;
          cursor: default;
        }
        
        .section-thread {
          cursor: pointer;
          position: relative;
          z-index: 5;
        }
        
        .section-thread:hover {
          transform: scaleY(1.2) scaleX(1.8);
          box-shadow: 0 0 60px 15px currentColor;
          opacity: 1 !important;
          z-index: 10;
          filter: brightness(1.2) saturate(1.3);
        }
        
        .about-thread {
          color: #ffe082;
          box-shadow: 0 0 30px 8px #ffe08250;
          animation: pulse-gold 2s infinite alternate;
        }
        
        .contact-thread {
          color: #82baff;
          box-shadow: 0 0 30px 8px #82baff50;
          animation: pulse-blue 2s infinite alternate;
        }
        
        .skills-thread {
          color: #aaff82;
          box-shadow: 0 0 30px 8px #aaff8250;
          animation: pulse-green 2s infinite alternate;
        }

        .main-thread {
          color: #ffffff;
          box-shadow: 0 0 40px 12px #ffffff60;
          animation: pulse-white 2s infinite alternate;
          background: linear-gradient(to bottom, #ffffff 0%, #e0e0e0 100%) !important;
        }
        
        @keyframes vibrar {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-1px); }
          40% { transform: translateX(1px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        
        @keyframes pulse-gold {
          0% { box-shadow: 0 0 30px 8px #ffe08250; }
          100% { box-shadow: 0 0 50px 15px #ffe08280; }
        }
        
        @keyframes pulse-blue {
          0% { box-shadow: 0 0 30px 8px #82baff50; }
          100% { box-shadow: 0 0 50px 15px #82baff80; }
        }
        
        @keyframes pulse-green {
          0% { box-shadow: 0 0 30px 8px #aaff8250; }
          100% { box-shadow: 0 0 50px 15px #aaff8280; }
        }

        @keyframes pulse-white {
          0% { box-shadow: 0 0 40px 12px #ffffff60; }
          100% { box-shadow: 0 0 60px 20px #ffffff80; }
        }
        
        .header-text {
          position: absolute;
          top: 32px;
          left: 40px;
          z-index: 10;
          color: #fffbe6;
          font-family: 'Segoe UI', 'Arial', sans-serif;
          font-size: 2.2rem;
          font-weight: bold;
          text-shadow: 0 2px 16px #000, 0 0 4px #bfa76a;
          letter-spacing: 1px;
          line-height: 1.1;
          user-select: none;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }
        
        .header-text.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .header-text.hidden {
          opacity: 0;
          transform: translateY(-20px);
        }
        
        .header-text span {
          display: block;
          font-size: 1.2rem;
          font-weight: 500;
          color: #ffe082;
          letter-spacing: 2px;
          margin-top: 0.3em;
          text-shadow: 0 2px 12px #000, 0 0 2px #bfa76a;
        }
        
        .content-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .content-overlay.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 101;
        }
        
        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .content-container {
          max-width: 800px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .content-wrapper {
          color: #fffbe6;
          font-family: 'Segoe UI', 'Arial', sans-serif;
          line-height: 1.6;
        }

        .main-content {
          max-height: 80vh;
          overflow-y: auto;
          padding: 2rem;
          color: #fff;
        }

        .main-section {
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .main-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .experience-approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .experience-approach-grid .subsection {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          background: linear-gradient(45deg, #ffe082, #bfa76a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-description {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          text-align: center;
          opacity: 0.9;
        }
        
        .subsection {
          margin-bottom: 2rem;
        }
        
        .subsection h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #ffe082;
        }
        
        .contact-grid {
          display: grid;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .contact-icon {
          width: 24px;
          height: 24px;
          color: #82baff;
        }
        
        .contact-item h3 {
          margin: 0 0 0.5rem 0;
          color: #ffe082;
        }
        
        .contact-item p,
        .contact-item a {
          margin: 0;
          color: #fffbe6;
          text-decoration: none;
        }
        
        .contact-item a:hover {
          color: #82baff;
          text-decoration: underline;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .skill-category {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .skill-category h2 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #aaff82;
          text-align: center;
        }
        
        .skill-category ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .skill-category li {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        
        .skill-category li:last-child {
          border-bottom: none;
        }
        
        @media (max-width: 768px) {
          .header-text {
            font-size: 1.8rem;
            top: 20px;
            left: 20px;
          }
          
          .content-container {
            width: 95%;
            padding: 1.5rem;
            max-height: 85vh;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .back-button {
            top: 1rem;
            left: 1rem;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }

        .portfolio-container.fade-exit {
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .portfolio-container {
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}
