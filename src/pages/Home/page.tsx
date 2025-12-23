import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Product from '../../components/Product';
import Cart from '../../components/Cart';
import { mockRestaurantes } from '../../mocks/restaurantes';
import type { Restaurante } from '../../types';
import Footer from '../../components/Footer';

const Hero = styled.div`
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/hero.jpg');
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  text-align: center;
  h2 { color: #fff; font-size: 36px; font-weight: 900; max-width: 600px; margin: 0 auto; line-height: 1.2; }
`;

const ListContainer = styled.div`
  max-width: 1024px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;
  padding: 0 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export default function Home() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    setRestaurantes(mockRestaurantes);
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Header />
      <Hero>
        <h2>Viva experiências gastronômicas no conforto de sua casa</h2>
      </Hero>
      <ListContainer>
        {restaurantes.map((res) => (
          <Product key={res.id} {...res} />
        ))}
      </ListContainer>
      <Cart />
      <Footer />
    </div>
  );
}