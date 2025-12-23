import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';
import { mockRestaurantes } from '../../mocks/restaurantes';
import { type Restaurante, type CardapioItem } from '../../types';

const Banner = styled.div<{ img: string }>`
  height: 280px; width: 100%;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${props => props.img});
  background-size: cover; background-position: center;
  display: flex; align-items: flex-end; padding-bottom: 32px;
  .container { max-width: 1024px; margin: 0 auto; width: 100%; padding: 0 20px; color: #fff; }
`;

const MenuGrid = styled.div`
  max-width: 1024px; margin: 56px auto;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding: 0 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const CardPrato = styled.div`
  background: #1e1e1e; padding: 8px; border: 1px solid #333; cursor: pointer;
  img { width: 100%; height: 160px; object-fit: cover; }
  h3 { color: #10ac84; margin: 12px 0; }
  p { color: #ccc; font-size: 14px; margin-bottom: 12px; }
  button { width: 100%; background: #10ac84; color: #fff; border: none; padding: 8px; font-weight: bold; }
`;

export default function Perfil() {
  const { id } = useParams<{ id: string }>();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItem, setSelectedItem] = useState<CardapioItem | null>(null);

  useEffect(() => {
    const found = mockRestaurantes.find(r => r.id === Number(id));
    if (found) setRestaurante(found);
  }, [id]);

  if (!restaurante) return <div style={{background: '#0a0a0a', height: '100vh', color: '#fff'}}>Carregando...</div>;

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Header />
      <Banner img={restaurante.capa}>
        <div className="container">
          <p style={{ fontSize: '24px', opacity: 0.8 }}>{restaurante.tipo}</p>
          <h1 style={{ fontSize: '32px', fontWeight: 900 }}>{restaurante.titulo}</h1>
        </div>
      </Banner>
      <MenuGrid>
        {restaurante.cardapio.map((prato) => (
          <CardPrato key={prato.id} onClick={() => setSelectedItem(prato)}>
            <img src={prato.foto} alt={prato.nome} />
            <h3>{prato.nome}</h3>
            <p>{prato.descricao.substring(0, 90)}...</p>
            <button>Mais detalhes</button>
          </CardPrato>
        ))}
      </MenuGrid>
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <Footer />
    </div>
  );
}