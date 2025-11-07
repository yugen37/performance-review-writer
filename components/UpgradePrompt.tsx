'use client'

interface UpgradePromptProps {
  onClose: () => void
}

export default function UpgradePrompt({ onClose }: UpgradePromptProps) {
  const pricingTiers = [
    {
      name: '1 Month',
      price: '$9',
      period: 'per month',
      popular: false,
    },
    {
      name: '6 Months',
      price: '$45',
      period: 'per 6 months',
      savings: 'Save 17%',
      popular: false,
    },
    {
      name: 'Annual',
      price: '$90',
      period: 'per year',
      savings: 'Save 17%',
      popular: true,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-none shadow-2xl max-w-3xl w-full p-8 md:p-10 relative max-h-[90vh] overflow-y-auto border-2 border-gray-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors font-bold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            You've Used All 3 Free Scans!
          </h2>
          <p className="text-lg font-bold text-gray-700">
            Upgrade to get unlimited access to AI-enhanced performance review rewrites
          </p>
        </div>

        {/* Pricing Tiers - Cultivated Culture style */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-none border-2 p-6 relative transition-all ${
                tier.popular ? 'border-primary-500 shadow-lg scale-105' : 'border-gray-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-none border-2 border-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-700 text-sm ml-2 font-semibold">{tier.period}</span>
                </div>
                {tier.savings && (
                  <p className="text-sm text-primary-500 font-bold mb-4">{tier.savings}</p>
                )}
                <button
                  className={`w-full py-3 px-4 rounded-none font-bold transition-all border-2 ${
                    tier.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Upgrade
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features - Cultivated Culture style */}
        <div className="bg-accent-beige rounded-none p-6 mb-6 border-2 border-gray-300">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Your Unlimited Plan Includes:</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Unlimited performance review analyses</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">AI-enhanced rewrites for all your reviews</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Priority support</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Cancel anytime</span>
            </li>
          </ul>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-600 text-center font-semibold">
          Note: Stripe integration coming soon. For now, you can continue using the free scans.
        </p>
      </div>
    </div>
  )
}
