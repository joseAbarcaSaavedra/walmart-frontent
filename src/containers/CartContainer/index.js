import React, { Fragment, useContext } from 'react'
import { CartContext } from 'context/CartContext'
import { Cart } from 'components/Cart'
export const CartContainer = () => {
  const {
    products,
    activeDiscount,
    removeProductFromCart,
    totalProducts,
    subTotalValue,
    totalDiscounts,
    totalValue,
  } = useContext(CartContext)

  const summary = { totalProducts, subTotalValue, totalDiscounts, totalValue }
  const discounts = []

  if (activeDiscount) discounts.push(activeDiscount) // TODO - add more discounts

  return (
    <Fragment>
      <Cart
        products={products}
        discounts={discounts}
        summary={summary}
        onRemoveProduct={removeProductFromCart}
      />
    </Fragment>
  )
}
