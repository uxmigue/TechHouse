import Container from 'react-bootstrap/Container';

function ItemListContainer({greeting}) {
    return(
        <Container>
          <h1 class="mt-4">{greeting}</h1>
        </Container>
    )
}

export default ItemListContainer