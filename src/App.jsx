import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Screen, TopBar, Section, Card, Pill, PrimaryButton } from './components/UI'
import Nav from './components/Nav'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home(){
  const navigate = useNavigate()
  return (
    <Screen>
      <TopBar title="HamroSwasthya" />

      <div className="px-4 pt-4 pb-24 space-y-4">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-2 tracking-tight">Care for your family, calmly</h1>
          <p className="text-[#6e655a]">Light, elegant tools for health diaries, emergencies, blood donation and appointments.</p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card onClick={()=>navigate('/family')} className="p-4">
            <div className="text-lg font-medium">Family Diary</div>
            <Pill>Profiles • Logs • Reminders</Pill>
          </Card>
          <Card onClick={()=>navigate('/sos')} className="p-4">
            <div className="text-lg font-medium">SOS</div>
            <Pill>Emergency help</Pill>
          </Card>
          <Card onClick={()=>navigate('/blood')} className="p-4">
            <div className="text-lg font-medium">BloodLink</div>
            <Pill>Donate • Request</Pill>
          </Card>
          <Card onClick={()=>navigate('/notices')} className="p-4">
            <div className="text-lg font-medium">Health Notices</div>
            <Pill>Local alerts</Pill>
          </Card>
          <Card onClick={()=>navigate('/orders')} className="p-4">
            <div className="text-lg font-medium">Medicines</div>
            <Pill>Order • Track</Pill>
          </Card>
          <Card onClick={()=>navigate('/appointments')} className="p-4">
            <div className="text-lg font-medium">Appointments</div>
            <Pill>Book • Tokens</Pill>
          </Card>
        </div>
      </div>

      <Nav />
    </Screen>
  )
}

function Family(){
  const [profiles, setProfiles] = useState([])
  const userId = 'demo-user'
  const [form, setForm] = useState({ name:'', age:'', blood_group:'', allergies:'', conditions:'' })

  const load = async()=>{
    const r = await fetch(`${API}/family?user_id=${userId}`)
    const d = await r.json()
    setProfiles(d)
  }
  useEffect(()=>{ load() },[])

  const add = async(e)=>{
    e.preventDefault()
    const r = await fetch(`${API}/family`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id:userId, ...form }) })
    if(r.ok){ setForm({ name:'', age:'', blood_group:'', allergies:'', conditions:'' }); load() }
  }

  return (
    <Screen>
      <TopBar title="Family Health Diary" />
      <div className="px-4 pt-4 pb-28 space-y-4">
        <Card>
          <form onSubmit={add} className="grid grid-cols-2 gap-3">
            <input required placeholder="Name" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input placeholder="Age" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
            <input placeholder="Blood Group" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.blood_group} onChange={e=>setForm({...form,blood_group:e.target.value})} />
            <input placeholder="Allergies" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.allergies} onChange={e=>setForm({...form,allergies:e.target.value})} />
            <input placeholder="Conditions" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.conditions} onChange={e=>setForm({...form,conditions:e.target.value})} />
            <PrimaryButton type="submit" className="col-span-2">Add Profile</PrimaryButton>
          </form>
        </Card>

        <Section title="Profiles" />
        <div className="space-y-3">
          {profiles.map(p=> (
            <Card key={p._id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-[#7a7166]">Age {p.age || '-'} • {p.blood_group || '—'}</div>
                </div>
                <Pill>{(p.medicine_reminders||[]).length} reminders</Pill>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Nav />
    </Screen>
  )
}

function SOS(){
  const [type, setType] = useState('fainting')
  const [status, setStatus] = useState('')

  const trigger = async()=>{
    setStatus('Sending...')
    const r = await fetch(`${API}/sos/trigger`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id:'demo-user', emergency_type:type }) })
    const d = await r.json()
    setStatus(d.status === 'sent' ? 'Location shared with help centers and your contact.' : 'Failed')
  }

  const tips = {
    fainting: 'Lay the person down, elevate legs, loosen tight clothing. Check breathing.',
    bleeding: 'Apply direct pressure with clean cloth, elevate if possible, seek help.',
    'chest pain': 'Call emergency immediately. Help the person rest. If available, give aspirin unless allergic.'
  }

  return (
    <Screen>
      <TopBar title="SOS / Emergency" />
      <div className="px-4 pt-6 pb-28 space-y-4">
        <Card className="p-6 text-center">
          <div className="text-sm text-[#7a7166] mb-3">Select emergency type</div>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {['fainting','bleeding','chest pain'].map(v=> (
              <button key={v} onClick={()=>setType(v)} className={`h-10 rounded-lg border ${type===v?'bg-[#f4efe7] border-[#e5dbcd]':'bg-white border-[#efe9df]'} text-sm`}>{v}</button>
            ))}
          </div>
          <button onClick={trigger} className="w-full h-16 rounded-2xl bg-gradient-to-b from-[#ffd9d1] to-[#ffc9c0] text-[#7a2e2e] text-xl font-semibold shadow-[0_10px_28px_rgba(250,140,120,0.25)] border border-[#ffd0c7]">Emergency Help</button>
          {status && <div className="mt-4 text-[#6e655a]">{status}</div>}
        </Card>

        <Section title="First-aid suggestion" />
        <Card>
          <div className="text-[#6e655a]">{tips[type]}</div>
        </Card>
      </div>
      <Nav />
    </Screen>
  )
}

