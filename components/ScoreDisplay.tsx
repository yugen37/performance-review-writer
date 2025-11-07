'use client'

import { useEffect, useRef } from 'react'
import { AnalysisResult } from '@/app/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { gsap } from 'gsap'
import { CheckCircle2, XCircle, ArrowLeft, Sparkles } from 'lucide-react'

interface ScoreDisplayProps {
  result: AnalysisResult
  onRequestRewrite: () => void
  onReset: () => void
}

export default function ScoreDisplay({ result, onRequestRewrite, onReset }: ScoreDisplayProps) {
  const { score, breakdown, painPoint } = result
  const scoreRef = useRef<HTMLDivElement>(null)
  const breakdownRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate score counting up
    if (scoreRef.current) {
      const scoreElement = scoreRef.current.querySelector('.score-number')
      if (scoreElement) {
        const obj = { score: 0 }
        gsap.to(obj, {
          score: score,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            scoreElement.textContent = Math.round(obj.score).toString()
          }
        })
      }
    }

    // Animate card entrance
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.6,
        ease: "power3.out"
      })
    }

    // Animate breakdown items
    if (breakdownRef.current) {
      gsap.from(breakdownRef.current.children, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3
      })
    }
  }, [])

  const getScoreColor = (score: number) => {
    if (score < 40) return 'from-red-500 to-red-600'
    if (score < 70) return 'from-orange-500 to-orange-600'
    return 'from-primary to-primary/90' // Your teal gradient
  }

  const getScoreBgColor = (score: number) => {
    if (score < 40) return 'bg-red-50 border-red-200'
    if (score < 70) return 'bg-orange-50 border-orange-200'
    return 'bg-primary/10 border-primary/30' // Teal-tinted
  }

  const getScoreTextColor = (score: number) => {
    if (score < 40) return 'text-red-600'
    if (score < 70) return 'text-orange-600'
    return 'text-primary' // Your teal
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onReset}
          className="mb-8 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Analyze Another Review
        </Button>

        {/* Score Card */}
        <Card ref={cardRef} className="border-2 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <CardTitle className="text-3xl font-bold">Your Performance Review Score</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Score Display */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br ${getScoreColor(score)} mb-6 shadow-2xl relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                <span ref={scoreRef} className={`text-7xl font-bold text-white relative z-10 score-number`}>
                  {score}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">out of 100</p>
                <Badge 
                  variant={score >= 70 ? "default" : score >= 40 ? "secondary" : "destructive"}
                  className="text-base px-4 py-1"
                >
                  {score >= 70 ? "Excellent" : score >= 40 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>
            </div>

            {/* Breakdown */}
            <div className="border-t-2 border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Score Breakdown
              </h3>
              <div ref={breakdownRef} className="space-y-4">
                {[
                  { key: 'outcome', label: 'Outcome (X)', desc: 'Achievement/impact indicators', found: breakdown.outcome.found },
                  { key: 'metrics', label: 'Metrics (Y)', desc: 'Quantifiable numbers', found: breakdown.metrics.found },
                  { key: 'method', label: 'Method (Z)', desc: 'Process/how indicators', found: breakdown.method.found }
                ].map((item) => (
                  <Card
                    key={item.key}
                    className={`border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      item.found 
                        ? 'bg-green-50/50 border-green-200' 
                        : 'bg-red-50/50 border-red-200'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{item.label}</h4>
                            {item.found ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                          <p className="text-gray-600 font-medium">{item.desc}</p>
                        </div>
                        <div className="ml-4">
                          <Badge 
                            variant={item.found ? "default" : "destructive"}
                            className="text-lg px-4 py-2"
                          >
                            {item.found ? "Found" : "Missing"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pain Point Message */}
            <Card className={`border-2 ${getScoreBgColor(score)}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className={`w-1 h-full rounded-full bg-gradient-to-b ${getScoreColor(score)} min-h-[40px]`} />
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">💡 Insight</h4>
                    <p className={`text-lg font-semibold ${getScoreTextColor(score)} leading-relaxed`}>
                      {painPoint}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                onClick={onRequestRewrite}
                size="lg"
                className="w-full text-lg h-14 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-primary hover:bg-primary/90 rounded-full"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                See How This Could Be Better
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
