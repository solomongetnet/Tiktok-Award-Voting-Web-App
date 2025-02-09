import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { navLinks } from "@/constants/nav-links";

const socialLinks = [
  { title: "Facebook", icon: Facebook, url: "https://facebook.com/tiktok" },
  { title: "Twitter", icon: Twitter, url: "https://twitter.com/tiktok" },
  { title: "Instagram", icon: Instagram, url: "https://instagram.com/tiktok" },
  { title: "YouTube", icon: Youtube, url: "https://youtube.com/tiktok" },
];

const footerLinks = [
  ...navLinks,
  { title: "FAQ", url: "/faq" },
  { title: "Contact", url: "/contact" },
  { title: "Privacy Policy", url: "/privacy" },
  { title: "Terms of Service", url: "/terms" },
];

export default function ClientFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* first row  */}
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl font-bold">TikTok Awards</h2>
            <p className="text-base text-gray-400">
              Celebrating creativity and talent on TikTok
            </p>
          </div>

          {/* links container 1 */}
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1 md:space-y-2">
              {footerLinks.slice(0, navLinks.length).map((link) => (
                <li key={link?.title}>
                  <Link
                    href={link.url}
                    className="text-sm  text-gray-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* links container 2 */}
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.slice(navLinks.length).map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.url}
                    className="text-sm  text-gray-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* social links */}
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social.title}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TikTok Awards. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
