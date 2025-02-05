import { CreditCard, Baby, Briefcase, Zap } from "lucide-react"

export interface Service {
  id: string
  name: string
  icon: any
  category: string
  details: {
    documents: string
    time: string
    fees: {
      official: string
      service: string
    }
  }
  description: string
  govtLink: string
}

export const serviceCategories = [
  "Certificates",
  "ID Documents",
  "Finance Services",
  "Utility Services",
  "Other Services",
]

export const services: Service[] = [
  {
    id: "1",
    name: "Birth Certificate",
    icon: Baby,
    category: "Certificates",
    details: {
      documents: "Hospital Certificate, Parents' ID Proof",
      time: "7-14 days",
      fees: {
        official: "₹25",
        service: "₹50",
      },
    },
    description:
      "Official document certifying the birth of a child, including details such as name, date of birth, place of birth, and parents' names.",
    govtLink: "https://www.india.gov.in/spotlight/birth-certificate",
  },
  {
    id: "2",
    name: "PAN Card",
    icon: CreditCard,
    category: "ID Documents",
    details: {
      documents: "ID Proof, Address Proof, Photograph",
      time: "15-20 days",
      fees: {
        official: "₹107",
        service: "₹50",
      },
    },
    description:
      "Permanent Account Number (PAN) card is a unique ten-digit alphanumeric identifier issued by the Income Tax Department to individuals and entities.",
    govtLink: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
  },
  {
    id: "3",
    name: "GST Filing",
    icon: Briefcase,
    category: "Finance Services",
    details: {
      documents: "GSTIN, Financial Records",
      time: "Monthly/Quarterly",
      fees: {
        official: "Varies",
        service: "₹500-₹2000",
      },
    },
    description:
      "Filing of Goods and Services Tax (GST) returns as per government regulations. Includes compilation and submission of required financial data.",
    govtLink: "https://www.gst.gov.in/",
  },
  {
    id: "4",
    name: "Electricity Bill Payment",
    icon: Zap,
    category: "Utility Services",
    details: {
      documents: "Bill, Consumer Number",
      time: "Instant",
      fees: {
        official: "Bill Amount",
        service: "₹10-₹20",
      },
    },
    description:
      "Convenient payment of electricity bills through our platform. Supports multiple electricity boards across the country.",
    govtLink: "https://www.npci.org.in/what-we-do/bharat-billpay/product-overview",
  },
  // Add more services here...
]

