import { Col, Form, Row } from 'react-bootstrap'
import { TokenAmount } from './Wallet'

const CurrencyAmount = (props: TokenAmount) => {
  return (
    <>
      <Row className='mt-3'>
        <Col className='col-md-9'> <Form.Control type='number' disabled value={props.amount} /></Col>
        <Col className='col-md-3' style={{ textAlign: 'left' }}> <Form.Label>{props.token}</Form.Label></Col>
      </Row>
    </>
  )
}

export default CurrencyAmount