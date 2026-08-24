import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import {router} from "./router/index.tsx"
import { VideoDuMomentProvider } from './components/context/VideoDuMomentProvider.tsx'
import { ArticleDeLaSaisonProvider } from './components/context/ArticleDeLaSaisonProvider.tsx'
import { MarqueNameProvider } from './components/context/MarqueNameProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoDuMomentProvider>
      <ArticleDeLaSaisonProvider>
        <MarqueNameProvider>
          <RouterProvider router={router} />
        </MarqueNameProvider>
      </ArticleDeLaSaisonProvider>
    </VideoDuMomentProvider>
  </StrictMode>,
)
