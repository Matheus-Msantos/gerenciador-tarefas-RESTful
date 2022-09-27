import React, { useState } from "react";
import propTypes from 'prop-types';
import ConcluirTarefa from "./concluir-tarefa";
import RemoverTarefa from './remover-tarefa';
import { A } from "hookrouter";

function ItensListarTarefas(props) {

  const [marcada, setMarcada] = useState(false);

  const marcarConcluida = (tarefa) => {
    setMarcada(true)
  }

  return (
    props.tarefas.map(tarefa =>
      <div className="g-listar-tarefas-box" key={tarefa.id} data-testid="tarefa">

        <p className={tarefa.concluida ? "g-listar-tarefas-marcada" : 'g-listar-tarefas-nome'} data-testid="tarefa-nome">{tarefa.nome}</p>

        <div className="g-listar-tarefas-box-action">
          <ConcluirTarefa
            tarefas={tarefa}
            recarregarTarefas={props.recarregarTarefas}
            className={tarefa.concluida ? 'g-listar-tarefas-modal-hidde' : ''}
          />
        </div>

        <div className={tarefa.concluida ? 'g-listar-tarefas-btn--edit_none' : 'g-listar-tarefas-btn--edit'}>
          <A href={"/atualizar/" + tarefa.id}><i className="fa-solid fa-pencil"></i></A>
        </div>

        <div className="g-listar-tarefas-box-action">
          <RemoverTarefa
            tarefas={tarefa}
            recarregarTarefas={props.recarregarTarefas} />
        </div>
      </div>
    )
  );
}

ItensListarTarefas.propTypes = {
  tarefas: propTypes.array.isRequired,
  recarregarTarefas: propTypes.func.isRequired
}

export default ItensListarTarefas

