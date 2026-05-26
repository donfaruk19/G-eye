# G-eye: Threat Map & AI Analysis Platform

A real-time cybersecurity threat visualization dashboard powered by Google's Gemini AI, providing advanced geospatial threat intelligence and forensic analysis.

![Threat Map & Analysis](https://img.shields.io/badge/Threat%20Intelligence-Active-red)
![AI Powered](https://img.shields.io/badge/AI-Gemini%20Powered-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

## 🎯 Features

- **🗺️ Interactive Threat Map** - D3.js-based global visualization with real-time threat markers
- **🤖 AI-Powered Analysis** - Gemini AI integration for intelligent threat assessment
- **🚨 Severity Indicators** - Color-coded threats (Critical, High, Medium, Low)
- **💬 Smart Chat Interface** - Ask questions about threats and get AI-powered insights
- **📊 Real-time Updates** - Live threat data streaming and analysis
- **📱 Responsive Design** - Works on desktop and mobile devices
- **🎨 Dark Theme UI** - Modern dark interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Gemini API Key (free from [Google AI Studio](https://aistudio.google.com/apikey))

### Installation

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Configure API Key**
   - Get your free API key from [Google AI Studio](https://aistudio.google.com/apikey)
   - Update `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

### Production Build
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
G-eye/
├── src/
│   ├── components/
│   │   ├── ThreatMap.tsx      # D3.js threat visualization
│   │   └── GeminiChat.tsx     # AI chat interface
│   ├── App.tsx                # Main application
│   ├── App.css                # Component styles
│   ├── index.css              # Global styles
│   └── main.tsx               # Entry point
├── index.html                 # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── .env.local                # Environment variables (local)
```

## 🔧 Environment Variables

Create `.env.local` in the root directory:

```env
# Gemini API Key - Get from https://aistudio.google.com/apikey
VITE_GEMINI_API_KEY=your_api_key_here

# Optional: Application URL (auto-detected in development)
VITE_APP_URL=http://localhost:3000
```

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Visualization**: D3.js 7
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **UI Components**: Lucide React Icons

## 📊 Key Components

### ThreatMap Component
- Global mercator projection mapping
- Interactive threat markers with severity indicators
- Pulsing animations for active threats
- Click to select threats for analysis

### GeminiChat Component
- Real-time conversation with Gemini AI
- Contextual threat analysis
- Message history
- Auto-scrolling chat interface

## 🎓 Usage Examples

### Analyzing Threats
1. Click on a threat marker on the map
2. Ask the AI assistant questions about the threat
3. Get AI-powered insights and recommendations

### Custom Queries
- "What is this ransomware attack?"
- "How severe is this DDoS?"
- "What are the recommended defenses?"

## 🚀 Deployment Options

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

### Deploy to Google Cloud Run
```bash
gcloud run deploy g-eye --source .
```

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Keep your Gemini API key secure
- Use environment variables for all sensitive data
- Enable API key restrictions in Google Cloud Console

## 📝 License

MIT License - Feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

---

**Built with ❤️ for cybersecurity professionals**
