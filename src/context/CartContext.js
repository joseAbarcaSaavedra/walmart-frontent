import { createContext } from 'react'

export const CartContext = createContext({
  products: [],
  totalProducts: 0,
  discounts: [],
  discountsByBrand: [],
  suggestedBrand: null,
  addProductToCart: (product) => {},
  removeProductToCart: (product) => {},
  updateDiscountsByBrand: (discountsByBrand) => {},
})
