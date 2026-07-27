import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import {router} from "./router/index.tsx"
import { VideoDuMomentProvider } from './components/context/VideoDuMomentProvider.tsx'
import { ArticleDeLaSaisonProvider } from './components/context/ArticleDeLaSaisonProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoDuMomentProvider>
      <ArticleDeLaSaisonProvider>
        <RouterProvider router={router} />
      </ArticleDeLaSaisonProvider>
    </VideoDuMomentProvider>
  </StrictMode>,
)
