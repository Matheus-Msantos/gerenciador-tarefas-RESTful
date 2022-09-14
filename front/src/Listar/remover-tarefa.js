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
      <button onClick={() => abrirModal()} data-testid="btn-abrir-modal">
        Excluir
      </button>

      <div className="g-concluir-modal-overley"></div>
      <div className={`g-concluir-modal-container ${modal ? 'g-concluir-modal-container' : ''}`} data-testid="modal">
        <div className="g-concluir-modal-header">
          <span>Remover tarefa</span>
          <button className="g-concluir-modal-header-btn" onClick={() => fecharModal()}>X</button>
        </div>
        <div className="g-concluir-modal-body">
          <span>Você realmente deseja Remover a seguinte tarefa?</span>
          <span className="g-concluir-modal-body--bold">{props.tarefas.nome}</span>
        </div>
        <div className="g-concluir-modal-footer">
          <button className="g-concluir-modal-btn-success" onClick={() => removerTarefa()} data-testid="modal-btn-remover">Sim</button>
          <button className="g-concluir-modal-btn-close" data-testid="modal-btn-fechar">Não</button>
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