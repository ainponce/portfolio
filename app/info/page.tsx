"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { SiTypescript, SiNextdotjs, SiTrpc, SiRedux, SiNodedotjs, SiExpress, SiPrisma, SiPostgresql, SiDocker, SiX, SiTailwindcss } from 'react-icons/si'
import { LuMail, LuLinkedin } from 'react-icons/lu'
import { ArrowLeft } from "lucide-react"

const info = {
    about: {
        title: "Sobre Mí",
        description:
            "¡Hola! Soy Ain, un software developer apasionado por transformar ideas en productos digitales reales. Disfruto diseñar y desarrollar experiencias web que sean dinámicas, intuitivas e interactivas, siempre priorizando tanto la funcionalidad como la estética.",
        experience: {
            title: "Experiencia",
            description:
                "Comencé mi camino en el mundo de los sistemas en 2015 y, desde 2022, me dedico de forma profesional al desarrollo de software. A lo largo de estos años, he trabajado en diversos entornos, adquiriendo experiencia práctica en proyectos reales y colaborando con equipos multidisciplinarios.",
        },
        approach: {
            title: "Enfoque",
            description:
                "Me especializo en la creación de aplicaciones web modernas, priorizando siempre la experiencia del usuario, la accesibilidad y el rendimiento. Tengo una mentalidad de mejora continua, por eso busco mantenerme en constante aprendizaje, explorando nuevas tecnologías, buenas prácticas y metodologías de desarrollo.",
        },
    },
    contact: {
        title: "Contacto",
        description:
            "¿Tenés un proyecto en mente? ¡Hablame! Contactame a través de cualquiera de los siguientes medios:",
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
        x: {
            title: "X",
            url: "https://x.com/ainponce",
        }
    },
    skills: {
        frontend: {
            title: "Frontend",
            technologies: ["TypeScript", "Next", "tRPC", "Redux", "Tailwind"],
        },
        backend: {
            title: "Backend",
            technologies: ["Node", "Express", "Prisma", "PostgreSQL"],
        },
        tools: {
            title: "Herramientas y Otros",
            technologies: ["Docker"],
        },
    },
}

const iconSize = 40;
const techIcons: Record<string, React.ReactNode> = {
    TypeScript: <SiTypescript size={iconSize} color="#232323" title="TypeScript" />,
    Next: <SiNextdotjs size={iconSize} color="#232323" title="Next.js" />,
    tRPC: <SiTrpc size={iconSize} color="#232323" title="tRPC" />,
    Redux: <SiRedux size={iconSize} color="#232323" title="Redux" />,
    Tailwind: <SiTailwindcss size={iconSize} color="#232323" title="Tailwind CSS" />,
    Node: <SiNodedotjs size={iconSize} color="#232323" title="Node.js" />,
    Express: <SiExpress size={iconSize} color="#232323" title="Express" />,
    Prisma: <SiPrisma size={iconSize} color="#232323" title="Prisma" />,
    PostgreSQL: <SiPostgresql size={iconSize} color="#232323" title="PostgreSQL" />,
    Docker: <SiDocker size={iconSize} color="#232323" title="Docker" />,
}

