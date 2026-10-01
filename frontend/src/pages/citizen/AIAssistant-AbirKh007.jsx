import { useState } from 'react'
import Button from '../../components/common/Button'
import { mockAIConversations } from '../../data/mockData'

export default function AIAssistant() {
  const [messages, setMessages] = useState(mockAIConversations)
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSend = (event) => {
    event.preventDefault()
    if (!draft.trim()) return

    const userMessage = { sender: 'user', text: draft }
    setMessages((current) => [...current, userMessage])
    setDraft('')
    setLoading(true)
    setError('')
    window.setTimeout(() => {
      if (draft.toLowerCase().includes('error')) { setError('The mock assistant is temporarily unavailable. Try again.'); setLoading(false); return }
      setMessages((current) => [...current, { sender: 'assistant', text: draft.toLowerCase().includes('plastic') ? 'Rinse clean plastic bottles, let them dry, and sort them with PET recyclables.' : 'Keep materials clean and separated. For hazardous or electronic waste, request a dedicated pickup.' }])
      setLoading(false)
    }, 450)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">AI Recycling Assistant</h2>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Online</span>
      </div>

      <div className="max-h-[480px] space-y-4 overflow-y-auto rounded-2xl bg-slate-50 p-4">
        {messages.length === 0 && <p className="text-center text-sm text-slate-500">Ask a question to get started.</p>}
        {messages.map((message, index) => (
          <div key={`${message.sender}-${index}`} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'}`}>
              {message.text}
            </div>
            {loading && <p className="mt-2 text-sm text-slate-500">Assistant is thinking…</p>}
            {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
          </div>
        ))}
      </div>

      <form className="mt-5 flex gap-3" onSubmit={handleSend}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about plastics, paper, e-waste, and sorting..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
