import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    backgroundImage: 'linear-gradient(to bottom right, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    position: 'relative',
                }}
            >
                {/* Grid pattern overlay */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Main content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        padding: '80px',
                        zIndex: 1,
                    }}
                >
                    {/* Name */}
                    <div
                        style={{
                            fontSize: 96,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                            textAlign: 'center',
                            lineHeight: 1.1,
                        }}
                    >
                        Ain Moises Ponce
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 48,
                            color: '#a0aec0',
                            fontWeight: 500,
                            textAlign: 'center',
                            marginTop: '8px',
                        }}
                    >
                        Full Stack Developer
                    </div>

                    {/* Technologies */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '24px',
                            marginTop: '32px',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 28,
                                color: '#60a5fa',
                                fontWeight: 600,
                            }}
                        >
                            React
                        </div>
                        <div
                            style={{
                                fontSize: 28,
                                color: '#a0aec0',
                                opacity: 0.5,
                            }}
                        >
                            •
                        </div>
                        <div
                            style={{
                                fontSize: 28,
                                color: '#60a5fa',
                                fontWeight: 600,
                            }}
                        >
                            Next.js
                        </div>
                        <div
                            style={{
                                fontSize: 28,
                                color: '#a0aec0',
                                opacity: 0.5,
                            }}
                        >
                            •
                        </div>
                        <div
                            style={{
                                fontSize: 28,
                                color: '#60a5fa',
                                fontWeight: 600,
                            }}
                        >
                            TypeScript
                        </div>
                    </div>

                    {/* URL */}
                    <div
                        style={{
                            fontSize: 24,
                            color: '#4a5568',
                            marginTop: '48px',
                            fontWeight: 400,
                        }}
                    >
                        ainponce.com
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}

