import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import data from '../data/productos.json'

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const [carga, setCarga] = useState(true);

  const { id } = useParams();

  useEffect(() =>{
    new Promise((res, rej)=>{
      setTimeout(() => res(data), 2000);
    })
      .then((response) => {
        const obtenido = response.find((i) => i.id === Number(id));
        setProducto(obtenido);
      })
      .finally(() => setCarga(false));
  }, [id]);

  if (carga) return <Container><h1 class="mt-4">Cargando...</h1></Container>;

  return(
    <Container className="mt-4">
      <h1>Producto</h1>
      <Card>
        <Card.Img variant="top" src={producto.imagen} className="w-75"/>
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{producto.descripcion}</Card.Text>
          <Button variant="primary">Comprar ahora</Button>
        </Card.Body>
      </Card>
    </Container>
  )
}


export default ItemDetailContainer