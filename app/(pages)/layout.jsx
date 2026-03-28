import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { getSettings } from '@/lib/settings'
import React from 'react'

export const revalidate = 60; // Revalidate settings every 60 seconds

export default async function PagesLayout({children}) {
  const settings = await getSettings();

  return (
    <div className="bg-[#050b14] min-h-screen text-gray-200">
      <Nav settings={settings} />
      {children}
      <Footer settings={settings} />
    </div>
  )
}
