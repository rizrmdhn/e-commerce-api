/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const BuysController = () => import('#controllers/buys_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const CartsController = () => import('#controllers/carts_controller')
const ProductsController = () => import('#controllers/products_controller')

router.get('products', [ProductsController, 'index'])
router.get('products/:id', [ProductsController, 'show'])

router.post('/login', [AuthController, 'create'])
router.post('/user', [UsersController, 'store'])

router
  .group(() => {
    // cart routes
    router.get('carts', [CartsController, 'index'])
    router.post('carts', [CartsController, 'store'])
    router.put('carts/:id', [CartsController, 'edit'])
    router.delete('carts/:id', [CartsController, 'destroy'])

    // buy routes
    router.post('buys', [BuysController, 'store'])
    router.get('buys', [BuysController, 'index'])
  })
  .middleware(middleware.auth())
