import { redirect } from 'next/navigation'
import { stripe } from '../lib/stripe'
import Link from 'next/link'
import { CheckCircle, Mail, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Booupdatehistory } from '../Action/Historybooks'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  // Validate session_id
  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  try {
    // Retrieve Stripe session with expanded data
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    })

    const { status, customer_details } = session
    const customerEmail = customer_details?.email || 'your email'

    // Redirect if payment is still open
    if (status === 'open') {
      return redirect('/')
    }

    // Extract metadata with proper null checks
    const userId = session.metadata?.userId || null
    const productId = session.metadata?.productId || null
    const coverimg = session.metadata?.coverimg || null
    const booktitle = session.metadata?.booktitle || null
    const writerId = session.metadata?.WriterId || null

    // Save purchase history if payment is complete
    if (status === 'complete' && userId && productId) {
      try {
        const historyData = {
          userId: userId,
          writerId: writerId || "0",
          productId: productId,
          email: customerEmail,
          sessionId: session_id,
          paymentIntentId: session.payment_intent?.id,
          amount: session.amount_total ? session.amount_total / 100 : null,
          currency: session.currency,
          timestamp: new Date(),
          coverimg: coverimg || undefined,
          booktitle: booktitle || undefined
        }

        const savedHistory = await Booupdatehistory(historyData)
        console.log('Purchase history saved successfully:', savedHistory)
      } catch (dbError) {
        console.error('Failed to save purchase history:', dbError)
        // Don't throw error here - we want to show success page even if history save fails
      }
    } else if (status === 'complete') {
      console.warn('Missing userId or productId in session metadata:', {
        userId,
        productId,
        session_id
      })
    }

    // Render success page
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-[95%] sm:max-w-2xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-green-100">
          {/* Success Icon */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-3 sm:p-4">
                <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 sm:mb-3">
            Payment Successful!
          </h1>

          <p className="text-center text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              <h2 className="font-semibold text-gray-800 text-sm sm:text-base">Order Details</h2>
            </div>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex flex-wrap justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Order Status</span>
                <span className="font-semibold text-green-600">
                  {status === 'complete' ? 'Completed' : status}
                </span>
              </div>
              <div className="flex flex-wrap justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono text-[10px] sm:text-xs text-gray-700 truncate max-w-[120px] sm:max-w-[180px]">
                  {session_id}
                </span>
              </div>
              <div className="flex flex-wrap justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold text-gray-900">
                  {session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : 'N/A'}
                </span>
              </div>
              {userId && (
                <div className="flex flex-wrap justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-mono text-[10px] sm:text-xs text-gray-700 truncate max-w-[120px] sm:max-w-[180px]">
                    {userId}
                  </span>
                </div>
              )}
              {productId && (
                <div className="flex flex-wrap justify-between py-2">
                  <span className="text-gray-600">Product ID</span>
                  <span className="font-mono text-[10px] sm:text-xs text-gray-700 truncate max-w-[120px] sm:max-w-[180px]">
                    {productId}
                  </span>
                </div>
              )}
              {booktitle && (
                <div className="flex flex-wrap justify-between py-2 border-t border-gray-200 mt-2 pt-2">
                  <span className="text-gray-600">Book Title</span>
                  <span className="font-medium text-gray-700 truncate max-w-[120px] sm:max-w-[180px]">
                    {booktitle}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 border border-blue-100">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Confirmation Email Sent</p>
              <p className="text-xs sm:text-sm text-blue-700 break-words">
                A confirmation email has been sent to{' '}
                <span className="font-semibold">{customerEmail}</span>
              </p>
              <p className="text-[10px] sm:text-xs text-blue-600 mt-1">
                If you have any questions, please email{' '}
                <a href="mailto:orders@example.com" className="underline hover:text-blue-800">
                  orders@example.com
                </a>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/"
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Store
            </Link>
            <Link
              href={productId ? `/bookdetailspage/${productId}` : '/orders'}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {productId ? 'View Book Details' : 'My Orders'}
            </Link>
          </div>

          <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 sm:mt-8">
            This is a confirmation of your purchase. Keep this for your records.
          </p>
        </div>
      </div>
    )

  } catch (error) {
    console.error('Error processing payment success:', error)
    // Redirect to home with error param
    return redirect('/?error=payment_verification_failed')
  }
}