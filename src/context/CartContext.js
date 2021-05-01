import { createContext } from 'react'

export const CartContext = createContext({
  products: [],
  totalProducts: 0,
  discounts: [],
  discountsByBrand: [],
  suggestedBrand: null,
  activeDiscount: null, // TODO- implement!!
  addProductToCart: (product) => {},
  removeProductToCart: (product) => {},
  updateDiscountsByBrand: (discountsByBrand) => {},
})
