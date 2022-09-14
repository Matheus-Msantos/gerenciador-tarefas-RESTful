import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AtualizarTarefa from './Atualizar-tarefa.js';
import Tarefas from '../Models/Tarefa.model';
import '@testing-library/jest-dom/extend-expect'

describe('Teste de autalização de tarefas', () => {
  const nomeTarefa = 'Tarefa';

  beforeEach(() => {
    localStorage['tarefas'] = JSON.stringify([
      new Tarefas(1, nomeTarefa, false),
    ])
  })

  test('Redenrizar sem erro', () => {
    render(<AtualizarTarefa id={1} />);
  });

  it('Exebir a modal', () => {
    const { getByTestId } = render(<AtualizarTarefa id={1} />);
    fireEvent.click(getByTestId('btn-atualizar'));
    expect(getByTestId('modal')).toHaveTextContent('Tarefa atualizada com sucesso!');
  });

  it('Atualizar uma tarefa', () => {
    const newTarefa = 'NewTarefa';
    const { getByTestId } = render(<AtualizarTarefa id={1} />);
    fireEvent.change(getByTestId('txt-tarefa'), { target: { value: newTarefa } });
    fireEvent.click(getByTestId('btn-atualizar'));
    const tarefaDb = JSON.parse(localStorage['tarefas']);
    expect(tarefaDb[0].nome).toBe(newTarefa);
  });

});