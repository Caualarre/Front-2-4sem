import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #333;
  font-size: 1rem;
  padding: 1rem 0;
  position: relative;
  left: 0;
  bottom: 0;
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2024 TCC - Todos os direitos reservados</p>
    </FooterContainer>
  );
}

export default Footer;
