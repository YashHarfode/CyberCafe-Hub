import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="mb-4">
            Welcome to CyberCafe Hub. By using our services, you agree to these terms. Please read them carefully.
          </p>
          <h2 className="text-xl font-semibold mb-2">Use of Services</h2>
          <p className="mb-4">
            You must follow any policies made available to you within the Services. You may use our Services only as
            permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms
            or policies or if we are investigating suspected misconduct.
          </p>
          <h2 className="text-xl font-semibold mb-2">Privacy and Copyright Protection</h2>
          <p className="mb-4">
            CyberCafe Hub's privacy policies explain how we treat your personal data and protect your privacy when you
            use our Services. By using our Services, you agree that CyberCafe Hub can use such data in accordance with
            our privacy policies.
          </p>
          <h2 className="text-xl font-semibold mb-2">Modifying and Terminating our Services</h2>
          <p className="mb-4">
            We are constantly changing and improving our Services. We may add or remove functionalities or features, and
            we may suspend or stop a Service altogether.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

