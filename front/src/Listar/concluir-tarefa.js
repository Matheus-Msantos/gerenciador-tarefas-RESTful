import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ConcluirTarefa(props) {

  const [modal, setModal] = useState(false)

  const abrirModal = () => {
    setModal(true);
  }

  const fecharModal = () => {
    setModal(false);
  }

  const conclurTarefa = () => {
    const tarefasDb = localStorage['tarefas'];
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas = tarefas.map(tarefa => {
      if (tarefa.id === props.tarefas.id) {
        tarefa.concluida = true;
      }
      return tarefa;
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
    setModal(false);
    props.recarregarTarefas(true);
  }

  return (
    <>
      <span className={props.className} onClick={() => abrirModal()} data-testid="btn-abrir-modal">
        concluir
      </span>

      <div className="g-concluir-modal-overley"></div>
      <div className={`g-concluir-modal-container ${modal ? 'g-concluir-modal-container' : ''}`} data-testid="modal">
        <div className="g-concluir-modal-header">
          <span>Concluir tarefa</span>
          <button className="g-concluir-modal-header-btn" onClick={() => fecharModal()}>X</button>
        </div>
        <div className="g-concluir-modal-body">
          <span>Você realmente deseja concluir a seguinye tarefa?</span>
          <span className="g-concluir-modal-body--bold">{props.tarefas.nome}</span>
        </div>
        <div className="g-concluir-modal-footer">
          <button className="g-concluir-modal-btn-success" onClick={() => conclurTarefa()} data-testid="modal-btn-concluir">Sim</button>
          <button className="g-concluir-modal-btn-close" data-testid="modal-btn-fechar">Não</button>
        </div>
      </div>
    </>
  );
}

ConcluirTarefa.propTypes = {
  tarefas: PropTypes.object.isRequired,
  recarregarTarefas: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

export default ConcluirTarefa;