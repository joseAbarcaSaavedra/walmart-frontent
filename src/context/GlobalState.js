import React, { useReducer } from 'react'
import { CartContext } from './CartContext'
import {
  cartReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_DISCOUNTS_BY_BRAND,
} from './reducers'

export const GlobalState = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    products: [],
    totalProducts: 0,
    discounts: [],
    discountsByBrand: [],
  })

  const { products, discounts, totalProducts, discountsByBrand } = cartState

  const addProductToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product })
  }
  const removeProductFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product })
  }
  const updateDiscountsByBrand = (discountsByBrand = []) => {
    dispatch({ type: UPDATE_DISCOUNTS_BY_BRAND, discountsByBrand })
  }

  return (
    <CartContext.Provider
      value={{
        products,
        totalProducts,
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
