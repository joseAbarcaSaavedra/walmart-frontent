import React, { Suspense, useContext, useEffect } from 'react'
import { TopBarContainer } from 'containers/TopBar'
import { Router } from '@reach/router'
import { CartContext } from 'context/CartContext'
import CircularProgress from '@material-ui/core/CircularProgress'

import { GET_REQUEST } from './providers/Api'
import './App.css'

const ProductsPage = React.lazy(() =>
  import('./pages/Products').then((module) => ({
    default: module.ProductsPage,
  }))
)
const CartPage = React.lazy(() =>
  import('./pages/Cart').then((module) => ({
    default: module.CartPage,
  }))
)

function App() {
  const { updateDiscountsByBrand, products } = useContext(CartContext)

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const { discounts } = await GET_REQUEST('/discounts')
        updateDiscountsByBrand(discounts)
      } catch (e) {
        console.log('[ERROR]onGetDiscounts', e)
      }
    }

    // Load discounts by brand
    fetchDiscounts()
  }, [])

  return (
    <div className='App'>
      <TopBarContainer />
      <Suspense fallback={<CircularProgress />}>
        <Router>
          <ProductsPage path='/' />
          <CartPage path='/carro' />
        </Router>
      </Suspense>
    </div>
  )
}

export default App
