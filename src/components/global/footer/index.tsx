import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#4B2E1D] text-[#FDF7F0] w-full border-t border-[#7B4E37]">
      <div className="container mx-auto py-16 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div>
            <Image src="/logo.png" alt="logo" width={70} height={50} className="mb-6" />
            <p className="text-[#D8C4B0] text-sm leading-relaxed">
              Premium organic products for a healthier lifestyle. Sustainably sourced and elegantly crafted for your well-being.
            </p>
            <div className="flex space-x-4 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="hover:text-white transition-colors text-[#D8C4B0]">
                  <Icon size={22} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-[#FDF7F0]">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#D8C4B0]">
              {["Home", "Products", "About Us", "Contact"].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-[#FDF7F0]">Categories</h3>
            <ul className="space-y-2 text-sm text-[#D8C4B0]">
              {[
                { name: "Herbal Tea", id: "herbal-tea" },
                { name: "Jaggery", id: "jaggery" },
                { name: "Cookies", id: "cookies" },
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={`/categories/${cat.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-[#FDF7F0]">Subscribe to Newsletter</h3>
            <p className="text-[#D8C4B0] text-sm mb-4 leading-relaxed">
              Subscribe to our newsletter for early access to exclusive offers and product launches.
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-[#3B2415] text-[#FDF7F0] border-[#8B5A2B] placeholder-[#C4A98A]"
              />
              <Button className="bg-[#8B5A2B] hover:bg-[#D8C4B0] hover:text-[#4B2E1D] text-[#FDF7F0] font-medium transition-colors">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#7B4E37] mt-12 pt-6 text-center text-sm text-[#D8C4B0] tracking-wide">
          <p>© {new Date().getFullYear()} Aamishrit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
