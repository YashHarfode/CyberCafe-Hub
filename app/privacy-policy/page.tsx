import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="mb-4">
            At CyberCafe Hub, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and
            protect your personal information.
          </p>
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, use our services, or
            contact us for support.
          </p>
          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, as well as to communicate
            with you about your account and our services.
          </p>
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

