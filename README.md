# Maxy Alarm🔥⏰ - a Web Based Alarm Application (Build for Course Assignment on Maxy Academy)

A modern and minimalist web alarm application built with React + Vite, featuring a dark theme and smooth animations inspired by Redmi Android alarm apps.

## Features

- **Dark Mode UI** - Sleek, modern interface optimized for log light enviroments
- **Reliable Alarms** - Browser-based alarm system with sound and vibration
- **Cookie Persistence** - All alarm data stored in cookies (survive page refresh hehe..)
- **Time Management** - Create, edit, and toggle alarms easily
- **Smooth Animations** - Framer Motion powered transitions and effects
- **Mobile-First Design** - Responsive Layout that works on all devices
- **Audio Notifications** - Built in alarm sound with volume control
- **No Backend Required** - Fully client side application

## Tech Stack

- **Framework:** React + Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Storage:** Browser Cookies
- **State Management:** React Hooks

## Getting Started

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── Welcome.jsx          # Landing page with animations
│   └── Alarm.jsx            # Main alarm management page
├── components/
│   ├── AlarmList.jsx        # List container for alarms
│   ├── AlarmItem.jsx        # Individual alarm card
│   ├── AlarmModal.jsx       # Alarm editor modal
│   └── Toggle.jsx           # Custom toggle switch
├── hooks/
│   ├── useAlarmCookie.js    # Cookie-based state management
│   └── useAlarmEngine.js    # Alarm timing engine
├── utils/
│   └── cookieHelper.js      # Cookie utility functions
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## Important Notes

### Alarm Reliability

- **Active Tab Required:** For most reliable operation, keep the browser tab active
- **Background Tabs:** Browsers may throttle timers in background tabs
- **Sleep/Lock:** Alarms may not trigger if device is sleeping (browser limitation)
- **Best Practice:** Use this as a supplementary alarm, not as primary wake-up alarm

### Browser Permissions

The app will request:

- **Notifications:** To show alarm notifications
- **Vibration:** Automatic (no permission needed)

## License

This project is open source and available for personal and commercial use.

## Contributing

Contributions, issues, and feature requests are welcome!


**https://maxy-alarm.vercel.app/**
**Built with 🔥 for Maxy Academy**
