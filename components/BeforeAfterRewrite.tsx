'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { gsap } from 'gsap'
import { Copy, Check, ArrowLeft, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BeforeAfterRewriteProps {
  original: string
  enhanced: string
  remainingScans: number
  onReset: () => void
}

export default function BeforeAfterRewrite({ original, enhanced, remainingScans, onReset }: BeforeAfterRewriteProps) {
  const [copied, setCopied] = useState(false)
  const originalRef = useRef<HTMLDivElement>(null)
  const enhancedRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Animate container entrance
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out"
      })
    }

    // Animate original and enhanced sections
    if (originalRef.current && enhancedRef.current) {
      gsap.from([originalRef.current, enhancedRef.current], {
        opacity: 0,
        x: (index) => index === 0 ? -30 : 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2
      })
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(enhanced)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Enhanced review copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try again",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onReset}
              className="hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Analyze Another Review
            </Button>
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {remainingScans} free scan{remainingScans !== 1 ? 's' : ''} remaining
            </Badge>
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent">
              Before & After
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how your review transforms with our AI-powered enhancement
            </p>
          </div>

          {/* Before/After Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original */}
            <Card ref={originalRef} className="border-2 border-gray-200 shadow-lg bg-white">
              <CardHeader className="bg-gray-50 border-b-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-700">Original Review</CardTitle>
                  <Badge variant="outline" className="bg-gray-100">Before</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                    {original}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced */}
            <Card ref={enhancedRef} className="border-2 border-primary-200 shadow-xl bg-gradient-to-br from-white to-primary-50/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-bl-full" />
              <CardHeader className="bg-gradient-to-r from-primary-500 to-cyan-500 text-white border-b-2 border-primary-400 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">Enhanced Review</CardTitle>
                  <Badge className="bg-white/20 text-white border-white/30">After</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 relative z-10">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {enhanced}
                  </p>
                </div>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="w-full mt-6 border-2 hover:bg-primary-50 hover:border-primary-300 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Enhanced Review
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-cyan-50/50 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to improve more reviews?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Analyze another performance review bullet and see your score improve
              </p>
              <Button
                onClick={onReset}
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Another Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
