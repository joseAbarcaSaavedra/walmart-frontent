import React, { useState, useEffect, useContext, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CartContext } from 'context/CartContext'
import { GET_REQUEST } from 'providers/Api'

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const productList = await GET_REQUEST('/products')
        setProducts(productList.products)
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
      {isLoading && (
        <Fragment>
          <p>Cargando...</p>
          <CircularProgress />
        </Fragment>
      )}
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
