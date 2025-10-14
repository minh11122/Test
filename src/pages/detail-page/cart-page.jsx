import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export const CartPage = () => {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      alert("Đặt hàng thành công! Cảm ơn bạn đã đặt hàng.")
      clearCart()
      setIsCheckingOut(false)
      navigate("/")
    }, 1500)
  }

  const totalPrice = getTotalPrice()
  const shippingFee = totalPrice > 0 ? 15000 : 0
  const finalTotal = totalPrice + shippingFee

  if (items.length === 0) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-yellow-100 text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <Card className="border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                Bạn chưa có món ăn nào trong giỏ hàng. Hãy khám phá các quán ăn và thêm món yêu thích của bạn!
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-6 text-base font-semibold shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Khám phá món ăn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-50 min-h-screen pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-yellow-100 text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <Button
            variant="outline"
            onClick={clearCart}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa tất cả
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <ShoppingCart className="w-6 h-6 text-yellow-600" />
                      Giỏ hàng của bạn
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">{items.length} món ăn</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-400px)] min-h-[400px]">
                  <div className="p-6 space-y-4">
                    {items.map((item) => {
                      const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price

                      return (
                        <Card
                          key={item._id}
                          className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image_url || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1 min-w-0 mr-2">
                                    <h3 className="font-bold text-gray-900 text-base line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">{item.shopName}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col gap-1">
                                    {item.discount && item.discount > 0 && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-400 line-through">
                                          {item.price.toLocaleString()}đ
                                        </span>
                                        <Badge className="bg-red-500 text-white text-xs px-2 py-0">
                                          -{item.discount}%
                                        </Badge>
                                      </div>
                                    )}
                                    <span className="text-lg font-bold text-yellow-600">
                                      {Math.round(finalPrice).toLocaleString()}đ
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                      className="w-8 h-8 rounded-full hover:bg-yellow-100"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                      className="w-8 h-8 rounded-full hover:bg-yellow-100"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                <CardTitle className="text-xl font-bold text-gray-900">Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Tạm tính</span>
                    <span className="font-semibold">{totalPrice.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold">{shippingFee.toLocaleString()}đ</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-yellow-600">{finalTotal.toLocaleString()}đ</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-6 text-base font-semibold shadow-lg"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Thanh toán
                    </>
                  )}
                </Button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 text-center">🎉 Miễn phí vận chuyển cho đơn hàng trên 100.000đ</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}