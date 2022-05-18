import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from '../hooks/UseAuth'

const NavBar = () => {
  // @ts-ignore
  const { auth, logout } = useContext(authContext)

  return (
    <>
      <Navbar style={{ marginBottom: '10px' }} bg='dark' variant='dark' fixed='top' sticky='top'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand as={Link} to='/'>TradeApp</Navbar.Brand>
          </LinkContainer>
          {auth && auth.signature
            ?
            <>
              <Nav className='me-auto'>
                <LinkContainer to='/trade'>
                  <Nav.Link as={Link} to='/trade'>Trade</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/deposit'>
                  <Nav.Link as={Link} to='/deposit'>Deposit Funds</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav.Item className='justify-content-end'>
                <Button variant='danger' onClick={logout}>Logout</Button>
              </Nav.Item>
            </>
            : <LinkContainer to='/auth'>
              <Nav.Link className='btn btn-sm btn-info' as={Link} to='/auth'>Sign In</Nav.Link>
            </LinkContainer>
          }

        </Container>
      </Navbar>
    </>
  )
}

export default NavBar