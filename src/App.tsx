import NavApp from './components/nav/NavApp'
import FooterApp from './components/footer/FooterApp'
import { COLORS } from './variables/couleur'
import './App.css'
import { useState, type CSSProperties } from 'react'
import { Outlet } from 'react-router'
import { ScrollToTop } from './components/card/ScrollToTop'

function App() {
  const [navHeight, setNavHeight] = useState(0);
  return (
    
    <div 
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: COLORS.background, color: COLORS.textDark }}
    >
      <ScrollToTop />
      <NavApp setNavHeight={setNavHeight} />
      <main className={`flex-grow `} style={{ paddingTop: navHeight, "--nav-h": `${navHeight}px` } as CSSProperties}>
        <Outlet/>
      </main>
      <FooterApp />
    </div>
  )
}

export default App
