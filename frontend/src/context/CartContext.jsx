import { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'
import api from '@/utils/api'

const CartContext = createContext()

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: action.payload.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id)
      let newItems
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product._id === action.payload.product._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        newItems = [...state.items, action.payload]
      }
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.product._id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: filteredItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { isAuthenticated, user } = useAuth()

  // Load cart from server when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart()
    } else {
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [isAuthenticated, user])

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const res = await api.get('/users/cart')
      dispatch({ type: 'SET_CART', payload: res.data.cart })
    } catch (error) {
      // Error loading cart
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return { success: false }
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const res = await api.post('/users/cart', { productId, quantity })
      
      // Update local state with the response
      dispatch({ type: 'SET_CART', payload: res.data.cart })
      toast.success('Item added to cart!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart'
      toast.error(message)
      return { success: false, message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return { success: false }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const res = await api.put(`/users/cart/${productId}`, { quantity })
      
      dispatch({ type: 'SET_CART', payload: res.data.cart })
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update quantity'
      toast.error(message)
      return { success: false, message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return { success: false }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const res = await api.delete(`/users/cart/${productId}`)
      
      dispatch({ type: 'SET_CART', payload: res.data.cart })
      toast.success('Item removed from cart')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item'
      toast.error(message)
      return { success: false, message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearCart = async () => {
    if (!isAuthenticated) return { success: false }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await api.delete('/users/cart')
      dispatch({ type: 'CLEAR_CART' })
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart'
      toast.error(message)
      return { success: false, message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}