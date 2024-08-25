import { useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { CartContext } from '../contexts/CartContext';
import { ItemQuantitySelector } from './ItemQuantitySelector';

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const [carga, setCarga] = useState(true);

  const {addItem} = useContext(CartContext);

  const { id } = useParams();

  useEffect(() =>{
    const db = getFirestore();

    const refDoc = doc(db, "items", id)

    getDoc(refDoc).then((snapshot) => {
      setProducto({id: snapshot.id, ...snapshot.data()});
    })
      .finally(() => setCarga(false));
  }, [id]);

  const addItemButton = (count) => {
    addItem({...producto, quantity: count})
  };

  if (carga) return <Container><h1 className="mt-4">Cargando...</h1></Container>;

  return(
    <Container className="mt-4">
      <h1>Producto</h1>
      <Card className="w-50">
        <Card.Img variant="top" src={producto.image} className="w-75"/>
        <Card.Body>
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text>{producto.description}</Card.Text>
          <Card.Text className="fw-bold text-primary">{producto.categoryId}</Card.Text>
          <Card.Text className="fw-bold">${producto.price}</Card.Text>
          <ItemQuantitySelector stock ={producto.stock} addItemButton={addItemButton}/>
        </Card.Body>
      </Card>
    </Container>
  )
}


export default ItemDetailContainer