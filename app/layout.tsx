import "./globals.css"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BearifiedCo™ - Where Innovation Meets Execution",
  description:
    "We're your full-stack partner for AI, Blockchain, IT, Design, Merch, and beyond. You envision the future—we build it.",
  keywords: ["AI", "Blockchain", "Web3", "IT", "Design", "Custom Merchandise", "Smart Contracts", "BearifiedCo"],
  authors: [{ name: "BearifiedCo" }],
  creator: "BearifiedCo",
  publisher: "BearifiedCo",
  metadataBase: new URL("https://bearified.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bearified.xyz",
    siteName: "BearifiedCo™",
    title: "BearifiedCo™ - Where Innovation Meets Execution",
    description:
      "We're your full-stack partner for AI, Blockchain, IT, Design, Merch, and beyond. You envision the future—we build it.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U19vOhLd59MlFr994j3qL60kFrOpDK.png",
        width: 1200,
        height: 630,
        alt: "BearifiedCo™ - Where Innovation Meets Execution",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BearifiedCo",
    creator: "@BearifiedCo",
    title: "BearifiedCo™ - Where Innovation Meets Execution",
    description:
      "We're your full-stack partner for AI, Blockchain, IT, Design, Merch, and beyond. You envision the future—we build it.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U19vOhLd59MlFr994j3qL60kFrOpDK.png",
        alt: "BearifiedCo™ - Where Innovation Meets Execution",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}>
      <head>
        {/* Additional meta tags for enhanced SEO */}
        <meta name="theme-color" content="#9333ea" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* Explicit Open Graph meta tags for better compatibility */}
        <meta
          property="og:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U19vOhLd59MlFr994j3qL60kFrOpDK.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="BearifiedCo™ - Where Innovation Meets Execution" />

        {/* Twitter Card meta tags */}
        <meta
          name="twitter:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U19vOhLd59MlFr994j3qL60kFrOpDK.png"
        />
        <meta name="twitter:image:alt" content="BearifiedCo™ - Where Innovation Meets Execution" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BearifiedCo",
              alternateName: "Bearified",
              url: "https://bearified.xyz",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U19vOhLd59MlFr994j3qL60kFrOpDK.png",
              description:
                "We're your full-stack partner for AI, Blockchain, IT, Design, Merch, and beyond. You envision the future—we build it.",
              foundingDate: "2024",
              sameAs: ["https://twitter.com/BearifiedCo", "https://linkedin.com/company/bearifiedco"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "hello@bearified.xyz",
              },
              areaServed: "Worldwide",
              serviceType: [
                "AI Solutions",
                "Blockchain Development",
                "IT Infrastructure",
                "Design & Branding",
                "Custom Merchandise",
                "Web3 Integration",
                "Smart Contracts",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
