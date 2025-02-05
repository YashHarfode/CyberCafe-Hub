import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2023 CyberCafe Hub. All rights reserved.</p>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/yourusername/cybercafe-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500"
            >
              <Github className="w-6 h-6 mr-2" />
            </a>
            <a href="/privacy-policy" className="text-white hover:text-blue-500 mr-4">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-white hover:text-blue-500">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

