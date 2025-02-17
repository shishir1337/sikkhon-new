"use client"

import * as React from "react"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const cartItems = [
  { id: 1, name: "Introduction to React", price: 19.99 },
  { id: 2, name: "Advanced JavaScript Techniques", price: 29.99 },
  { id: 3, name: "CSS Mastery", price: 24.99 },
]

export function MiniCart() {
  const totalItems = cartItems.length
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Shopping Cart</span>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand-blue text-[10px] font-bold text-white flex items-center justify-center">
            {totalItems}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-8">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

