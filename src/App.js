import React, { Suspense, useContext, useEffect } from 'react'
import { TopBarContainer } from 'containers/TopBar'
import { Router } from '@reach/router'
import { CartContext } from 'context/CartContext'
import { list as getDiscountsByBrand } from '@core/providers/Discounts'
import CircularProgress from '@material-ui/core/CircularProgress'
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
      const discounts = await getDiscountsByBrand()
      updateDiscountsByBrand(discounts)
    }

    // Load discounts by brand
    fetchDiscounts()
  }, [])

  console.log('products!!!', products)
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
