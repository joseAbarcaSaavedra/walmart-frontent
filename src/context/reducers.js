export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const UPDATE_DISCOUNTS_BY_BRAND = 'UPDATE_DISCOUNTS_BY_BRAND'
const addProductToCart = (product, state) => {
  try {
    const products = state.products
    // add to cart product list
    products.push(product)

    // TODO - update cart discounts
    const discounts = []

    return { ...state, products, discounts }
  } catch (e) {
    console.log('error', e)
    return state
  }
}

const removeProductFromCart = (product, state) => {
  try {
    const products = state.products
    const productIndex = products.findIndex((i) => i.id === product.id)

    // remove from cart product list
    products.splice(productIndex, 1)

    // TODO - update cart discounts
    const discounts = []
    return { ...state, products, discounts }
  } catch (e) {
    console.log('error', e)
    return state
  }
}

const updateDiscountsByBrand = (discountsByBrand, state) => {
  try {
    return { ...state, discountsByBrand }
  } catch (e) {
    console.log('error!', e)
    return state
  }
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state)
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.product, state)
    case UPDATE_DISCOUNTS_BY_BRAND:
      return updateDiscountsByBrand(action.discountsByBrand, state)
    default:
      return state
  }
}