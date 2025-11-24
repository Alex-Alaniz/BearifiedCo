export function BearifiedLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div
      className={`${className} bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
    >
      <span className="text-sm">🐻</span>
    </div>
  )
}
