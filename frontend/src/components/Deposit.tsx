import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import API from '../api'
import { TOKEN } from '../types'
import { useNavigate } from 'react-router-dom'

const Deposit = () => {
  const [isLoading, setLoading] = useState(false)
  const [token, setToken] = useState(TOKEN.ETH)
  const [amount, setAmount] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (isLoading) {
        await API.depositFunds({ token, amount: Number(amount) })
        setLoading(false)
        navigate('/trade')
      }
    })()
  }, [isLoading])

  const handleClick = () => setLoading(true)

  return (
    <Card className='bg-dark text-white rounded-3 pb-3 ps-4 h-100'>
      <Card.Header>
        <h4>Deposit</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Row>
              <Col className='col-md-3' style={{ textAlign: 'right' }}> <Form.Label>Amount</Form.Label></Col>
              <Col className='col-md-3'> <Form.Control type='number' min='1' step='any' placeholder='0' value={amount} onChange={e => setAmount(Math.max(Number(e.target.value), 1))} /></Col>
              <Col className='col-md-3'><Form.Select aria-label='Default select example' onChange={e => setToken(e.target.value as TOKEN)}>
                <option value='ETH'>ETH</option>
                <option value='USDT'>USDT</option>
                <option value='DVF'>DVF</option>
              </Form.Select></Col>
            </Row>
            <Row className='mt-5'>
              <Col>
                <Button variant='info' disabled={isLoading} onClick={handleClick}>
                  {isLoading ? 'Loading…' : 'Deposit'}
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Deposit