import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

export const ItemQuantitySelector = ({addItemButton, stock}) => {
    const [count, setCount] = useState(1)

    const aumentar = () => {
        if(count < stock){
            setCount ((prev) => prev + 1);
        }   
    };

    const reducir = () => {
        if(count > 1){
            setCount ((prev) => prev - 1);    
        }
    };

    const controlDeAgregados = () => {
        addItemButton(count);
        setCount(1);
    } 

    return (
        <Container>
            <Button className='me-2' onClick={reducir}>-</Button>
            <span>{count}</span>
            <Button className='ms-2'onClick={aumentar}>+</Button>
            <hr/>
            <Button onClick={controlDeAgregados}>Agregar al carrito</Button>
        </Container>
    )
}