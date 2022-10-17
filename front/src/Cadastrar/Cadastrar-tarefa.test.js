import React from "react";
import { render, fireEvent } from '@testing-library/react';
import CadastrarTarefa from "./Cadastrar-tarefa";
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste de cadastro de tarefas', () => {

  it('Deve cadastrar uma nova tarefa', async () => {
    const { getByTestId, findByTestId } = render(<CadastrarTarefa />);
    fireEvent.change(getByTestId('text-tarefa'), { target: { value: 'Testar Tarefa' } });
    fireEvent.click(getByTestId('btn-cadastrar'));
    expect(await findByTestId('modal')).toHaveTextContent('Sucesso');
    expect(await findByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso!');
  })
});