function Blood(){
  const [users, setUsers] = useState([])
  const [reqs, setReqs] = useState([])
  const [form, setForm] = useState({ name:'', location:'', age:'', blood_group:'' })
  const [need, setNeed] = useState({ location:'', blood_group:'', units_needed:1, urgency:'medium' })

  const load = async()=>{
    const u = await (await fetch(`${API}/users`)).json(); setUsers(u)
    const r = await (await fetch(`${API}/blood/requests`)).json(); setReqs(r)
  }
  useEffect(()=>{ load() },[])

  const createUser = async(e)=>{
    e.preventDefault()
    const r = await fetch(`${API}/users`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if(r.ok){ setForm({ name:'', location:'', age:'', blood_group:'' }); load() }
  }
  const createRequest = async(e)=>{
    e.preventDefault()
    const r = await fetch(`${API}/blood/requests`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ requester_id:'demo-user', ...need }) })
    if(r.ok){ setNeed({ location:'', blood_group:'', units_needed:1, urgency:'medium' }); load() }
  }

  return (
    <Screen>
      <TopBar title="BloodLink Nepal" />
      <div className="px-4 pt-4 pb-28 space-y-4">
        <Card>
          <div className="text-sm text-[#7a7166] mb-2">Create your donor profile</div>
          <form onSubmit={createUser} className="grid grid-cols-2 gap-3">
            <input required placeholder="Name" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input placeholder="Location" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
            <input placeholder="Age" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
            <input placeholder="Blood Group" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.blood_group} onChange={e=>setForm({...form,blood_group:e.target.value})} />
            <PrimaryButton type="submit" className="col-span-2">Save Profile</PrimaryButton>
          </form>
        </Card>

        <Section title="Nearby Donors" />
        <div className="space-y-3">
          {users.map(u=> (
            <Card key={u._id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-[#7a7166]">{u.location || '—'} • {u.blood_group || '—'}</div>
              </div>
              <Pill>{u.karma_points || 0} Karma</Pill>
            </Card>
          ))}
        </div>

        <Section title="Need Blood?" />
        <Card>
          <form onSubmit={createRequest} className="grid grid-cols-2 gap-3">
            <input placeholder="City/Area" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={need.location} onChange={e=>setNeed({...need,location:e.target.value})} />
            <input placeholder="Blood Group" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={need.blood_group} onChange={e=>setNeed({...need,blood_group:e.target.value})} />
            <input type="number" min={1} placeholder="Units" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={need.units_needed} onChange={e=>setNeed({...need,units_needed:Number(e.target.value)})} />
            <select className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={need.urgency} onChange={e=>setNeed({...need,urgency:e.target.value})}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <PrimaryButton type="submit" className="col-span-2">Submit Request</PrimaryButton>
          </form>
        </Card>
      </div>
      <Nav />
    </Screen>
  )
}

