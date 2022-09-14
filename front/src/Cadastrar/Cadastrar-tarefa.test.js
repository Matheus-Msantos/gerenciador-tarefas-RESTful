import React from "react";
import { render, fireEvent } from '@testing-library/react';
import CadastrarTarefa from "./Cadastrar-tarefa";
import '@testing-library/jest-dom/extend-expect';


describe('Teste de cadastro de tarefas', () => {

  test('Deve rendenrizar sem erros', () => {
    render(<CadastrarTarefa />);
  });

  it('Deve cadastrar uma nova tarefa', () => {
    const { getByTestId } = render(<CadastrarTarefa />);
    fireEvent.change(getByTestId('text-tarefa'), { target: { value: 'Testar Tarefa' } });
    fireEvent.click(getByTestId('btn-cadastrar'));
    expect(getByTestId('modal')).toHaveTextContent('Sucesso');
    expect(getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso!');
  })
});