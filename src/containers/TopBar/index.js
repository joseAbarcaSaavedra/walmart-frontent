import React, { useContext, Fragment } from 'react'
import { CartContext } from 'context/CartContext'
import { Header } from 'components/Header'

export const TopBarContainer = () => {
  const { totalProducts } = useContext(CartContext)

  return (
    <Fragment>
      <Header items={totalProducts} />
    </Fragment>
  )
}
