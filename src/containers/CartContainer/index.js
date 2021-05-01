import React, { Fragment, useContext } from 'react'
import { CartContext } from 'context/CartContext'
import { Cart } from 'components/Cart'
export const CartContainer = () => {
  const { products, discounts, removeProductFromCart } = useContext(CartContext)
  return (
    <Fragment>
      <Cart products={products} discounts={discounts} onRemoveProduct={removeProductFromCart} />
    </Fragment>
  )
}
