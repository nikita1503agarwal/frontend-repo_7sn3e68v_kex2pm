import { Home, Siren, HeartHandshake, Bell, Pill, Calendar } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/sos', label: 'SOS', icon: Siren },
  { to: '/blood', label: 'Blood', icon: HeartHandshake },
  { to: '/notices', label: 'Notices', icon: Bell },
  { to: '/orders', label: 'Medicine', icon: Pill },
  { to: '/appointments', label: 'Appointments', icon: Calendar },
]

export default function Nav(){
  return (
    <div className="sticky bottom-0 z-20 bg-[#faf7f2]/90 backdrop-blur border-t border-[#eae5dc]">
      <div className="grid grid-cols-6 gap-1 px-2 py-2 max-w-md mx-auto">
        {items.map(({to,label,icon:Icon})=> (
          <NavLink key={to} to={to} className={({isActive})=> `flex flex-col items-center gap-1 py-1.5 rounded-xl ${isActive ? 'bg-white shadow-sm border border-[#efe9df] text-[#2b2b2b]' : 'text-[#7a7166]'}`}>
            <Icon size={20} />
            <span className="text-[11px]">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
