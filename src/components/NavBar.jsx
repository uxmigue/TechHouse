import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from './CartWidget';
import NavDropdown from 'react-bootstrap/NavDropdown';
import lupa from "../assets/lupa.svg"

function NavBar(){
    return(
        <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#">TechHouse</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <NavDropdown title="Categorías" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Celulares</NavDropdown.Item>
              <NavDropdown.Item href="#action4">TV y Audio</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Electrodomésticos</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Videojuegos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action2">Ofertas</Nav.Link>
            <Nav.Link href="#action3">Lanzamientos</Nav.Link>
            <Nav.Link href="#action4">Ayuda</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="¿Qué producto buscas?"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-warning"><img src={lupa} alt="Buscar"/></Button>
          </Form>
        </Navbar.Collapse>
        <CartWidget/>
      </Container>
    </Navbar>
    )
}

export default NavBar