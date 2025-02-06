
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-rich-black">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-16 md:mb-24">
            Echo.
          </div>

          {/* Headline */}
          <h1 className="mb-8 max-w-4xl text-4xl font-bold leading-tight md:text-6xl md:leading-tight">
            Transform Static Learning into Interactive Conversations
          </h1>

          {/* Subheadline */}
          <p className="mb-12 max-w-3xl text-lg md:text-xl">
            Echo turns educational content into AI-powered voice interactions, delivering 40% + higher retention rates
            for students and trainees.
          </p>

          {/* CTA Button */}
          <Link
            href="#request-access"
            className="inline-flex items-center justify-center rounded-md bg-blue-primary px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-secondary"
          >
            Request early access
          </Link>
        </div>
      </div>
    </main>
  )
}

