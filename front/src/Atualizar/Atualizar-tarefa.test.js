import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AtualizarTarefa from './Atualizar-tarefa.js';
import Tarefas from '../Models/Tarefa.model';
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios';

describe('Teste de autalização de tarefas', () => {
  const nomeTarefa = 'Tarefa';

  test('Redenrizar sem erro', () => {
    render(<AtualizarTarefa id={1} />);
  });

  it('Exebir a modal', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: { nome: 'Estudar React' } });

    const { findByTestId } = render(<AtualizarTarefa id={1} />);
    fireEvent.click(await findByTestId('btn-atualizar'));
    expect(await findByTestId('modal')).toHaveTextContent('Tarefa atualizada com sucesso!');
  });

});