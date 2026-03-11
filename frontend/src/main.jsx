import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
// import { Toaster } from "sonner";
import { Toaster } from "./components/ui/sonner.jsx";
import store from './redux/store.js';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';
// import { ThemeProvider } from 'next-themes';
import {persistStore} from 'redux-persist'

const persistor = persistStore(store)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster   position="top-center" richColors closeButton />
      </PersistGate>
      {/* <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster   position="top-center" richColors closeButton /> */}
    </Provider>
  </StrictMode>,
)
