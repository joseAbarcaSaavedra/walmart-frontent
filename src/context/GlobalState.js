import React, { useReducer } from 'react'
import { CartContext } from './CartContex'
import { cartReducer, ADD_PRODUCT, REMOVE_PRODUCT } from './reducers'

export const GlobalState = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    products: [],
    discounts: [],
    discountsByBrand: [],
  })
  const { products, discounts, discountsByBrand } = cartState

  const addProductToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product })
  }
  const removeProductFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product })
  }
  const updateDiscountsByBrand = (discountsByBrand) => {
    dispatch({ type: REMOVE_PRODUCT, discountsByBrand })
  }

  return (
    <CartContext.Provider
      value={{
        products,
        discounts,
        discountsByBrand,
        addProductToCart,
        removeProductFromCart,
        updateDiscountsByBrand,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
