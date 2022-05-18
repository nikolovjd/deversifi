import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { TOKEN } from '../types'

const OrderView = (props: any) => {
  const handleClick = () => props.setLoading(true)

  return (
    <Card className='bg-dark text-white rounded-3 pb-3 h-100'>
      <Card.Header>
        <h4>Order</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Row className='m-3'>
              <Col className='col-md-3' style={{ textAlign: 'right' }}> <Form.Label>Amount</Form.Label></Col>
              <Col className='col-md-3'> <Form.Control type='number' min='1' step='any' placeholder='0' value={props.amount}
                                                       onChange={e => props.setAmount(Math.max(Number(e.target.value), 1))} /></Col>
              <Col className='col-md-3'>
                <Form.Select aria-label='Default select example' onChange={e => props.setToken(e.target.value as TOKEN)}
                             value={props.token}>
                  <option value='ETH'>ETH</option>
                  <option value='USDT'>USDT</option>
                  <option value='DVF'>DVF</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='m-3'>
              <Col className='col-md-3' style={{ textAlign: 'right' }}> <Form.Label>Price</Form.Label></Col>
              <Col className='col-md-3'> <Form.Control type='number' min='1' step='any' placeholder='0' value={props.price}
                                                       onChange={e => props.setPrice(Math.max(Number(e.target.value), 1))} /></Col>
              <Col className='col-md-3'>
                <Form.Select aria-label='Default select example' disabled>
                  <option value='USD'>USD</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='m-3'>
              <Col className='col-md-3' style={{ textAlign: 'right' }}> <Form.Label>Type</Form.Label></Col>
              <Col className='col-md-3'>
                <Form.Select aria-label='Default select example' value={props.type} onChange={e => props.setType(e.target.value)}>
                  <option value='BUY'>BUY</option>
                  <option value='SELL'>SELL</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col>
                <Button variant='info' disabled={props.isLoading} onClick={handleClick}>
                  {props.isLoading ? 'Loading…' : 'Place Order'}
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default OrderView