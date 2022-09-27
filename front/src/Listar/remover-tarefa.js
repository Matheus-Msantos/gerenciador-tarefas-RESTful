import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RemoverTarefa(props) {

  const [modal, setModal] = useState(false)

  const abrirModal = () => {
    setModal(true);
  }

  const fecharModal = () => {
    setModal(false);
  }


  const removerTarefa = () => {
    const tarefasDb = localStorage['tarefas'];
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefas.id)
    localStorage['tarefas'] = JSON.stringify(tarefas);
    props.recarregarTarefas(true);
    abrirModal(false);
  }

  return (
    <div>
      <button onClick={() => abrirModal()} className="g-delete" data-testid="btn-abrir-modal">
        <i className="fa-solid fa-trash"></i>
      </button>

      <div className={`g-concluir-modal-overley ${modal ? 'g-concluir-modal-overley--active' : ''}`}></div>
      <div className={`g-concluir-modal-container ${modal ? 'g-concluir-modal-container--active' : ''}`} data-testid="modal">
        <div className="g-concluir-modal-header">
          <span>Remover tarefa</span>
          <button className="g-concluir-modal-header-btn" onClick={() => fecharModal()}><i className="fa-solid fa-x"></i></button>
        </div>
        <div className="g-concluir-modal-body">
          <span>Você realmente deseja Remover a seguinte tarefa?</span>
          <span className="g-concluir-modal-body--bold">{props.tarefas.nome}</span>
        </div>
        <div className="g-concluir-modal-footer">
          <button className="g-concluir-modal-btn-close" data-testid="modal-btn-fechar" onClick={fecharModal}>Não</button>
          <button className="g-concluir-modal-btn-success" onClick={() => removerTarefa()} data-testid="modal-btn-remover">Sim</button>
        </div>
      </div>
    </div>
  );
}

RemoverTarefa.propTypes = {
  tarefas: PropTypes.object.isRequired,
  recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefa;