import React, { Suspense } from 'react'
import { TopBarContainer } from 'containers/TopBar'
import { Router } from '@reach/router'
import { GlobalState } from 'context/GlobalState'
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
  return (
    <div className='App'>
      <GlobalState>
        <TopBarContainer />
        <Suspense fallback={<div>cargando....</div>}>
          <Router>
            <ProductsPage path='/' />
            <ShoppingCartPage path='/carro' />
          </Router>
        </Suspense>
      </GlobalState>
    </div>
  )
}

export default App
