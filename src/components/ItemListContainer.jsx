import { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import data from '../data/productos.json'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [carga, setCarga] = useState(true);

  const { id } = useParams();

  useEffect(() =>{
    new Promise((res, rej)=>{
      setTimeout(() => res(data), 2000);
    })
      .then((response) => {
        if(!id){
          setProductos(response);
        } else {
          const filtro = response.filter((i) => i.categoria === id);
          setProductos(filtro);
        }
      })
      .finally(() => setCarga(false));
  }, [id]);

  if (carga) return <Container><h1 class="mt-4">Cargando...</h1></Container>;

  if (productos.length === 0) return <Container><h1 class="mt-4">No hay productos, crAckk</h1></Container>;

  return(
    <Container className="mt-4">
      <h1>Productos</h1>
      <Container className="d-flex flex-wrap">
        {productos.map((i) => (
          <Card className="mx-2 mb-3" key={i.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={i.imagen} height={200}/>
          <Card.Body>
            <Card.Title className="fw-bold">{i.nombre}</Card.Title>
            <Card.Text>{i.descripcion}</Card.Text>
            <Card.Text className="fw-bold text-primary">{i.categoria}</Card.Text>
            <Card.Text className="fw-bold">${i.precio}</Card.Text>
            <Link to={`/item/${i.id}`}><Button variant="primary">Ver más</Button></Link>
          </Card.Body>
        </Card>
        ))}
      </Container>
    </Container>
  )
}

export default ItemListContainer

