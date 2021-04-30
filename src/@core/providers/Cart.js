import { list as discountsList } from '@core/providers/Discounts'
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
export const getProducts = () => {
  return [
    {
      id: 2,
      brand: 'Marca1',
      description: 'Microondas 120W',
      image: 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg',
      price: 40000,
    },
    {
      id: 3,
      brand: 'Marca1',
      description: 'Horno Gas Premium',
      image: 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg',
      price: 30000,
    },
    {
      id: 4,
      brand: 'Marca2',
      description: 'Refrigerador',
      image: 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg',
      price: 20000,
    },
    {
      id: 5,
      brand: 'Marca2',
      description: 'Cargador Smart Phone USB',
      image: 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg',
      price: 15000,
    },
    {
      id: 14,
      brand: 'Marca5',
      description: 'Extractor de jugo Nutrimenos',
      image: 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg',
      price: 80000,
    },

    /*   {
      id: 4,
      brand: 'Marca2',
      description: 'Refrigerador',
      image: 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg',
      price: 80000,
    }, */
  ]
}

export const getSummary = async () => {
  try {
    const products = getProducts()
    const discountsGroupedByBrand = await cartProductDiscountGroupedByBrand(
      products
    )

    // CART USE
    const activeDiscount = getBestBrandActiveDiscount(discountsGroupedByBrand)

    // PRODUCTS USE
    const suggestedBrand = getSuggestedBrandDiscount(
      discountsGroupedByBrand,
      activeDiscount ? activeDiscount.priority : MAX_SAFE_INTEGER
    )

    console.log('suggestedBrand', suggestedBrand)

    return Promise.resolve({
      products,
      discounts: [discountsGroupedByBrand], // TODO - add more discounts
    })
  } catch (e) {
    return Promise.reject(e)
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
  console.log('activeDiscountPiority', activeDiscountPiority)

  const sortedDiscounts = discountsByBrand
    .filter((d) => d.priority < activeDiscountPiority)
    .sort((a, b) => a.priority - b.priority)

  return sortedDiscounts && sortedDiscounts.length > 0
    ? sortedDiscounts.shift()
    : null
}

/**
 *
 */
const cartProductDiscountGroupedByBrand = async (products = []) => {
  try {
    const brandDiscountSummary = {}
    const brandDiscounts = []

    const discountsByBrand = await discountsList()
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
      brandDiscountSummary[brand].products.push(product)

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
