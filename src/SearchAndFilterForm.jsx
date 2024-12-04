import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

function SearchAndFilterForm() {
  return (
    <FormContainer>
      <Form>
        <label htmlFor="nome">Pesquisar:</label>
        <Input type="text" id="nome" placeholder="Digite o nome" />
        <Button type="submit">Pesquisar</Button>
      </Form>
    </FormContainer>
  );
}

export default SearchAndFilterForm;
