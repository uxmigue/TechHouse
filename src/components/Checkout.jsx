import { useContext, useState } from "react";
import { CartContext} from "../contexts/CartContext"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const initialValues = {
    name:"",
    surname:"",
    phone:"",
    email:"",
    email2:"",
};

export const Checkout = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const { items, reset, removeItem } = useContext(CartContext);    

    const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

    const controladorDeCambios = (ev) => {
        setBuyer(prev => {
            return {...prev, [ev.target.name]: ev.target.value }
        });
    };

    const validate = () => {
        const errors = {};
        if (!buyer.name) {
            errors.name = 'El nombre es obligatorio.';
            alert('El nombre es obligatorio.');
        }
        
        if (!buyer.surname) {
            errors.name = 'El apellido es obligatorio.';
            alert('El apellido es obligatorio.');
        }
    
        if (!buyer.phone) {
            errors.name = 'El teléfono es obligatorio.';
            alert('El teléfono es obligatorio.');
        }
    
        if (!buyer.email) {
            errors.name = 'El email es obligatorio.';
            alert('El email es obligatorio.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) {
            errors.email = 'El email no tiene un formato válido.';
            alert('El email no tiene un formato válido.')
        }
    
        if (!buyer.email2) {
            errors.name = 'Debes repetir el email.';
            alert('Debes repetir el email.');
        } else if (buyer.email2 !== buyer.email) {
            errors.name = 'Los emails deben coincidir.'
            alert('Los emails deben coincidir.');
        }
        setBuyer({ ...buyer, errors });

        return Object.keys(errors).length === 0;
    }
    

    const enviarOrden = () => {
        if (validate()) {
            const order = {
                buyer,
                items,
                total
            };
    
            const db = getFirestore()
            const orderCollection = collection(db, "orders");
    
            addDoc(orderCollection, order).then(({id}) => {
                if(id) {
                    alert("¡Tu pedido "+id+" se realizó con éxito!")
                }
            });
            reset();
        } else {
          alert('Hay errores en el formulario.');
        }
      };
    
    return(
        <Container className="my-4">
            <div className="d-flex flex-wrap">
            <h1 className="me-3">Carrito de compras | Checkout</h1>
            <Button onClick={() => reset()}>Reset</Button>
            </div>
            {items?.map((i) => (
                <Card className="w-50 my-3" key={i.id}>
                    <Card.Img variant="top" src={i.image} className="w-75"/>
                    <Card.Body>
                    <Card.Title>{i.title}</Card.Title>
                    <Card.Text>{i.description}</Card.Text>
                    <Card.Text className="fw-bold text-primary">{i.categoryId}</Card.Text>
                    <Card.Text className="fw-bold"> Cantidad: {i.quantity}</Card.Text>
                    <Card.Text className="fw-bold">${i.price}</Card.Text>
                    <Button onClick={() => removeItem(i.id)}>Eliminar producto</Button>
                    </Card.Body>
                </Card>
            ))}
            <Card.Text className="fw-bold text-primary">Total: ${total}</Card.Text>
            <hr />
            {!!items.length &&
            <Container>
                <h2 className="mb-3">Formulario de compra</h2>
                <form className="mb-3">
                    <div className="mb-3">
                        <label>Nombre</label><br/>
                        <input value={buyer.name} onChange={controladorDeCambios} name="name" type="text" className="rounded"/>
                    </div>
                    <div className="mb-3">
                        <label>Apellido</label><br/>
                        <input value={buyer.surname} onChange={controladorDeCambios} name="surname" type="text" className="rounded"/>
                    </div>
                    <div className="mb-3">
                        <label>Teléfono</label><br/>
                        <input value={buyer.phone} onChange={controladorDeCambios} name="phone" type="number" className="rounded"/>
                    </div>
                    <div className="mb-3">
                        <label>E-Mail</label><br/>
                        <input value={buyer.email} onChange={controladorDeCambios} name="email" type="email" className="rounded"/>
                    </div>
                    <div className="mb-3">
                        <label>Repetir E-mail</label><br/>
                        <input value={buyer.email2} onChange={controladorDeCambios} name="email2" type="email" className="rounded"/>
                    </div>
                </form>
                <Button type="button" onClick={enviarOrden}>Comprar</Button>
            </Container>}
        </Container>
    )
}