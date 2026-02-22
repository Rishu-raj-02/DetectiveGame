import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { InvestigationProvider } from '../hooks/useInvestigation'
import { AudioProvider } from '../hooks/useAudio'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GSK Investigation - Digital Case File',
    description: 'Interactive investigation into the Golden State Killer case.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <InvestigationProvider>
                    <AudioProvider>
                        {children}
                    </AudioProvider>
                </InvestigationProvider>
            </body>
        </html>
    )
}
