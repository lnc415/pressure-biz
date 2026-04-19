interface FooterProps {
  brandName: string
  phone: string
  email1: string
}

export default function Footer({ brandName, phone, email1 }: FooterProps) {
  return (
    <footer className="py-10 mt-auto" style={{ background: '#08111F', borderTop: '1px solid rgba(0,212,255,0.08)' }}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="font-black text-lg mb-1" style={{ color: '#00D4FF' }}>{brandName}</p>
          <p className="text-sm text-white/30">Clean, professional, and fun.</p>
          {/* Mini tip row */}
          <div className="flex gap-2 mt-3">
            {['#E8231A','#FFD100','#00A550','#D8E8F0','#444'].map(c => (
              <div key={c} style={{ width: 6, height: 18, background: c, borderRadius: 2, opacity: 0.6 }} />
            ))}
          </div>
        </div>
        <div className="text-sm flex flex-col gap-1.5 text-white/40">
          <a href={`tel:${phone}`} className="hover:text-[#00D4FF] transition-colors">{phone}</a>
          <a href={`mailto:${email1}`} className="hover:text-[#00D4FF] transition-colors">{email1}</a>
        </div>
        <div className="text-sm text-white/30">
          <p>&copy; {new Date().getFullYear()} {brandName}.</p>
          <p className="mt-1">Insured &bull; Family-Run &bull; Local</p>
        </div>
      </div>
    </footer>
  )
}
