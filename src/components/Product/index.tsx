import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: #1e1e1e;
  border: 1px solid #10ac84;
  position: relative;
  color: #fff;
  img { width: 100%; height: 217px; object-fit: cover; }
`;

const Tag = styled.div`
  position: absolute; top: 16px; right: 16px;
  background-color: #10ac84; padding: 6px 10px; font-size: 12px; font-weight: bold;
`;

const Info = styled.div`
  padding: 16px;
  .header { display: flex; justify-content: space-between; margin-bottom: 16px; h3 { font-size: 18px; } }
  p { font-size: 14px; color: #ccc; margin-bottom: 16px; }
`;

const SaibaMais = styled(Link)`
  background: #10ac84; color: #fff; text-decoration: none; padding: 6px 12px; font-weight: bold;
`;

export default function Product(props: any) {
  return (
    <Card>
      <img src={props.capa} alt={props.titulo} />
      <Tag>{props.tipo}</Tag>
      <Info>
        <div className="header">
          <h3>{props.titulo}</h3>
          <span style={{color: '#10ac84'}}>{props.avaliacao} ★</span>
        </div>
        <p>{props.descricao.substring(0, 120)}...</p>
        <SaibaMais to={`/perfil/${props.id}`}>Saiba mais</SaibaMais>
      </Info>
    </Card>
  );
}