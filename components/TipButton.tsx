import Link from 'next/link'

type TipColor = 'red' | 'yellow' | 'green' | 'white' | 'black'

const TIP_LABELS: Record<TipColor, string> = {
  red:    '0°',
  yellow: '15°',
  green:  '25°',
  white:  '40°',
  black:  '65°',
}

interface TipButtonProps {
  tip: TipColor
  href: string
  children: React.ReactNode
  showAngle?: boolean
  className?: string
}

export default function TipButton({ tip, href, children, showAngle = false, className = '' }: TipButtonProps) {
  return (
    <Link href={href} className={`tip-btn tip-${tip} ${className}`}>
      <span className="tip-badge" />
      {children}
      {showAngle && (
        <span className="ml-1 text-xs opacity-60 font-normal">{TIP_LABELS[tip]}</span>
      )}
    </Link>
  )
}

export function TipButtonAction({
  tip,
  onClick,
  children,
  showAngle = false,
  className = '',
  disabled = false,
}: {
  tip: TipColor
  onClick?: () => void
  children: React.ReactNode
  showAngle?: boolean
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`tip-btn tip-${tip} ${className} disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none`}
    >
      <span className="tip-badge" />
      {children}
      {showAngle && (
        <span className="ml-1 text-xs opacity-60 font-normal">{TIP_LABELS[tip]}</span>
      )}
    </button>
  )
}
