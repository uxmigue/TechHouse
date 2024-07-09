import carritoDeCompra from "../assets/carritodecompra.svg"

function CartWidget() {
    return(
        <>
            <img src={carritoDeCompra} alt="Carrito de compra" class="ms-2"/>
            <div class="px-2 ms-2 bg-warning fw-bold rounded-circle">2</div>
        </>
    )
}

export default CartWidget