import React, { Fragment, useContext } from 'react'
import { CartContext } from 'context/CartContext'
import { Cart } from 'components/Cart'
import Button from '@material-ui/core/Button'
import { ButtonContainer } from './styles'
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
      <ButtonContainer>
        {totalProducts > 0 && (
          <Button variant='contained' color='primary'>
            COMPRAR
          </Button>
        )}
      </ButtonContainer>
    </Fragment>
  )
}
