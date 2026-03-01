'use client'

import { useEffect, useState } from 'react'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Greeting() {
  const [greeting, setGreeting] = useState('Hello')

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  return (
    <h1 className="font-serif text-[clamp(36px,5vw,54px)] font-normal leading-tight tracking-tight text-[#111]">
      {greeting}, I&apos;m Michel.
    </h1>
  )
}
