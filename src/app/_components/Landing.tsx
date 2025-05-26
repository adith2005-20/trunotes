"use client"
import React from 'react'
import { SignedIn, SignedOut} from '@daveyplate/better-auth-ui'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Landing = () => {
  return (
    <div className="min-h-256 flex flex-col items-center px-4 md:px-8">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mt-24 mb-16">
        <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r text-left bg-foreground/90 backdrop-blur-md bg-clip-text text-transparent `}>
          Create<br/> stunning<br/> notes.
        </h1>
        
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          !feature.authorization && <Link href={feature.url} key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold j25">{feature.title}</h3>
          </Link>
          
        ))}
      </div>
      <SignedOut><span>
    <Link href="/auth/sign-in" className="underline text-blue-500">
      Sign In
    </Link>{" "}
    to view your notes
  </span></SignedOut>
    </div>
  )
}

const features = [
  {
    title: "Create TempNote",
    url: "/tempnotes/create"
  },
  {
    title: "Access TempNote",
    url: "/tempnotes/access"
  },
  {
    title: "My notes",
    url: "/",
    authorization: true
  }
]

export default Landing
