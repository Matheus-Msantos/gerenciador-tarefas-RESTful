import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListarTarefas from './Listar-tarefas';
import Tarefas from '../Models/Tarefa.model';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste de listagem de tarefas', () => {

  const tarefa1 = 'tarefa 1';
  const tarefa2 = 'tarefa 2';

  const listaTarefas = {
    totalItens: 2,
    tarefas: [
      new Tarefas(1, tarefa1, false),
      new Tarefas(2, tarefa2, false)
    ],
    pagina: '1'
  }


  it('Redenrizar as 2 tarefas', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: listaTarefas });
    const { findByTestId } = render(<ListarTarefas />);
    const tabela = await findByTestId('tabela');
    expect(tabela).toHaveTextContent(tarefa1);
    expect(tabela).toHaveTextContent(tarefa2);
  })

  it('Filtar tarefa', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: listaTarefas });
    axiosMock.get.mockResolvedValueOnce({
      data: {
        totalItens: 1,
        tarefas: [
          new Tarefas(1, tarefa1, false)
        ],
        pagina: '1'
      }
    });

    const { findByTestId } = render(
      <ListarTarefas />
    );
    fireEvent.change(await findByTestId('Inputsearch'), { target: { value: tarefa1 } });
    const tabela = await findByTestId('tabela');
    expect(tabela).toHaveTextContent(tarefa1);
    expect(tabela).not.toHaveTextContent(tarefa2);
  })

})