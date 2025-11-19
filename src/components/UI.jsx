import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export function Screen({ children, className }) {
  return (
    <div className={cn("min-h-screen bg-gradient-to-b from-[#faf7f2] via-[#f8f6f1] to-[#f7f4ef] text-[#2b2b2b]", className)}>
      <div className="mx-auto max-w-md min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  )
}

export function TopBar({ title, right }) {
  return (
    <div className="sticky top-0 z-20 bg-[#f8f6f1]/80 backdrop-blur border-b border-[#eae5dc]">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="font-semibold tracking-tight text-[15px] text-[#333]">{title}</div>
        <div>{right}</div>
      </div>
    </div>
  )
}

export function Section({ title, children, action }) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-end justify-between mb-2">
        <div className="text-[13px] uppercase tracking-wide text-[#8a8174]">{title}</div>
        {action}
      </div>
      {children}
    </div>
  )
}

export function Card({ children, className, onClick }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} className={cn("bg-white rounded-2xl shadow-[0_6px_24px_rgba(180,160,120,0.12)] border border-[#efe9df] p-4", className)} onClick={onClick}>
      {children}
    </motion.div>
  )
}

export function Pill({ children, className }) {
  return (
    <span className={cn("px-2.5 py-1 rounded-full bg-[#f4efe7] text-[#6e655a] text-xs border border-[#ece5da]", className)}>
      {children}
    </span>
  )
}

export function PrimaryButton({ children, className, ...props }) {
  return (
    <motion.button whileTap={{ scale: 0.98 }} {...props} className={cn("w-full h-12 rounded-xl bg-gradient-to-b from-[#e9decf] to-[#e2d6c4] text-[#2b2b2b] font-medium shadow-[0_6px_18px_rgba(160,140,110,0.18)] border border-[#e7dbc9]", className)}>
      {children}
    </motion.button>
  )
}

export function SubtleButton({ children, className, ...props }) {
  return (
    <button {...props} className={cn("h-10 px-4 rounded-lg bg-white border border-[#efe9df] shadow-sm text-sm", className)}>
      {children}
    </button>
  )
}
