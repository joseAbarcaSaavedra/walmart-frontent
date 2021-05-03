import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CartContext } from 'context/CartContext'
import { list as getProductList } from '@core/providers/Products'

import {
  DiscountAlert,
  getSuggestedDiscountMessage,
  getAppliedDiscountMessage,
} from 'components/DiscountAlert'
import { ProductCard } from 'components/ProductCard'

import { ProductListContent } from './styles'

export const ProductListContainer = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [lastProductAdded, setLastProductAdded] = useState(null)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const {
    addProductToCart,
    suggestedDiscount,
    activeDiscount,
    discounts,
  } = useContext(CartContext)

  useEffect(() => {
    let msg = getSuggestedDiscountMessage({
      lastProductAdded,
      suggestedDiscount,
      discounts,
    })
    if (msg !== '') setMessage(msg)
  }, [suggestedDiscount, discounts, lastProductAdded])

  useEffect(() => {
    let msg = getAppliedDiscountMessage({
      activeDiscount,
      lastProductAdded,
      suggestedDiscount,
      discounts,
    })
    if (
      activeDiscount &&
      suggestedDiscount &&
      suggestedDiscount.priority < activeDiscount.priority
    ) {
      msg = msg.concat(
        getSuggestedDiscountMessage(
          {
            lastProductAdded,
            suggestedDiscount,
            discounts,
          },
          true
        )
      )
    }
    if (msg !== '') setMessage(msg)
  }, [activeDiscount, discounts, lastProductAdded])

  console.log('discounts', discounts)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const list = await getProductList()
        setProducts(list)
        setIsLoading(false)
        setError('')
      } catch (error) {
        setError('[UPS]: ¡Ocurrio un problema al obtener los productos!')
        setProducts([])
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const onAddProduct = (product) => {
    setLastProductAdded(product)
    addProductToCart(product)
  }
  return (
    <ProductListContent>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Grid container spacing={3}>
          {products.map((product, key) => (
            <Grid item xs={3} key={key}>
              <ProductCard
                data={product}
                onAddProduct={onAddProduct}
                suggestedDiscount={suggestedDiscount}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <DiscountAlert message={message} onClose={() => setMessage('')} />
    </ProductListContent>
  )
}
