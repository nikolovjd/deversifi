import { Button, Card } from 'react-bootstrap'
import detectEthereumProvider from '@metamask/detect-provider'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '../hooks/UseAuth'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthView = () => {
  const [hasMetaMaskPlugin, setHasMetaMaskPlugin] = useState(false)
  // @ts-ignore
  const { login } = useContext(authContext)
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider()
      setHasMetaMaskPlugin(!!provider)
    })()
  }, [])

  const handleClick = () => {
    (async () => {
      // For simplicity and due to time constraints, only using the first account
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (!accounts.length) {
          // TODO:
        }
        const wallet = accounts[0]
        const signature = await window.ethereum.request({ method: 'personal_sign', params: ['auth', wallet] })
        await login({ wallet, signature })
        // @ts-ignore
        navigate(state?.path || '/trade')
      }
    })()
  }

  return (
    <Card className='bg-dark text-white rounded-3 pb-3 ps-4 h-100'>
      <Card.Body>
        {hasMetaMaskPlugin
          ? <Button size='sm' variant='success' onClick={handleClick}>Authenticate with MetaMask</Button>
          : <Card className='bg-dark text-white rounded-3' style={{ width: '50%', margin: 'auto' }}>
            <Card.Body>Please Install <a className='link-info'
                                         href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
                                         target='_blank' rel='noreferrer'>MetaMask</a> to use our trading app!</Card.Body>
          </Card>
        }
      </Card.Body>
    </Card>
  )
}
export default AuthView