import OrdersItem, { OrdersItemProps } from './OrdersItem'
import { Table } from 'react-bootstrap'
import { OrderDto } from '../../api'

const Orders = (props: OrdersProps) => {
  return (
    <Table striped bordered responsive hover variant='dark'>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>TYPE</th>
        <th>Amount</th>
        <th>Token</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {props.orders.map(order => <OrdersItem id={order.id} type={order.type} amount={order.amount} token={order.token}
                                       price={order.price} key={order.id} handleSuccess={props.handleSuccess} />)}
      </tbody>
    </Table>
  )
}
export interface OrdersProps {
  orders: OrderDto[]
  setOrders: any
  handleSuccess: (id: string) => void
}

export default Orders