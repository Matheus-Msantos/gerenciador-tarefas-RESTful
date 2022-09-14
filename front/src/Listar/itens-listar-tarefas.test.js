import React from "react";
import ReactDom from "react-dom";
import ItensListarTarefas from './itens-listar-tarefas';
import Tarefa from '../Models/Tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente que exibe um item na listagem de tarefas', () => {

  const nomeTarefa = 'Tarefa';
  const tarefa = new Tarefa(1, nomeTarefa, false);
  const tarefaConcluida = new Tarefa(2, nomeTarefa, true);

  it('Renderizar componente de itens sem erros', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <ItensListarTarefas
        tarefas={[]}
        recarregarTarefas={() => false} />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it('Exibir um tarefa', () => {
    const { getByTestId } = render(
      <ItensListarTarefas
        tarefas={[tarefa]}
        recarregarTarefas={() => false} />
    );
    expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa);
  });

  it('Exebir uma tarafa concluída', () => {
    const { getByTestId } = render(
      <ItensListarTarefas
        tarefas={[tarefaConcluida]}
        recarregarTarefas={() => false}
      />
    );
    expect(getByTestId('tarefa-nome')).toHaveClass('g-listar-tarefas-marcada');
  });
});