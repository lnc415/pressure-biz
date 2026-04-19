interface FooterProps {
  brandName: string
  phone: string
  email1: string
}

export default function Footer({ brandName, phone, email1 }: FooterProps) {
  return (
    <footer className="bg-[#0C1A2E] text-white/70 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="text-[#38BDF8] font-bold text-lg mb-1">{brandName}</p>
          <p className="text-sm">Clean, professional, and fun.</p>
        </div>
        <div className="text-sm flex flex-col gap-1">
          <a href={`tel:${phone}`} className="hover:text-[#00E5FF] transition-colors">{phone}</a>
          <a href={`mailto:${email1}`} className="hover:text-[#00E5FF] transition-colors">{email1}</a>
        </div>
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <p className="mt-1">Insured &bull; Family-Run &bull; Local</p>
        </div>
      </div>
    </footer>
  )
}
