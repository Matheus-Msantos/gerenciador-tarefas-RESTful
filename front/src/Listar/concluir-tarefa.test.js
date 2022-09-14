import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent } from "@testing-library/react"
import Tarefas from '../Models/Tarefa.model';
import ConcluirTarefa from './concluir-tarefa'
import '@testing-library/jest-dom/extend-expect'
import Tarefa from "../Models/Tarefa.model";

describe('Teste do componente concluir tarefa', () => {

  const nomeTarefa = 'Tarefa';
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it('Redenrizar componente', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <ConcluirTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false}
        className="teste" />, div);
    ReactDom.unmountComponentAtNode(div);
  });

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

  it('Concluir tarefa', () => {
    localStorage['tarefas'] = JSON.stringify([tarefa]);
    const { getByTestId } = render(
      <ConcluirTarefa
        tarefas={tarefa}
        recarregarTarefas={() => false}
        className="teste" />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('modal-btn-concluir'));
    const tarefaDb = JSON.parse(localStorage['tarefas']);
    //toBeTruthy verifica se é true
    expect(tarefaDb[0].concluida).toBeTruthy();

  });
});