function Notices(){
  const [notices, setNotices] = useState([])
  const [form, setForm] = useState({ title:'', body:'', city:'' })
  const load = async()=>{ const n = await (await fetch(`${API}/notices`)).json(); setNotices(n) }
  useEffect(()=>{ load() },[])

  const add = async(e)=>{
    e.preventDefault()
    const r = await fetch(`${API}/notices`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if(r.ok){ setForm({ title:'', body:'', city:'' }); load() }
  }

  return (
    <Screen>
      <TopBar title="Health Notices" />
      <div className="px-4 pt-4 pb-28 space-y-4">
        <Card>
          <form onSubmit={add} className="grid grid-cols-2 gap-3">
            <input required placeholder="Title" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            <input placeholder="City" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
            <textarea placeholder="Details" className="col-span-2 min-h-[80px] rounded-lg border border-[#e9e2d8] px-3 py-2 bg-white" value={form.body} onChange={e=>setForm({...form,body:e.target.value})} />
            <PrimaryButton type="submit" className="col-span-2">Post Notice</PrimaryButton>
          </form>
        </Card>

        <div className="space-y-3">
          {notices.map(n=> (
            <Card key={n._id}>
              <div className="font-medium mb-1">{n.title}</div>
              <div className="text-sm text-[#7a7166] mb-2">{n.city || '—'}</div>
              <div className="text-[#554d43] text-sm">{n.body}</div>
            </Card>
          ))}
        </div>
      </div>
      <Nav />
    </Screen>
  )
}

function Orders(){
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ address:'', items:'Paracetamol', quantity:1 })
  const load = async()=>{ const o = await (await fetch(`${API}/orders`)).json(); setOrders(o) }
  useEffect(()=>{ load() },[])
  const place = async(e)=>{
    e.preventDefault()
    const payload = { user_id:'demo-user', address: form.address, items:[{ name: form.items, quantity: Number(form.quantity)}], delivery_charge: 50 }
    const r = await fetch(`${API}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if(r.ok){ setForm({ address:'', items:'Paracetamol', quantity:1 }); load() }
  }

  return (
    <Screen>
      <TopBar title="Medicine Ordering" />
      <div className="px-4 pt-4 pb-28 space-y-4">
        <Card>
          <form onSubmit={place} className="grid grid-cols-2 gap-3">
            <input required placeholder="Address" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
            <input placeholder="Medicine" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.items} onChange={e=>setForm({...form,items:e.target.value})} />
            <input type="number" min={1} placeholder="Qty" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} />
            <PrimaryButton type="submit" className="col-span-2">Place Order (Rs. 50 delivery)</PrimaryButton>
          </form>
        </Card>

        <div className="space-y-3">
          {orders.map(o=> (
            <Card key={o._id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{o.items?.map(i=> `${i.name} x${i.quantity}`).join(', ')}</div>
                <div className="text-sm text-[#7a7166]">{o.address}</div>
              </div>
              <Pill>{o.status}</Pill>
            </Card>
          ))}
        </div>
      </div>
      <Nav />
    </Screen>
  )
}

function Appointments(){
  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [booked, setBooked] = useState([])

  const [hForm, setHForm] = useState({ name:'', city:'' })
  const [dForm, setDForm] = useState({ name:'', department:'', hospital_id:'' })
  const [bForm, setBForm] = useState({ doctor_id:'', date:'' })
  const [feed, setFeed] = useState(null)

  const load = async()=>{
    const h = await (await fetch(`${API}/hospitals`)).json(); setHospitals(h)
    const d = await (await fetch(`${API}/doctors`)).json(); setDoctors(d)
  }
  const loadBookings = async()=>{ const b = await (await fetch(`${API}/orders`)).json(); setBooked(b) } // placeholder for showing list
  useEffect(()=>{ load(); },[])

  const addHospital = async(e)=>{ e.preventDefault(); const r = await fetch(`${API}/hospitals`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(hForm) }); if(r.ok){ setHForm({ name:'', city:'' }); load() } }
  const addDoctor = async(e)=>{ e.preventDefault(); const r = await fetch(`${API}/doctors`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(dForm) }); if(r.ok){ setDForm({ name:'', department:'', hospital_id:'' }); load() } }
  const book = async(e)=>{
    e.preventDefault()
    const r = await fetch(`${API}/bookings`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id:'demo-user', doctor_id:bForm.doctor_id, date: new Date(bForm.date) }) })
    const d = await r.json(); if(r.ok){ alert(`Booked token ${d.token}`); setBForm({ doctor_id:'', date:'' }) }
  }

  const checkFeed = async()=>{
    if(!bForm.doctor_id || !bForm.date) return
    const dateStr = bForm.date.split('T')[0]
    const r = await fetch(`${API}/token/status?doctor_id=${bForm.doctor_id}&date=${dateStr}`)
    const d = await r.json(); setFeed(d)
  }

  return (
    <Screen>
      <TopBar title="Appointments" />
      <div className="px-4 pt-4 pb-32 space-y-4">
        <Card>
          <div className="text-sm text-[#7a7166] mb-2">Add hospital</div>
          <form onSubmit={addHospital} className="grid grid-cols-2 gap-3">
            <input placeholder="Name" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={hForm.name} onChange={e=>setHForm({...hForm,name:e.target.value})} />
            <input placeholder="City" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={hForm.city} onChange={e=>setHForm({...hForm,city:e.target.value})} />
            <PrimaryButton type="submit" className="col-span-2">Save</PrimaryButton>
          </form>
        </Card>

        <Card>
          <div className="text-sm text-[#7a7166] mb-2">Add doctor</div>
          <form onSubmit={addDoctor} className="grid grid-cols-2 gap-3">
            <input placeholder="Name" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={dForm.name} onChange={e=>setDForm({...dForm,name:e.target.value})} />
            <input placeholder="Department" className="h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={dForm.department} onChange={e=>setDForm({...dForm,department:e.target.value})} />
            <select className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={dForm.hospital_id} onChange={e=>setDForm({...dForm,hospital_id:e.target.value})}>
              <option value="">Select hospital</option>
              {hospitals.map(h=> <option key={h._id} value={h._id}>{h.name}</option>)}
            </select>
            <PrimaryButton type="submit" className="col-span-2">Save</PrimaryButton>
          </form>
        </Card>

        <Card>
          <div className="text-sm text-[#7a7166] mb-2">Book appointment</div>
          <form onSubmit={book} className="grid grid-cols-2 gap-3">
            <select className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={bForm.doctor_id} onChange={e=>setBForm({...bForm,doctor_id:e.target.value})}>
              <option value="">Select doctor</option>
              {doctors.map(d=> <option key={d._id} value={d._id}>{d.name} • {d.department}</option>)}
            </select>
            <input type="datetime-local" className="col-span-2 h-11 rounded-lg border border-[#e9e2d8] px-3 bg-white" value={bForm.date} onChange={e=>setBForm({...bForm,date:e.target.value})} />
            <PrimaryButton type="submit" className="col-span-2">Book</PrimaryButton>
          </form>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#7a7166]">Live token status</div>
            <button onClick={checkFeed} className="text-sm underline">Refresh</button>
          </div>
          {feed ? (
            <div className="mt-2">
              <div className="text-sm">Current token: <span className="font-medium">{feed.current_token || 0}</span></div>
              <div className="w-full h-2 bg-[#eee8de] rounded-full mt-2">
                <div className="h-2 rounded-full bg-[#d9cfbf]" style={{width: `${Math.min(100, ((feed.current_token||0)/(feed.last_token||feed.current_token||1))*100)}%`}}/>
              </div>
              <div className="text-xs text-[#7a7166] mt-1">Progress today</div>
            </div>
          ) : (
            <div className="text-sm text-[#7a7166] mt-2">Select a doctor and date, then refresh.</div>
          )}
        </Card>
      </div>
      <Nav />
    </Screen>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/family" element={<Family />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/blood" element={<Blood />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  )
}
