import React from "react";
import ReactDOM from "react-dom";
import RemoverTarefa from "./remover-tarefa";
import Tarefa from '../Models/Tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de remoção de tarefa', () => {
  const nometarefa = 'Tarefa';
  const tarefa = new Tarefa(1, nometarefa, false);

  it('Redenrizar componente', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <RemoverTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false} />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Abrir modal', () => {
    const { getByTestId } = render(
      <RemoverTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nometarefa);
  });

  it('Remover uma tarefa', () => {
    localStorage['tarefas'] = JSON.stringify([tarefa]);
    const { getByTestId } = render(
      <RemoverTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('modal-btn-remover'));
    const tarefaDb = JSON.parse(localStorage['tarefas']);
    expect(tarefaDb.length).toBe(0);
  });
});