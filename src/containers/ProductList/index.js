import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import { list as getProductList } from '@core/providers/Products'
import { getSummary as getCartSummary } from '@core/providers/Cart'

import { ProductCard } from 'components/ProductCard'
import { ProductListContent } from './styles'

export const ProductListContainer = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const list = await getProductList()
        setProducts(list)

        const cart = await getCartSummary()
        console.log('cart!!!', cart)

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
    console.log('onAddProduct')
  }
  /* console.log('products', products) */
  return (
    <ProductListContent>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Grid container spacing={3}>
          {products.map((product, key) => (
            <Grid item xs={3} key={key}>
              <ProductCard data={product} onAddProduct={onAddProduct} />
            </Grid>
          ))}
        </Grid>
      )}
    </ProductListContent>
  )
}
