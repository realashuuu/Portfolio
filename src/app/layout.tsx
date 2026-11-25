import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";
import ScrollProgress from "../components/ScrollProgress";
import CustomCursor from "../components/CustomCursor";
import CardRevealObserver from "../components/CardRevealObserver";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5b3eff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ashik-khan.dev"),
  title: "Ashik Khan | Full-Stack Developer & Software Engineer | Portfolio",
  description:
    "Ashik Khan — Computer Science and Engineering undergraduate and Full-Stack Developer focused on building complete software products, backend systems and AI-powered applications. B.Tech CSE (2023–2027) at NSHM / MAKAUT.",
  keywords: [
    "Ashik Khan",
    "Full-Stack Developer",
    "Software Engineer",
    "Backend Architecture",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Socket.IO",
    "OpenAI API",
    "LeetCode 100",
    "Durgapur",
    "West Bengal",
  ],
  authors: [{ name: "Ashik Khan", url: "https://github.com/realashuuu" }],
  creator: "Ashik Khan",
  publisher: "Ashik Khan",
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
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: "https://ashik-khan.dev/",
    title: "Ashik Khan | Full-Stack Developer & Software Engineer",
    description:
      "Computer Science undergraduate and Full-Stack Developer exploring software engineering, backend systems, and AI-powered products.",
    siteName: "Ashik Khan — Personal Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 460,
        height: 460,
        alt: "Ashik Khan - Computer Science Undergraduate & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashik Khan | Full-Stack Developer & Software Engineer",
    description:
      "Computer Science undergraduate and Full-Stack Developer exploring software engineering, backend systems, and AI-powered products.",
    images: ["/avatar.png"],
  },
  alternates: {
    canonical: "https://ashik-khan.dev/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ashik-khan.dev/#person",
      name: "Ashik Khan",
      jobTitle: [
        "Full-Stack Developer",
        "Software Engineer",
        "Backend Developer",
        "Product Engineer",
      ],
      description:
        "Computer Science and Engineering undergraduate at NSHM College of Management and Technology (MAKAUT) and Full-Stack Developer focused on building complete software products, backend systems, and AI-powered applications.",
      url: "https://ashik-khan.dev/",
      image: "https://ashik-khan.dev/avatar.png",
      email: "ashikcodex@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Durgapur",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "NSHM College of Management and Technology, Durgapur",
        sameAs: "https://makautwb.ac.in/",
      },
      knowsAbout: [
        "C++",
        "TypeScript",
        "JavaScript",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "Socket.IO",
        "tRPC",
        "Drizzle ORM",
        "Redis",
        "OpenAI API",
        "Data Structures and Algorithms",
        "Git",
      ],
      sameAs: [
        "https://www.linkedin.com/in/ashik-khan-489856299/",
        "https://github.com/realashuuu",
        "https://leetcode.com/u/ashikkhan03/",
        "https://www.instagram.com/realashuuu/",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://ashik-khan.dev/#webpage",
      url: "https://ashik-khan.dev/",
      name: "Ashik Khan — Full-Stack Developer & Software Engineer Portfolio",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://ashik-khan.dev/#website",
        name: "Ashik Khan Portfolio",
        url: "https://ashik-khan.dev/",
      },
      about: {
        "@id": "https://ashik-khan.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-ink font-sans antialiased relative overflow-x-clip">
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          <CardRevealObserver />
          <Navigation />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
