import { Badge, Button } from 'react-bootstrap'
import { ORDER_TYPE, TOKEN } from '../../types'
import API from '../../api'
import { useState } from 'react'

const OrdersItem = (props: OrdersItemProps) => {
  const { id, type, amount, token, price, handleSuccess } = props
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    if (!isLoading) {
      setIsLoading(true)
      await API.cancelOrder(id)
      setIsLoading(false)
      handleSuccess(id)
    }
  }

  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td><Badge bg={type === ORDER_TYPE.BUY ? 'success' : 'primary'}>{type}</Badge></td>
        <td><Badge bg='dark'>{amount}</Badge></td>
        <td><Badge bg='dark'>{token}</Badge></td>
        <td><Badge bg='dark'>{price}</Badge><Badge bg='dark'>USD</Badge></td>
        <td><Button size='sm' variant='danger' onClick={handleClick}
                    disabled={isLoading}>{isLoading ? 'Loading...' : 'Cancel'}</Button></td>
      </tr>
    </>
  )
}

export interface OrdersItemProps {
  id: string
  type: ORDER_TYPE
  amount: number
  token: TOKEN
  price: number
  handleSuccess: (id: string) => void
}

export default OrdersItem