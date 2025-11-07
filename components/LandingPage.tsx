'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { gsap } from 'gsap'

// Dynamically load ScrollTrigger to avoid SSR issues
let ScrollTrigger: any = null
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  }).catch(() => {
    // ScrollTrigger not critical, continue without it
  })
}

interface LandingPageProps {
  onAnalyze: (text: string) => void
  isLoading: boolean
  error: string | null
}

export default function LandingPage({ onAnalyze, isLoading, error }: LandingPageProps) {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [validationError, setValidationError] = useState<string | null>(null)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // High-end GSAP animations - Apple-like smoothness
    const ctx = gsap.context(() => {
      // Logo floating animation
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        })
      }

      // Hero section - dramatic entrance
      if (heroRef.current) {
        const children = Array.from(heroRef.current.children)
        gsap.from(children, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        })
      }

      // Card entrance - scale and fade
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 1,
          delay: 0.4,
          ease: "back.out(1.2)"
        })
      }

      // Parallax effect on scroll (if ScrollTrigger is available)
      if (containerRef.current && ScrollTrigger) {
        gsap.to(containerRef.current, {
          y: (i, el) => {
            return gsap.utils.mapRange(0, window.innerHeight, -30, 30, window.scrollY)
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })
      }

      // Scroll-triggered animations
      const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
      
      if (featuresRef.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.from(entry.target.children, {
                opacity: 0,
                y: 60,
                rotationX: -15,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                transformOrigin: "center center"
              })
              observer.unobserve(entry.target)
            }
          })
        }, observerOptions)
        observer.observe(featuresRef.current)
      }

      if (stepsRef.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.from(entry.target.children, {
                opacity: 0,
                scale: 0.8,
                y: 40,
                rotationY: -10,
                duration: 0.7,
                stagger: 0.15,
                ease: "back.out(1.3)",
                transformOrigin: "center center"
              })
              observer.unobserve(entry.target)
            }
          })
        }, observerOptions)
        observer.observe(stepsRef.current)
      }
    })

    return () => ctx.revert()
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
    
    const words = value.trim().split(/\s+/).filter(word => word.length > 0)
    const count = words.length
    setWordCount(count)
    
    // High-end input animation
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 1.02,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }
    
    if (validationError) {
      setValidationError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim()) {
      setValidationError('Please enter your performance review bullet')
      return
    }
    
    if (wordCount > 200) {
      setValidationError('Please enter a single bullet point. Your entry is too long (max 200 words).')
      return
    }
    
    setValidationError(null)
    
    // High-end button animation
    const button = e.currentTarget.querySelector('button[type="submit"]')
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
      
      // Ripple effect
      gsap.to(button, {
        boxShadow: "0 0 0 0 rgba(0, 188, 212, 0.7)",
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(button, { boxShadow: "" })
        }
      })
    }
    
    onAnalyze(text)
  }

  const displayError = error || validationError
  const isDisabled = isLoading || !text.trim() || wordCount > 200

  return (
    <div ref={containerRef} className="min-h-screen bg-white scrollbar-apple">
      {/* Top banner with teal gradient */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/8 to-primary/5 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <p className="text-sm font-medium text-primary/80 text-center">
            Free performance review analyzer
          </p>
        </div>
      </div>

      {/* Hero Section - High-end animations */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-apple opacity-30" />
        
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative">
          <div ref={heroRef} className="text-center space-y-8">
            {/* Logo with floating animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-3xl opacity-50 animate-pulse" />
                <div 
                  ref={logoRef}
                  className="relative w-20 h-20 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold shadow-2xl"
                >
                  PR
                </div>
              </div>
            </div>
            
            <Badge variant="secondary" className="text-xs px-3 py-1 font-medium bg-primary/10 text-primary border-primary/20">
              Performance Review Analyzer
            </Badge>
            
            <h1 className="text-apple-title">
              Write Performance Reviews
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                That Get Noticed
              </span>
            </h1>
            
            <p className="text-apple-subtitle max-w-2xl mx-auto">
              Transform your performance reviews with AI-powered analysis. 
              Get instant scores and actionable feedback using the proven XYZ formula.
            </p>
          </div>

          {/* Input Card - High-end entrance */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Card ref={cardRef} className="card-apple border-0 shadow-xl glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-center">Analyze Your Review</CardTitle>
                <CardDescription className="text-center text-base text-muted-foreground">
                  Paste your performance review bullet below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="review-text" className="text-sm font-medium">
                      Your Performance Review Bullet
                    </Label>
                    <textarea
                      ref={inputRef}
                      id="review-text"
                      value={text}
                      onChange={handleTextChange}
                      placeholder="Example: Led a team of 5 developers and increased productivity by 30% through implementing agile methodologies..."
                      rows={6}
                      className="input-apple resize-none"
                      disabled={isLoading}
                    />
                    
                    {wordCount > 0 && (
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{wordCount} / 200 words</span>
                        {wordCount > 200 && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            Too long
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {displayError && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 animate-fade-in">
                      <p className="text-sm text-destructive font-medium">{displayError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isDisabled}
                    size="lg"
                    className="w-full h-12 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 btn-apple"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      'Analyze My Review'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Why Section - 3D transform animations */}
      <div className="bg-muted/30 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div ref={featuresRef} className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="text-xs px-3 py-1 border-primary/20 text-primary">
              Why This Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              <span className="text-primary">
                Job-Winning Reviews
              </span>
              {' '}Don't Happen By Accident
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top recruiters use the XYZ formula. We help you master it.
            </p>
          </div>

          <Card className="card-apple border-0 shadow-lg glass">
            <CardContent className="p-12">
              <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed border-l-4 border-primary pl-6 mb-8">
                "Recruiters from top companies tell candidates to write their performance reviews using the now-famous XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]."
              </blockquote>
              <div className="space-y-4 text-apple-body">
                <p className="font-medium">
                  Most professionals struggle with writing reviews that grab attention. That's where our analyzer comes in.
                </p>
                <p className="font-medium">
                  Our tool scans and scores your performance review bullets based on a proven formula that recruiters and managers want to see. More compelling reviews mean better recognition and career growth.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works - 3D card animations */}
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-xs px-3 py-1 border-primary/20 text-primary">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Scan. Update.{' '}
              <span className="text-primary">
                Land Better Reviews
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant feedback and optimize your performance reviews for maximum impact.
            </p>
          </div>

          <div ref={stepsRef} className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: '1',
                title: 'Paste Your Review',
                description: 'Paste your performance review bullet into our analyzer tool and click "Analyze!"',
                icon: '📋'
              },
              {
                number: '2',
                title: 'Get Your Score',
                description: 'Our algorithm scans your review and scores it based on criteria that drive success.',
                icon: '📊'
              },
              {
                number: '3',
                title: 'Make Updates',
                description: 'Make the recommended updates, watch your score increase, and stand out in your reviews!',
                icon: '✨'
              }
            ].map((step, index) => (
              <Card
                key={index}
                className="card-apple border-0 hover:shadow-xl transition-all duration-300 group"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -8,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  })
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-semibold text-primary mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © 2025 Performance Review Writer. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
