import Link from "next/link"
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
          {/* Legal Links */}
          <div className="space-y-4">
            <Link href="/terms" className="block text-lg text-rich-black hover:text-blue-primary transition-colors">
              Service Terms and Conditions
            </Link>
            <Link href="/privacy" className="block text-lg text-rich-black hover:text-blue-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund" className="block text-lg text-rich-black hover:text-blue-primary transition-colors">
              Cancellation and Refund Policy
            </Link>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-rich-black">Stay Connected</h3>
            <div className="flex gap-4">
              {/* Replace these Lucide icons with your SVGs */}
              <Link
                href="#instagram"
                className="text-rich-black hover:text-blue-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-8 h-8" />
              </Link>
              <Link
                href="#facebook"
                className="text-rich-black hover:text-blue-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-8 h-8" />
              </Link>
              <Link
                href="#twitter"
                className="text-rich-black hover:text-blue-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-8 h-8" />
              </Link>
              <Link
                href="#linkedin"
                className="text-rich-black hover:text-blue-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-8 h-8" />
              </Link>
              <Link
                href="#youtube"
                className="text-rich-black hover:text-blue-primary transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

