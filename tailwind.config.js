/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#f59e0b',    // Amber-500 - Primary CTAs, active states
          secondary: '#3b82f6',  // Blue-500 - Links, informational elements
          accent: '#f97316',     // Orange-500 - Errors, warnings
        },
        
        // Background Colors
        background: {
          primary: '#ffffff',    // White - Main page background
          secondary: '#f9fafb',  // Gray-50 - Card backgrounds
          tertiary: '#f3f4f6',   // Gray-100 - Section backgrounds
        },
        
        // Surface Colors (for cards, panels)
        surface: {
          DEFAULT: '#ffffff',    // Default surface
          dark: '#f9fafb',       // Gray-50 - Darker surface
          light: '#fafafa',      // Gray-50 lighter - Lighter surface
        },
        
        // Border Colors
        border: {
          DEFAULT: '#e5e7eb',    // Gray-200 - Default border
          light: '#f3f4f6',      // Gray-100 - Lighter border
          dark: '#d1d5db',       // Gray-300 - Darker border
        },
        
        // Text Colors
        text: {
          primary: '#111827',    // Gray-900 - Headlines, important text
          secondary: '#4b5563',  // Gray-600 - Body text
          muted: '#6b7280',      // Gray-500 - Supporting text
          disabled: '#9ca3af',   // Gray-400 - Disabled text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        scanline: {
          '0%':   { top: '0%',   opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
      animation: {
        scanline: 'scanline 3s linear infinite',
      },
    },
  },
  plugins: [],
}
