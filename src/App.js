import React, { Suspense, useContext, useEffect } from 'react'
import { TopBarContainer } from 'containers/TopBar'
import { Router } from '@reach/router'
import { CartContext } from 'context/CartContext'
import { list as getDiscountsByBrand } from '@core/providers/Discounts'
import './App.css'

const ProductsPage = React.lazy(() =>
  import('./pages/Products').then((module) => ({
    default: module.ProductsPage,
  }))
)
const ShoppingCartPage = React.lazy(() =>
  import('./pages/ShoppingCart').then((module) => ({
    default: module.ShoppingCartPage,
  }))
)

function App() {
  const { updateDiscountsByBrand } = useContext(CartContext)

  useEffect(() => {
    async function fetchDiscounts() {
      const discounts = await getDiscountsByBrand()
      updateDiscountsByBrand(discounts)
    }

    // Load discounts by brand catalog
    fetchDiscounts()
  }, [])

  return (
    <div className='App'>
      <TopBarContainer />
      <Suspense fallback={<div>cargando....</div>}>
        <Router>
          <ProductsPage path='/' />
          <ShoppingCartPage path='/carro' />
        </Router>
      </Suspense>
    </div>
  )
}

export default App
