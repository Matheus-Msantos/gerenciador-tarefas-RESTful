import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import ListarTarefas from './Listar-tarefas';
import Tarefas from '../Models/Tarefa.model';
import '@testing-library/jest-dom/extend-expect';

describe('Teste de listagem de tarefas', () => {

  const tarefa1 = 'tarefa 1';
  const tarefa2 = 'tarefa 2';

  beforeEach(() => {
    localStorage['tarefas'] = JSON.stringify([
      new Tarefas(1, tarefa1, false),
      new Tarefas(2, tarefa2, false)
    ])
  })

  afterEach(() => {
    delete localStorage['tarefas'];
  })

  test('Deve rendenrizar sem erros', () => {
    render(<ListarTarefas />);
  });

  it('Redenrizar as 2 tarefas', () => {
    const { getByTestId } = render(<ListarTarefas />);
    const tabela = getByTestId('tabela');
    expect(tabela).toHaveTextContent(tarefa1);
    expect(tabela).toHaveTextContent(tarefa2);
  })

  it('Filtar tarefa', () => {
    const { getByTestId } = render(
      <ListarTarefas />
    );
    fireEvent.change(getByTestId('Inputsearch'), { target: { value: tarefa1 } });
    const tabela = getByTestId('tabela');
    expect(tabela).toHaveTextContent(tarefa1);
    expect(tabela).not.toHaveTextContent(tarefa2);
  })

})