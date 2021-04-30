import { createContext } from 'react'

export const CartContext = createContext({
  products: [],
  discounts: [],
  discountsByBrand: [],
  addProductToCart: (product) => {},
  removeProductToCart: (product) => {},
  updateDiscountsByBrand: (discountsByBrand) => {},
})
