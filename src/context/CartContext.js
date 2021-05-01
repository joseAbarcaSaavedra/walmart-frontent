import { createContext } from 'react'

export const CartContext = createContext({
  products: [],
  totalProducts: 0,
  subTotalValue: 0,
  totalDiscounts: 0,
  totalValue: 0,
  discounts: [],
  discountsByBrand: [],
  suggestedDiscount: null,
  activeDiscount: null, // TODO- implement!!
  addProductToCart: (product) => {},
  removeProductToCart: (product) => {},
  updateDiscountsByBrand: (discountsByBrand) => {},
})
