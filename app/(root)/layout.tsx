import React from "react"
import Navbar from "@/components/Navbar"


const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="font-work-sans">
        <Navbar/>
        {children}
    </main>
  )
}

export default RootLayout