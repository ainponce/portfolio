import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Learn more about Ain Ponce, a software engineer passionate about web development, experience, and skills.',
}

export default function InfoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
