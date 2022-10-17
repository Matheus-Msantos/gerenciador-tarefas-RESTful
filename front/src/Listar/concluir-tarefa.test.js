import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent } from "@testing-library/react"
import Tarefas from '../Models/Tarefa.model';
import ConcluirTarefa from './concluir-tarefa'
import '@testing-library/jest-dom/extend-expect'
import Tarefa from "../Models/Tarefa.model";
import axiosMock from 'axios';

describe('Teste do componente concluir tarefa', () => {

  const nomeTarefa = 'Tarefa';
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it('Abrir modal', () => {
    const { getByTestId } = render(
      <ConcluirTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false}
        className="teste" />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
  });

  it('Concluir tarefa', async () => {
    const { getByTestId, findByTestId } = render(
      <ConcluirTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false}
        className="teste" />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('modal-btn-concluir'));
    await findByTestId('modal');
    expect(axiosMock.put).toHaveBeenCalledTimes(1);
  });
});