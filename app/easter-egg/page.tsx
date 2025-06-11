"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { db } from '../../lib/firebase'
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'

interface Discoverer {
    id: string;
    nombre: string;
    timestamp: any;
}

export default function EasterEggPage() {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)
    const [isExiting, setIsExiting] = useState(false)
    const [name, setName] = useState("")
    const [discoverers, setDiscoverers] = useState<Discoverer[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [justAdded, setJustAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 20)
        loadDiscoverers()
        return () => clearTimeout(timer)
    }, [])

    const loadDiscoverers = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const q = query(collection(db, 'personas'), orderBy('timestamp', 'asc'))
            const querySnapshot = await getDocs(q)
            const discoverersList: Discoverer[] = []

            querySnapshot.forEach((doc) => {
                discoverersList.push({
                    id: doc.id,
                    ...doc.data()
                } as Discoverer)
            })

            setDiscoverers(discoverersList)
        } catch (err) {
            setError('Error al cargar la lista. Inténtalo de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        setIsSubmitting(true)
        setError(null)

        try {
            // Agregar a Firebase
            const docRef = await addDoc(collection(db, 'personas'), {
                nombre: name.trim(),
                timestamp: serverTimestamp()
            })

            // Actualizar la lista local
            const newDiscoverer: Discoverer = {
                id: docRef.id,
                nombre: name.trim(),
                timestamp: new Date()
            }

            setDiscoverers([...discoverers, newDiscoverer])
            setName("")
            setJustAdded(true)

            setTimeout(() => setJustAdded(false), 3000)
        } catch (err) {
            setError('Error al agregar tu nombre. Inténtalo de nuevo.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        setIsExiting(true)
        setTimeout(() => {
            router.push("/info")
        }, 600)
    }

    return (
        <div className={`easter-egg-container ${isVisible ? "fade-in" : ""} ${isExiting ? "fade-exit" : ""}`}>
            <button className="back-button" onClick={handleBack}>
                <ArrowLeft size={20} />
            </button>

            <div className="content-wrapper">
                <div className="header-section">
                    <h1 className="title">¡Encontraste el Easter Egg!</h1>
                    <p className="description">
                        ¡Felicitaciones! Descubriste el secreto oculto.
                        <br />
                        Deja tu nombre para formar parte de la lista de personas que encontraron este easter egg.
                    </p>
                </div>

                <div className="form-section">
                    <form onSubmit={handleSubmit} className="name-form">
                        <div className="input-group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Escribe tu nombre..."
                                className="name-input"
                                maxLength={50}
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting || !name.trim()}
                            >
                                {isSubmitting ? '...' : 'Agregar mi nombre'}
                            </button>
                        </div>
                    </form>

                    {justAdded && (
                        <div className="success-message">
                            ¡Tu nombre ha sido agregado a la lista!
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </div>

                <div className="discoverers-section">
                    <h2 className="discoverers-title">
                        Personas que encontraron el easter egg ({discoverers.length})
                    </h2>

                    {isLoading ? (
                        <div className="loading-message">
                            Cargando lista de descubridores...
                        </div>
                    ) : error && discoverers.length === 0 ? (
                        <div className="error-state">
                            <p>No se pudo cargar la lista.</p>
                            <button onClick={loadDiscoverers} className="retry-button">
                                Reintentar
                            </button>
                        </div>
                    ) : discoverers.length === 0 ? (
                        <p className="no-discoverers">¡Sé el primero en descubrir este secreto!</p>
                    ) : (
                        <div className="discoverers-list">
                            {discoverers.map((discoverer, index) => (
                                <div
                                    key={discoverer.id}
                                    className={`discoverer-item ${index === discoverers.length - 1 && justAdded ? 'new-item' : ''}`}
                                >
                                    <span className="discoverer-number">#{index + 1}</span>
                                    <span className="discoverer-name">{discoverer.nombre}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .easter-egg-container {
                    min-height: 100vh;
                    background: #000000;
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    opacity: 0;
                    transform: scale(0.98);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 2rem;
                }

                .fade-in {
                    opacity: 1;
                    transform: scale(1);
                }

                .fade-exit {
                    opacity: 0;
                    transform: scale(0.98);
                    background: #f7f7fa;
                }

                .content-wrapper {
                    max-width: 600px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }

                .header-section {
                    text-align: center;
                }

                .logo-section {
                    position: relative;
                    display: inline-block;
                    margin-bottom: 1.5rem;
                }

                .easter-logo {
                    filter: brightness(0) saturate(100%) invert(1);
                    animation: float 3s ease-in-out infinite;
                }

                .sparkle {
                    position: absolute;
                    color: #ffffff;
                    animation: sparkle 2s ease-in-out infinite;
                }

                .sparkle-1 {
                    top: -10px;
                    right: -10px;
                    animation-delay: 0s;
                }

                .sparkle-2 {
                    bottom: -5px;
                    left: -15px;
                    animation-delay: 0.7s;
                }

                .sparkle-3 {
                    top: 50%;
                    right: -20px;
                    animation-delay: 1.4s;
                }

                .title {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    background: linear-gradient(45deg, #ffffff, #cccccc, #ffffff, #aaaaaa);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradient-shift 3s ease infinite;
                }

                .description {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    opacity: 0.9;
                    max-width: 500px;
                    margin: 0 auto;
                    color: #cccccc;
                }

                .form-section {
                    width: 100%;
                }

                .name-form {
                    width: 100%;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }

                .name-input {
                    padding: 1rem 1.5rem;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    color: white;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                }

                .name-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }

                .name-input:focus {
                    outline: none;
                    border-color: #ffffff;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
                }

                .submit-button {
                    padding: 1rem 2rem;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 12px;
                    color: #000000;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    transform: translateY(0);
                }

                .submit-button:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 1);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
                }

                .submit-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .submit-button.submitting {
                    animation: pulse 1s ease-in-out infinite;
                }

                .success-message {
                    background: rgba(255, 255, 255, 0.9);
                    color: #000000;
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                    font-weight: bold;
                    animation: slideIn 0.5s ease;
                    margin-top: 1rem;
                }

                .error-message {
                    background: rgba(255, 82, 82, 0.9);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                    font-weight: bold;
                    animation: slideIn 0.5s ease;
                    margin-top: 1rem;
                }

                .loading-message {
                    text-align: center;
                    opacity: 0.7;
                    font-style: italic;
                    color: #cccccc;
                    padding: 2rem;
                }

                .error-state {
                    text-align: center;
                    color: #cccccc;
                    padding: 2rem;
                }

                .retry-button {
                    margin-top: 1rem;
                    padding: 0.8rem 1.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .retry-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }

                .discoverers-section {
                    width: 100%;
                }

                .discoverers-title {
                    font-size: 1.3rem;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                }

                .no-discoverers {
                    text-align: center;
                    opacity: 0.7;
                    font-style: italic;
                    color: #cccccc;
                }

                .discoverers-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    max-height: 300px;
                    overflow-y: auto;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .discoverer-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.8rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .discoverer-item.new-item {
                    background: rgba(255, 255, 255, 0.2);
                    animation: highlight 2s ease;
                }

                .discoverer-number {
                    background: #ffffff;
                    color: #000000;
                    padding: 0.3rem 0.6rem;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 0.9rem;
                    min-width: 35px;
                    text-align: center;
                }

                .discoverer-name {
                    font-weight: 500;
                    color: #ffffff;
                }

                .back-button {
                    position: absolute;
                    top: 2rem;
                    left: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    padding: 0.6rem 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50px;
                    color: white;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 10;
                }

                .back-button:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes sparkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes pulse {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-2px) scale(1.02); }
                }

                @keyframes slideIn {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes highlight {
                    0% { background: rgba(255, 255, 255, 0.3); }
                    100% { background: rgba(255, 255, 255, 0.2); }
                }

                @media (max-width: 768px) {
                    .easter-egg-container {
                        padding: 1rem;
                    }

                    .title {
                        font-size: 1.5rem;
                    }

                    .description {
                        font-size: 1rem;
                    }

                    .input-group {
                        gap: 0.8rem;
                    }

                    .name-input, .submit-button {
                        padding: 0.8rem 1.2rem;
                        font-size: 1rem;
                    }

                    .back-button {
                        top: 1rem;
                        left: 1rem;
                    }

                    .discoverers-list {
                        max-height: 200px;
                    }
                }
            `}</style>
        </div>
    )
} 