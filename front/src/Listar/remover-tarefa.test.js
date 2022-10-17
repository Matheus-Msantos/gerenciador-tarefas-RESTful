import React from "react";
import ReactDOM from "react-dom";
import RemoverTarefa from "./remover-tarefa";
import Tarefa from '../Models/Tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste do componente de remoção de tarefa', () => {
  const nometarefa = 'Tarefa';
  const tarefa = new Tarefa(1, nometarefa, false);

  it('Abrir modal', () => {
    const { getByTestId } = render(
      <RemoverTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nometarefa);
  });

  it('Remover uma tarefa', async () => {
    const { getByTestId, findByTestId } = render(
      <RemoverTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('modal-btn-remover'));
    await findByTestId('modal');
    expect(axiosMock.delete).toHaveBeenCalledTimes(1);
  });
});