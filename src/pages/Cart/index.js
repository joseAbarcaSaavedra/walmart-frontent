import React from 'react'
import { Link } from '@reach/router'
import { CartContainer } from 'containers/CartContainer'
export const CartPage = () => {
  return (
    <div>
      <h1>Carro de compras</h1>
      <Link to='/'>Seguir comprando</Link>
      <CartContainer />
    </div>
  )
}
