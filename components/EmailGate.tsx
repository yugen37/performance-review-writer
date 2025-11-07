'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { gsap } from 'gsap'
import { Mail, Sparkles } from 'lucide-react'

interface EmailGateProps {
  onSubmit: (email: string) => void
  onClose: () => void
  isLoading: boolean
  error: string | null
}

export default function EmailGate({ onSubmit, onClose, isLoading, error }: EmailGateProps) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate dialog entrance
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.4,
        ease: "back.out(1.2)"
      })
    }
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setEmailError('Please enter your email address')
      return
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    
    setEmailError(null)
    onSubmit(email)
  }

  const displayError = error || emailError

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent 
        ref={contentRef}
        className="sm:max-w-md bg-gradient-to-br from-white to-cyan-50/30 border-2 shadow-2xl"
      >
        <DialogHeader>
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl mb-4 mx-auto">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Get Your Enhanced Review
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Enter your email to receive your AI-enhanced performance review rewrite. 
            We'll show you exactly how to improve your score.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError(null)
              }}
              disabled={isLoading}
              className="h-12 text-base border-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
            {displayError && (
              <div className="bg-destructive/10 border-2 border-destructive/20 rounded-lg p-3 animate-in slide-in-from-top duration-300">
                <p className="text-sm text-destructive font-semibold">{displayError}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get My Enhanced Review
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
