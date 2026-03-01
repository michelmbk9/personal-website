import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      // Postgres unique violation → already subscribed
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You\'re already subscribed.' },
          { status: 409 }
        )
      }
      console.error('Newsletter insert error:', error)
      return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Newsletter route error:', err)
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
