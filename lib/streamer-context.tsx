'use client'

import { createContext, useContext, useState } from 'react'

type StreamerContextType = {
  streamerMode: boolean
  toggleStreamerMode: () => void
}

const StreamerContext = createContext<StreamerContextType>({
  streamerMode: false,
  toggleStreamerMode: () => {},
})

export function StreamerProvider({ children }: { children: React.ReactNode }) {
  const [streamerMode, setStreamerMode] = useState(false)
  const toggleStreamerMode = () => setStreamerMode((v) => !v)
  return (
    <StreamerContext.Provider value={{ streamerMode, toggleStreamerMode }}>
      {children}
    </StreamerContext.Provider>
  )
}

export function useStreamer() {
  return useContext(StreamerContext)
}
