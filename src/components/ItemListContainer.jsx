import { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [carga, setCarga] = useState(true);

  const { id } = useParams();

  useEffect(() =>{
  const db = getFirestore();
  const refCollection = !id 
    ? collection(db, "items")
    : query(collection(db,"items"), where("categoryId", "==", id));

    getDocs(refCollection).then((snapshot) => {
      setProductos(
        snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
        })
      );
    })
    .finally(() => setCarga(false));
  }, [id]);

  if (carga) return <Container><h1 className="mt-4">Cargando...</h1></Container>;
  if (productos.length === 0) return <Container><h1 className="mt-4">No hay productos, crAckk</h1></Container>;
  
  return(
    <Container className="mt-4">
      <h1>Productos</h1>
      <Container className="d-flex flex-wrap">
        {productos.map((i) => (
          <Card className="mx-2 mb-3" key={i.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={i.image} height={200}/>
          <Card.Body>
            <Card.Title className="fw-bold">{i.title}</Card.Title>
            <Card.Text>{i.description}</Card.Text>
            <Card.Text className="fw-bold text-primary">{i.categoryId}</Card.Text>
            <Card.Text className="fw-bold">${i.price}</Card.Text>
            <Link to={`/item/${i.id}`}>
              <Button variant="primary">Ver más</Button>
            </Link>
          </Card.Body>
        </Card>
        ))}
      </Container>
    </Container>
  )
}

export default ItemListContainer

