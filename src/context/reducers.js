export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const UPDATE_DISCOUNTS_BY_BRAND = 'UPDATE_DISCOUNTS_BY_BRAND'
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
const addProductToCart = (product, state) => {
  try {
    const { products } = state
    // add to cart product list
    products.push(product)

    // Update cart discounts
    const {
      discounts,
      suggestedDiscount,
      activeDiscount,
    } = discountsByProductsInCart(products, state)

    // Update amounts
    const subTotalValue = state.subTotalValue + product.price

    const totalDiscounts = activeDiscount ? activeDiscount.discount.discount : 0
    const totalValue = subTotalValue - totalDiscounts

    const newState = {
      ...state,
      products,
      discounts,
      subTotalValue,
      totalDiscounts,
      totalValue,
      totalProducts: products.length,
      suggestedDiscount,
      activeDiscount,
    }


    return newState
  } catch (e) {
    console.log('error', e)
    return state
  }
}

const removeProductFromCart = (product, state) => {
  try {
    const { products, totalProducts } = state
    if (totalProducts > 0) {
      const productIndex = products.findIndex((i) => i.id === product.id)

      // remove from cart product list
      products.splice(productIndex, 1)

      // Update cart discounts
      const {
        discounts,
        suggestedDiscount,
        activeDiscount,
      } = discountsByProductsInCart(products, state)

      // Update amounts
      const subTotalValue = state.subTotalValue - product.price
      const totalDiscounts = activeDiscount
        ? activeDiscount.discount.discount
        : 0
      const totalValue = subTotalValue - totalDiscounts

      const newState = {
        ...state,
        products,
        discounts,
        subTotalValue,
        totalDiscounts,
        totalValue,
        totalProducts: products.length,
        suggestedDiscount,
        activeDiscount,
      }

      return newState
    } else {
      return state
    }
  } catch (e) {
    console.log('error', e)
    return state
  }
}

/**
 * Check all brand discount available based on cart content
 */

const discountsByProductsInCart = (products = [], state) => {
  try {
    const { discountsByBrand } = state
    const discounts = cartProductDiscountGroupedByBrand(
      products,
      discountsByBrand
    )

    // CART USE
    const activeDiscount = getBestBrandActiveDiscount(discounts)

    // PRODUCTS USE
    const suggestedDiscount = getSuggestedBrandDiscount(
      discounts,
      activeDiscount ? activeDiscount.priority : MAX_SAFE_INTEGER
    )

    return { discounts, activeDiscount, suggestedDiscount }
  } catch (e) {
    console.log('error', e)
    return { discounts: [], activeDiscount: null, suggestedDiscount: null }
  }
}

/**
 *
 */
const getBestBrandActiveDiscount = (discountsByBrand = []) => {
  const sortedDiscounts = discountsByBrand
    .filter((d) => d.thresholdDiff >= 0)
    .sort((a, b) => a.priority - b.priority)
  return sortedDiscounts && sortedDiscounts.length > 0
    ? sortedDiscounts.shift()
    : null
}

const getSuggestedBrandDiscount = (
  discountsByBrand = [],
  activeDiscountPiority = MAX_SAFE_INTEGER
) => {
  const sortedDiscounts = discountsByBrand
    .filter((d) => d.priority < activeDiscountPiority)
    .sort((a, b) => a.priority - b.priority)

  return sortedDiscounts && sortedDiscounts.length > 0
    ? sortedDiscounts.shift()
    : null
}

const updateDiscountsByBrand = (discountsByBrand, state) => {
  try {
    return { ...state, discountsByBrand }
  } catch (e) {
    console.log('error!', e)
    return state
  }
}

/**
 *
 */
const cartProductDiscountGroupedByBrand = (
  products = [],
  discountsByBrand = []
) => {
  try {
    const brandDiscountSummary = {}
    const brandDiscounts = []

    products.forEach((product) => {
      const brand = product.brand.toLowerCase()

      const brandDiscount = brandDiscountSummary[brand]
        ? brandDiscountSummary[brand].discount
        : discountsByBrand.find((d) => d.brand.toLowerCase() === brand)

      // Brand Discount Summary
      brandDiscountSummary[brand] = brandDiscountSummary[brand] || {
        idx: brandDiscounts.length,
        discount: brandDiscount,
        products: [],
        priority: discountsByBrand.indexOf(brandDiscount), // Discount order sorted by mayor value key
        totalAmount: 0,
        thresholdDiff: 0,
      }

      // Add product to products array
      brandDiscountSummary[brand].products.push(product) // TODO - Group same products

      // add product amount
      brandDiscountSummary[brand].totalAmount += product.price

      // calc total product amount - threshold diff
      brandDiscountSummary[brand].thresholdDiff =
        brandDiscountSummary[brand].totalAmount -
        brandDiscountSummary[brand].discount.threshold

      // Add to brand discounts list
      if (brandDiscounts.length === brandDiscountSummary[brand].idx)
        brandDiscounts.push(brandDiscountSummary[brand])
      // Update into brand discount list
      else
        brandDiscounts.slice(
          brandDiscountSummary[brand].idx,
          0,
          brandDiscountSummary[brand]
        )
    })
    return brandDiscounts
  } catch (e) {
    console.log('[cartProductDiscountGroupedByBrand] error', e)
    return {}
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
