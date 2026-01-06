/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- GŁÓWNE KOLORY MARKI (Brand) ---
        primary: {
          DEFAULT: '#2563EB', // blue-600 (Główny przycisk, aktywny element)
          light: '#3B82F6',   // blue-500
          bg: '#EFF6FF',      // blue-50 (Tło kafelka "Dziś")
          text: '#1E40AF',    // blue-800 (Tekst na jasnym tle)
        },

        // --- TŁA I POWIERZCHNIE (Backgrounds) ---
        background: {
          DEFAULT: '#F9FAFB', // gray-50 (Tło całego ekranu)
          paper: '#FFFFFF',   // white (Karty, nagłówki)
          backlight: '#F3F4F6',
        },

        // --- TEKSTY (Typography) ---
        typography: {
          main: '#111827',      // gray-900 (Tytuły, główne wartości)
          secondary: '#6B7280', // gray-500 (Etykiety, opisy, godzina)
          disabled: '#9CA3AF',  // gray-400 (Nieaktywne elementy)
        },

        // --- STATUSY (Feedback) ---
        danger: {
          DEFAULT: '#EF4444', // red-500 (Wysoki puls)
          bg: '#FEF2F2',      // red-50 (Tło pulsu)
          text: '#B91C1C',    // red-700 (Tekst pulsu)
        },
        success: {
          DEFAULT: '#16A34A', // green-600 (Dobre ciśnienie)
        },
        
        // --- RAMKI I LINIE ---
        border: {
          light: '#F3F4F6', // gray-100 (Delikatne linie)
          DEFAULT: '#E5E7EB', // gray-200 (Ramki kafelków)
        }
      },
    },
  },
  plugins: [],
}

