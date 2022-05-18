import Wallet from '../components/Wallet/Wallet'
import { Col, Container, Row } from 'react-bootstrap'
import Orders from '../components/Orders/Orders'
import Order from '../components/Order'
import { useEffect, useState } from 'react'
import { OrdersItemProps } from '../components/Orders/OrdersItem'
import { ORDER_TYPE, TOKEN } from '../types'
import API, { OrderDto } from '../api'

const TradeView = () => {
  const [balances, setBalances] = useState({ [TOKEN.USDT]: 0, [TOKEN.ETH]: 0, [TOKEN.DVF]: 0 })
  const [isLoading, setLoading] = useState(false)
  const [token, setToken] = useState(TOKEN.ETH)
  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState(1)
  const [type, setType] = useState(ORDER_TYPE.BUY)
  const [orders, setOrders] = useState([] as OrderDto[])

  const handleCancelOrder = (id: string) => {
    const order = orders.find(o => o.id === id)

    if (order?.type === ORDER_TYPE.SELL) {
      const { USDT, DVF, ETH } = balances
      const newBalances = { USDT, DVF, ETH }
      newBalances[order.token] += order.amount
      setBalances(newBalances)
    }

    const newOrders = orders.filter(order => order.id !== id)
    setOrders(newOrders)
  }

  useEffect(() => {
    (async () => {
      // TODO: improvement with promise.all
      if (isLoading) {
        try {
          await API.placeOrder({ token, amount, type, price })
          setLoading(false)
          const balances = await API.getBalances()
          setBalances(balances)
          const orders = await API.getOrders()
          setOrders(orders)
        } catch (err) {
          setLoading(false)
          console.error('Insufficient funds')
        }
      }
    })()
  }, [isLoading])

  return (
    <>
      <Container>
        <Row>
          <Col><Wallet balances={balances} setBalances={setBalances} /></Col>
          <Col><Order isLoading={isLoading} setLoading={setLoading} token={token} setToken={setToken} amount={amount}
                      setAmount={setAmount} price={price} setPrice={setPrice} type={type} setType={setType}
                      balances={balances} setBalances={setBalances} /></Col>
        </Row>
        <br />
        <Row>
          <Orders orders={orders} setOrders={setOrders} handleSuccess={handleCancelOrder} />
        </Row>
      </Container>
    </>
  )
}

export default TradeView