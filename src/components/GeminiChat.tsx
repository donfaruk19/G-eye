import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, AlertCircle } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface GeminiChatProps {
  selectedThreat: any
}

// Initialize Gemini API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    return "⚠️ Gemini API key not configured. Please set VITE_GEMINI_API_KEY in .env.local"
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Gemini API Error:', error)
      return `Error: ${error.error?.message || 'Failed to get response from Gemini API'}`
    }

    const data = await response.json()
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response generated from Gemini API'
    )
  } catch (error) {
    console.error('API Call Error:', error)
    return `Error: ${error instanceof Error ? error.message : 'Failed to call Gemini API'}`
  }
}

export default function GeminiChat({ selectedThreat }: GeminiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: GEMINI_API_KEY
        ? '🤖 G-eye AI Assistant Ready! I can help you analyze security threats using Google Gemini AI. Select a threat on the map or ask me about cybersecurity.'
        : '⚠️ Gemini API key not configured. Please set VITE_GEMINI_API_KEY in .env.local to enable AI features.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedThreat) {
      const threatMessage = `📍 **Threat Selected**: ${selectedThreat.type}\n\n**Severity**: ${selectedThreat.severity.toUpperCase()}\n**Description**: ${selectedThreat.description}\n**Location**: ${selectedThreat.lat.toFixed(2)}°, ${selectedThreat.lon.toFixed(2)}°\n\nWhat would you like to know about this threat?`
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: threatMessage,
          timestamp: new Date(),
        },
      ])
    }
  }, [selectedThreat])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (!GEMINI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: '❌ API key not configured. Set VITE_GEMINI_API_KEY in .env.local',
          timestamp: new Date(),
        },
      ])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Build context-aware prompt
    let contextPrompt = input
    if (selectedThreat) {
      contextPrompt = `You are a cybersecurity expert. A user is asking about a detected threat:
      
Type: ${selectedThreat.type}
Severity: ${selectedThreat.severity}
Description: ${selectedThreat.description}
Location: ${selectedThreat.lat.toFixed(2)}°N, ${selectedThreat.lon.toFixed(2)}°E

User's Question: ${input}

Please provide a professional, concise analysis focusing on:
1. Threat assessment
2. Recommended actions
3. Prevention strategies`
    } else {
      contextPrompt = `You are a cybersecurity expert assistant. Please provide professional, concise cybersecurity advice for this question: ${input}`
    }

    try {
      const aiResponse = await callGeminiAPI(contextPrompt)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="text-blue-400" size={24} />
        <h2 className="text-xl font-bold text-blue-400">AI Analysis Assistant</h2>
        {!GEMINI_API_KEY && <AlertCircle className="text-yellow-500" size={20} />}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 bg-slate-900 rounded p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-gray-100 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            GEMINI_API_KEY
              ? 'Ask about threats or security...'
              : 'Configure VITE_GEMINI_API_KEY to enable chat...'
          }
          className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-400 focus:outline-none disabled:opacity-50"
          disabled={loading || !GEMINI_API_KEY}
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || !GEMINI_API_KEY}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
