import { useState } from 'react'
import { motion } from 'framer-motion'

const CITIES = ['Mumbai','Delhi','Bangalore','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Jaipur','Lucknow','New York','London','Los Angeles','Sydney','Dubai','Toronto','Paris','Tokyo','Singapore','Other']

export default function BirthForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '', dob: '', timeOfBirth: '', gender: '', city: ''
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.dob) e.dob = 'Date of birth is required'
    if (!form.gender) e.gender = 'Please select a gender'
    if (!form.city) e.city = 'City is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name', icon: '👤' },
    { key: 'dob',  label: 'Date of Birth', type: 'date', placeholder: '', icon: '🎂' },
    { key: 'timeOfBirth', label: 'Time of Birth (optional)', type: 'time', placeholder: '', icon: '⏰' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map(({ key, label, type, placeholder, icon }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-nebula-400 mb-2">
            {icon} {label}
          </label>
          <input
            type={type}
            value={form[key]}
            onChange={e => set(key, e.target.value)}
            placeholder={placeholder}
            className="input-cosmic"
            style={{ colorScheme: 'dark' }}
          />
          {errors[key] && (
            <p className="text-red-400 text-xs mt-1.5">{errors[key]}</p>
          )}
        </motion.div>
      ))}

      {/* Gender */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <label className="block text-sm font-medium text-nebula-400 mb-2">🪐 Gender</label>
        <div className="grid grid-cols-3 gap-2">
          {['Male', 'Female', 'Non-binary'].map(g => (
            <button
              key={g}
              type="button"
              onClick={() => set('gender', g)}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border ${
                form.gender === g
                  ? 'bg-nebula-600/30 border-nebula-500/60 text-nebula-300'
                  : 'border-nebula-600/20 text-stardust/50 hover:border-nebula-600/40 hover:text-stardust/80'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {errors.gender && <p className="text-red-400 text-xs mt-1.5">{errors.gender}</p>}
      </motion.div>

      {/* City */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <label className="block text-sm font-medium text-nebula-400 mb-2">🌍 City</label>
        <select
          value={form.city}
          onChange={e => set('city', e.target.value)}
          className="input-cosmic"
          style={{ colorScheme: 'dark' }}
        >
          <option value="">Select your city</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.city && <p className="text-red-400 text-xs mt-1.5">{errors.city}</p>}
      </motion.div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold mt-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Reading the cosmos...</span>
          </>
        ) : (
          <><span>✨</span><span>Reveal My Destiny</span><span>✨</span></>
        )}
      </motion.button>
    </form>
  )
}
