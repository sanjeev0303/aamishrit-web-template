import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { useAppSelector } from '@/store/store'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CardAside = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items) || []
  const router = useRouter()

  const subtotal = cartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  return (
    <div className="lg:col-span-1">
      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-brown-50 via-brown-100 to-brown-200 backdrop-blur-sm sticky top-8 ring-1 ring-brown-300/40">
        <CardHeader className="bg-brown-800 text-white px-8 py-6">
          <CardTitle className="text-3xl font-semibold tracking-wide">Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="p-8 space-y-7 text-brown-900">
          {/* Subtotal */}
          <div className="flex justify-between text-base sm:text-lg font-medium">
            <span className="text-brown-700">Subtotal</span>
            <span className="font-semibold text-brown-700">{formatPrice(subtotal)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-base sm:text-lg font-medium">
            <span className="text-brown-700">Shipping</span>
            <span className="font-semibold text-brown-700">
              {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between text-base sm:text-lg font-medium">
            <span className="text-brown-700">Tax (5%)</span>
            <span className="font-semibold text-brown-700">{formatPrice(tax)}</span>
          </div>

          <Separator className="bg-brown-300" />

          {/* Total */}
          <div className="flex justify-between text-xl sm:text-2xl font-bold text-brown-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full mt-6 py-3 rounded-full bg-brown-500 text-white font-semibold text-lg hover:bg-brown-600 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => router.push('/checkout')}
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Proceed to Checkout
          </Button>

          {/* Info Text */}
          <div className="mt-6 text-xs text-brown-600 leading-relaxed space-y-1 font-light">
            <p>✨ Free shipping on orders over ₹500</p>
            <p>🧾 Taxes calculated at checkout</p>
            <p>🔒 Secure payments with all major credit cards</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardAside
