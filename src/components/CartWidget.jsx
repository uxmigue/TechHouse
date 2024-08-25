import { Link } from "react-router-dom"
import carritoDeCompra from "../assets/carritodecompra.svg"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import Badge from 'react-bootstrap/Badge';


function CartWidget() {
    const {items} = useContext(CartContext);

    return(
        <Link to="/checkout" className="d-flex">
            <img src={carritoDeCompra} alt="Carrito de compra" className="ms-2"/>
            <Badge bg="secondary mx-2">{items.reduce((total, item) => { return total + item.quantity },0)}</Badge>
        </Link>
    )
}

export default CartWidget