import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Documentation",
      links: ["Getting Started", "Components", "Pricing"],
    },
    {
      title: "Resources",
      links: ["Customers", "Enterprise", "Templates"],
    },
    {
      title: "Company",
      links: ["Careers", "Blog", "Newsletter", "Security"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms Of Service"],
    },
  ];

  return (
    <footer className="relative bg-black text-white py-16 px-8 overflow-hidden">
   

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <span className="text-lg font-bold">Sprint</span>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-bold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © 2024 Sprint.Com
        </div>
      </div>
    </footer>
  );
}
