import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RemoverTarefa(props) {

  const API_DELETAR_TAREFA = 'http://localhost:3001/gerenciador-tarefas/';

  const [modal, setModal] = useState(false);
  const [modalErr, setModalErr] = useState(false);

  const mostrarModalErr = (item) => {
    setModalErr(item);
  }

  const abrirModal = () => {
    setModal(true);
  }

  const fecharModal = () => {
    setModal(false);
  }


  const removerTarefa = async () => {
    console.log(API_DELETAR_TAREFA + props.tarefas.id)

    try {
      await axios.delete(API_DELETAR_TAREFA + props.tarefas.id);
      props.recarregarTarefas(true);
      abrirModal(false);
    } catch (err) {
      setModalErr(true);
      console.log(err)
    }

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

      <div className={modalErr ? `g-cadastrar-modal-overley--active` : `g-cadastrar-modal-overley`} onClick={() => mostrarModalErr(false)}></div>
      <div className={modalErr ? `g-cadastrar-modal-container--active` : 'g-cadastrar-modal-container'} data-testid="modalErr">
        <div className="g-cadastrar-modal-header">
          <p>Erro</p>
        </div>
        <div className="g-cadastrar-modal-body">
          <p>Erro ao remover tarefa, tente novamente mais tarde!</p>
        </div>
        <div className="g-cadastrar-modal-footer">
          <button className="g-cadastrar-modal-btn--new" onClick={() => mostrarModalErr(false)}>Fechar</button>
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