import React from 'react';
import Container from 'react-bootstrap/Container';

function ErrorPage() {
  return (
    <Container className="mt-4">
      <h1>¡Producto no encontrado!</h1>
      <p>El producto que intentas ver no existe en nuestra base de datos.</p>
    </Container>
  );
}

export default ErrorPage;