export default function InfoPage() {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)
    const [isExiting, setIsExiting] = useState(false)
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 20)
        return () => clearTimeout(timer)
    }, [])

    const handleIconTouch = (tech: string) => {
        if (activeTooltip === tech) {
            setActiveTooltip(null)
        } else {
            setActiveTooltip(tech)
            // Auto-hide tooltip after 2 seconds
            setTimeout(() => setActiveTooltip(null), 2000)
        }
    }

    const handleBack = () => {
        setIsExiting(true)
        setTimeout(() => {
            router.push("/")
        }, 600)
    }

    return (
        <div className={`info-page-container compact-layout ${isVisible ? "fade-in" : ""} ${isExiting ? "fade-exit" : ""}`}>
            <button className="back-button" onClick={handleBack}> <ArrowLeft size={20} /> </button>
            <div className="compact-grid">
                <div className="left-column">
                    <div className="about-block">
                        <h1 className="section-title">{info.about.title}</h1>
                        <p className="section-description">{info.about.description}</p>
                    </div>
                    <div className="experience-block">
                        <h1 className="section-title">{info.about.experience.title}</h1>
                        <p className="section-description">{info.about.experience.description}</p>
                    </div>
                    <div className="approach-block">
                        <h1 className="section-title">{info.about.approach.title}</h1>
                        <p className="section-description">{info.about.approach.description}</p>
                    </div>
                </div>
                <div className="right-column">
                    <div className="skills-block">
                        <h1 className="section-title">Skills</h1>
                        <div className="skills-icons-row">
                            {info.skills.frontend.technologies.map((tech, idx) => (
                                <div
                                    className={`tech-icon ${activeTooltip === tech ? 'active-tooltip' : ''}`}
                                    key={`frontend-${tech}-${idx}`}
                                    title={tech}
                                    data-tooltip={tech}
                                    onClick={() => handleIconTouch(tech)}
                                    onTouchStart={() => handleIconTouch(tech)}
                                >
                                    {techIcons[tech]}
                                </div>
                            ))}
                            {info.skills.backend.technologies.map((tech, idx) => (
                                <div
                                    className={`tech-icon ${activeTooltip === tech ? 'active-tooltip' : ''}`}
                                    key={`backend-${tech}-${idx}`}
                                    title={tech}
                                    data-tooltip={tech}
                                    onClick={() => handleIconTouch(tech)}
                                    onTouchStart={() => handleIconTouch(tech)}
                                >
                                    {techIcons[tech]}
                                </div>
                            ))}
                            {info.skills.tools.technologies.map((tech, idx) => (
                                <div
                                    className={`tech-icon ${activeTooltip === tech ? 'active-tooltip' : ''}`}
                                    key={`tools-${tech}-${idx}`}
                                    title={tech}
                                    data-tooltip={tech}
                                    onClick={() => handleIconTouch(tech)}
                                    onTouchStart={() => handleIconTouch(tech)}
                                >
                                    {techIcons[tech]}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contact-block">
                        <h1 className="section-title">{info.contact.title}</h1>
                        <p className="section-description">{info.contact.description}</p>
                        <div className="contact-icons-row">
                            <a href={info.contact.linkedin.url} target="_blank" rel="noopener noreferrer" className="contact-icon-link">
                                <LuLinkedin className="contact-icon" />
                            </a>
                            <a href={`mailto:${info.contact.email.address}`} className="contact-icon-link">
                                <LuMail className="contact-icon" />
                            </a>
                            <a href={info.contact.x.url} target="_blank" rel="noopener noreferrer" className="contact-icon-link">
                                <SiX className="contact-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .compact-layout {
                    min-height: 100vh;
                    background: #f7f7fa;
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                    color: #232323;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    opacity: 0;
                    transform: scale(0.98);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 1.2rem;
                }

                .fade-in {
                    opacity: 1;
                    transform: scale(1);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .fade-exit {
                    opacity: 0;
                    transform: scale(0.98);
                    background: #181818;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .compact-grid {
                    display: grid;
                    grid-template-columns: 1fr 0.8fr;
                    gap: 1rem;
                    width: 100%;
                    max-width: 1200px;
                    height: auto;
                }
                
                .left-column {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    height: 100%;
                }

                .right-column {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    height: 100%;
                }
                
                .right-column .skills-block,
                .right-column .contact-block {
                    flex: 1;
                    min-height: 250px;
                }

                .about-block, .experience-block, .approach-block, .skills-block, .contact-block {
                    background: rgba(35,35,35,0.04);
                    border-radius: 12px;
                    padding: 1.2rem;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                    min-height: 160px;
                }

                .section-title {
                    font-size: 1.1rem;
                    font-weight: bold;
                    margin-bottom: 0.6rem;
                    text-align: center;
                    color: #232323;
                    width: 100%;
                }

                .section-description {
                    font-size: 0.9rem;
                    line-height: 1.4;
                    margin-bottom: 0.8rem;
                    text-align: center;
                    color: #232323;
                    width: 100%;
                }

                .subsection {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.8rem;
                }

                .subsection h2 {
                    font-size: 1rem;
                    margin-bottom: 0.4rem;
                    color: #232323;
                    text-align: center;
                    width: 100%;
                    font-weight: 700;
                }

                .subsection p {
                    font-size: 0.9rem;
                    line-height: 1.4;
                    margin-bottom: 0.6rem;
                    text-align: center;
                    color: #232323;
                    width: 100%;
                }

                .skills-icons-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.6rem;
                    padding: 0.6rem;
                    width: 100%;
                }

                .tech-icon {
                    background: rgba(35,35,35,0.08);
                    border-radius: 8px;
                    padding: 0.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    min-width: 60px;
                    min-height: 60px;
                    position: relative;
                }

                .tech-icon:hover {
                    background: rgba(35,35,35,0.15);
                    transform: translateY(-2px);
                }

                .tech-icon::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    top: -35px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(35, 35, 35, 0.9);
                    color: white;
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    z-index: 10000;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }

                .tech-icon:hover::after {
                    opacity: 1;
                }

                /* Flecha del tooltip */
                .tech-icon::before {
                    content: '';
                    position: absolute;
                    top: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    border: 5px solid transparent;
                    border-top-color: rgba(35, 35, 35, 0.9);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    z-index: 10000;
                }

                .tech-icon:hover::before {
                    opacity: 1;
                }

                /* Tooltip activo en mobile */
                .tech-icon.active-tooltip::after {
                    opacity: 1;
                }

                .tech-icon.active-tooltip::before {
                    opacity: 1;
                }

                .contact-icons-row {
                    display: flex;
                    gap: 1.2rem;
                    align-items: center;
                    justify-content: center;
                    margin-top: 0.8rem;
                    width: 100%;
                }

                .contact-icon-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.6rem;
                    background: rgba(35,35,35,0.08);
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    min-width: 50px;
                    min-height: 50px;
                }

                .contact-icon-link:hover {
                    background: rgba(35,35,35,0.15);
                    transform: translateY(-2px);
                }

                .contact-icon {
                    width: 24px;
                    height: 24px;
                    color: #232323;
                }

                .back-button {
                    position: absolute;
                    top: 1.2rem;
                    left: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    padding: 0.6rem 1rem;
                    background: rgba(35, 35, 35, 0.08);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(35, 35, 35, 0.12);
                    border-radius: 50px;
                    color: #232323;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 101;
                }

                .back-button:hover {
                    background: rgba(35, 35, 35, 0.18);
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(35, 35, 35, 0.08);
                }

                @media (max-width: 1200px) {
                    .compact-grid {
                        grid-template-columns: 1fr;
                        max-width: 800px;
                        gap: 1rem;
                    }
                    .left-column {
                        order: 1;
                    }
                    .right-column {
                        flex-direction: row;
                        order: 2;
                    }
                                         .right-column .skills-block,
                     .right-column .contact-block {
                         flex: 1;
                         min-height: 200px;
                     }
                    .about-block, .experience-block, .approach-block {
                        min-height: 140px;
                    }
                }

                @media (max-width: 768px) {
                    .compact-layout {
                        padding: 5rem 1.2rem 1.2rem 1.2rem;
                    }
                    .compact-grid {
                        grid-template-columns: 1fr;
                        max-width: 500px;
                    }
                                         .right-column {
                         flex-direction: column;
                         height: auto;
                     }
                     .right-column .skills-block,
                     .right-column .contact-block {
                         flex: none;
                         min-height: 140px;
                     }
                    .about-block, .experience-block, .approach-block, .skills-block, .contact-block {
                        min-height: 140px;
                    }
                    .skills-block {
                        overflow: visible;
                        padding: 2.5rem 1.2rem 1.2rem 1.2rem;
                        margin-bottom: 1.5rem;
                    }
                    .tech-icon {
                        min-width: 50px;
                        min-height: 50px;
                        position: relative;
                    }
                    .tech-icon::after {
                        font-size: 0.7rem;
                        top: -40px;
                        padding: 8px 12px;
                    }
                    .tech-icon::before {
                        top: -10px;
                    }
                    .back-button {
                        top: 1rem;
                        left: 1rem;
                        position: fixed;
                        z-index: 102;
                    }
                }
            `}</style>
        </div>
    )
} 