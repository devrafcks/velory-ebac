import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1e1e1e; // Fundo escuro ePlay
  padding: 64px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  border-top: 1px solid #333;
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
  margin-bottom: 32px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 80px;

  a {
    background-color: #10ac84; 
    color: #1e1e1e; 
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 18px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(16, 172, 132, 0.4);
      background-color: #fff;
    }
  }
`;

const Disclaimer = styled.p`
  max-width: 520px;
  text-align: center;
  font-size: 11px;
  line-height: 1.6;
  color: #fff;
  opacity: 0.6;
  padding: 0 20px;
`;

const Copyright = styled.div`
  margin-top: 40px;
  font-size: 10px;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Logo src="/velory.png" alt="VELORY" />
      
      <SocialLinks>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
      </SocialLinks>
      
      <Disclaimer>
        A Velory é uma plataforma para divulgação de estabelecimentos. A responsabilidade pela entrega e qualidade dos produtos é integralmente do estabelecimento contratado.
      </Disclaimer>

      <Copyright>
        © {currentYear} Velory - Todos os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
}