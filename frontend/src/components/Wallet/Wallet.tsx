import { Card, Form } from 'react-bootstrap'
import CurrencyAmount from './CurrencyAmount'
import { TOKEN } from '../../types'

const Wallet = (props: any) => {
  return (
    <Card className='bg-dark text-white rounded-3 pb-3 ps-4 h-100'>
      <Card.Header>
        <h4>Funds</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            {[TOKEN.ETH, TOKEN.USDT, TOKEN.DVF].map(token => {
              return <CurrencyAmount token={token} amount={props.balances[token]} key={token} />
            })
            }
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export interface TokenAmount {
  token: TOKEN,
  amount: number
}

export default Wallet