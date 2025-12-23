import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { toggleCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  padding: 24px 0;
  display: flex;
  justify-content: center;
`;

const NavCard = styled.div`
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
  height: 40px;
`;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  span {
    color: #ccc;
    font-weight: normal;
  }

  &::after {
    content: '🛒';
    margin-left: 4px;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  
  return (
    <HeaderContainer>
      <NavCard>
        <Link to="/"><Logo src="/public/velory.png" alt="Velory Logo" /></Link>
        <CartInfo onClick={() => dispatch(toggleCart())}>
          {items.length} - produto(s) <span>no carrinho</span>
        </CartInfo>
      </NavCard>
    </HeaderContainer>
  );
}