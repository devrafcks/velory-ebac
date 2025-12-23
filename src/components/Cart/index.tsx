import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { type RootState } from '../../store';
import { remove, toggleCart, clear } from '../../store/cartSlice';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); z-index: 2000;
`;

const Sidebar = styled.aside`
  background-color: #1e1e1e;
  position: fixed; top: 0; right: 0;
  max-width: 360px; width: 100%; height: 100%;
  padding: 32px 16px; z-index: 2001;
  display: flex; flex-direction: column;
  border-left: 2px solid #10ac84;
  color: #fff;
  overflow-y: auto;

  h3 { font-size: 16px; margin-bottom: 16px; font-weight: bold; color: #10ac84; }
  p { font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
  label { display: block; font-size: 14px; margin-bottom: 4px; font-weight: bold; }
  input { 
    width: 100%; padding: 8px; background: #2f2f2f; border: 1px solid #10ac84; 
    color: #fff; border-radius: 4px;
  }
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
`;

const ActionButton = styled.button`
  background-color: #10ac84; color: #fff; border: none;
  padding: 12px; width: 100%; font-weight: bold; cursor: pointer;
  margin-top: 16px; border-radius: 4px;
  &:hover { opacity: 0.8; }
  &:disabled { background-color: #333; cursor: not-allowed; }
`;

const BackButton = styled(ActionButton)`
  background-color: #333; margin-top: 8px;
`;

const CartItem = styled.li`
  display: flex; background: #2f2f2f; padding: 8px; margin-bottom: 16px;
  position: relative; border-radius: 4px;
  img { width: 80px; height: 80px; object-fit: cover; margin-right: 8px; }
  div { h4 { font-size: 16px; } span { color: #10ac84; display: block; margin-top: 8px; font-weight: bold; } }
  .remove-btn { position: absolute; bottom: 8px; right: 8px; cursor: pointer; background: none; border: none; font-size: 16px; }
`;

export default function Cart() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  
  const [step, setStep] = useState<'cart' | 'delivery' | 'payment' | 'success'>('cart');

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.preco, 0);

  const handleFinishOrder = () => {
    dispatch(clear());
    setStep('success');
  };

  const closeCart = () => {
    dispatch(toggleCart());
    setStep('cart');
  };

  return (
    <>
      <Overlay onClick={closeCart} />
      <Sidebar>
        
        {step === 'cart' && (
          <>
            <h3>Itens no Carrinho</h3>
            {items.length === 0 ? (
              <p>O seu carrinho está vazio.</p>
            ) : (
              <>
                <ul style={{ flex: 1, listStyle: 'none' }}>
                  {items.map(item => (
                    <CartItem key={item.id}>
                      <img src={item.foto} alt={item.nome} />
                      <div>
                        <h4>{item.nome}</h4>
                        <span>R$ {item.preco.toFixed(2)}</span>
                      </div>
                      <button className="remove-btn" onClick={() => dispatch(remove(item.id))}>🗑️</button>
                    </CartItem>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid #333', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Valor total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <ActionButton onClick={() => setStep('delivery')}>
                    Continuar com a entrega
                  </ActionButton>
                </div>
              </>
            )}
          </>
        )}

        {step === 'delivery' && (
          <>
            <h3>Entrega</h3>
            <FormGroup><label>Quem irá receber</label><input type="text" /></FormGroup>
            <FormGroup><label>Endereço</label><input type="text" /></FormGroup>
            <FormGroup><label>Cidade</label><input type="text" /></FormGroup>
            <Row>
              <FormGroup><label>CEP</label><input type="text" /></FormGroup>
              <FormGroup><label>Número</label><input type="text" /></FormGroup>
            </Row>
            <FormGroup><label>Complemento (opcional)</label><input type="text" /></FormGroup>
            <ActionButton onClick={() => setStep('payment')}>Continuar com o pagamento</ActionButton>
            <BackButton onClick={() => setStep('cart')}>Voltar para o carrinho</BackButton>
          </>
        )}

        {step === 'payment' && (
          <>
            <h3>Pagamento - Valor a pagar R$ {total.toFixed(2)}</h3>
            <FormGroup><label>Nome no cartão</label><input type="text" /></FormGroup>
            <Row style={{ gridTemplateColumns: '3fr 1fr' }}>
              <FormGroup><label>Número do cartão</label><input type="text" /></FormGroup>
              <FormGroup><label>CVV</label><input type="text" /></FormGroup>
            </Row>
            <Row>
              <FormGroup><label>Mês de vencimento</label><input type="text" /></FormGroup>
              <FormGroup><label>Ano de vencimento</label><input type="text" /></FormGroup>
            </Row>
            <ActionButton onClick={handleFinishOrder}>Finalizar pagamento</ActionButton>
            <BackButton onClick={() => setStep('delivery')}>Voltar para a edição de endereço</BackButton>
          </>
        )}

        {step === 'success' && (
          <>
            <h3>Pedido realizado - #001</h3>
            <p>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</p>
            <p>Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar.</p>
            <p>Esperamos que desfrute de uma agradável experiência gastronômica. Bom apetite!</p>
            <ActionButton onClick={closeCart}>Concluir</ActionButton>
          </>
        )}

      </Sidebar>
    </>
  );
}