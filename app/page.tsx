'use client'

import { useState } from 'react'
import LandingPage from '@/components/LandingPage'
import ScoreDisplay from '@/components/ScoreDisplay'
import EmailGate from '@/components/EmailGate'
import BeforeAfterRewrite from '@/components/BeforeAfterRewrite'
import UpgradePrompt from '@/components/UpgradePrompt'

export type AnalysisResult = {
  score: number
  breakdown: {
    outcome: { found: boolean; reason: string }
    metrics: { found: boolean; reason: string }
    method: { found: boolean; reason: string }
  }
  painPoint: string
}

export type RewriteResult = {
  enhanced: string
  remainingScans: number
}

export default function Home() {
  const [originalText, setOriginalText] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(null)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isRewriting, setIsRewriting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (text: string) => {
    setOriginalText(text)
    setIsAnalyzing(true)
    setError(null)
    setAnalysisResult(null)
    setRewriteResult(null)
    setShowEmailGate(false)
    setShowUpgradePrompt(false)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_ANALYZE_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze text')
      }

      const data = await response.json()
      setAnalysisResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleRequestRewrite = () => {
    setShowEmailGate(true)
  }

  const handleEmailSubmit = async (email: string) => {
    if (!originalText) return

    setIsRewriting(true)
    setError(null)
    setShowEmailGate(false)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_REWRITE_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, text: originalText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        if (response.status === 403) {
          // All scans used
          setShowUpgradePrompt(true)
          return
        }
        
        throw new Error(errorData.error || 'Failed to get rewrite')
      }

      const data = await response.json()
      setRewriteResult(data)
      
      if (data.remainingScans === 0) {
        setShowUpgradePrompt(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsRewriting(false)
    }
  }

  const handleCloseEmailGate = () => {
    setShowEmailGate(false)
  }

  const handleCloseUpgradePrompt = () => {
    setShowUpgradePrompt(false)
  }

  const handleReset = () => {
    setOriginalText('')
    setAnalysisResult(null)
    setRewriteResult(null)
    setShowEmailGate(false)
    setShowUpgradePrompt(false)
    setError(null)
  }

  return (
    <main className="min-h-screen">
      {!analysisResult && (
        <LandingPage 
          onAnalyze={handleAnalyze}
          isLoading={isAnalyzing}
          error={error}
        />
      )}

      {analysisResult && !rewriteResult && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ScoreDisplay 
            result={analysisResult}
            onRequestRewrite={handleRequestRewrite}
            onReset={handleReset}
          />
        </div>
      )}

      {rewriteResult && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <BeforeAfterRewrite
            original={originalText}
            enhanced={rewriteResult.enhanced}
            remainingScans={rewriteResult.remainingScans}
            onReset={handleReset}
          />
        </div>
      )}

      {showEmailGate && (
        <EmailGate
          onSubmit={handleEmailSubmit}
          onClose={handleCloseEmailGate}
          isLoading={isRewriting}
          error={error}
        />
      )}

      {showUpgradePrompt && (
        <UpgradePrompt
          onClose={handleCloseUpgradePrompt}
        />
      )}
    </main>
  )
}







