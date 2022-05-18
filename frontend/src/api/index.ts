import axios from 'axios'
import { TokenAmount } from '../components/Wallet/Wallet'

const api = axios.create({
  baseURL: 'http://localhost:3005/api',
  timeout: 30000
})

const getAuthHeaders = () => {
  const signature = localStorage.getItem('signature')
  return ({
    headers: {
      Authorization: `Bearer ${signature}`
    }
  })
}

const API = {
  getBalances: async () => {
    const result = await api.get('/getBalances', getAuthHeaders())
    return result.data
  },
  depositFunds: async (data: TokenAmount) => {
    try {
      const result = await api.post('/deposit', data, getAuthHeaders())
      return result.data
    } catch (err) {
      console.log(err)
    }
  },
  getOrders: async () => {
    const result = await api.get('/getOrders', getAuthHeaders())
    return result.data
  },
  placeOrder: async (data: any) => {
    const result = await api.post('/placeOrder', data, getAuthHeaders())
    return result.data
  },
  cancelOrder: async(id: string) => {
    const result = await api.post(`/cancelOrder/${id}`, {}, getAuthHeaders())
    return result.data
  }
}

export default API