import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ConcluirTarefa(props) {

  const API_CONCLUIR_TAREFA = 'http://localhost:3001/gerenciador-tarefas/:id/concluir';

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

  const conclurTarefa = async () => {
    try {
      await axios.put(API_CONCLUIR_TAREFA.replace(':id', props.tarefas.id));
      setModal(false);
      props.recarregarTarefas(true);

    } catch (err) {
      setModalErr(true);
    }
  }

  return (
    <>
      <span className={`btn-abrir-modal ${props.className}`} onClick={() => abrirModal()} data-testid="btn-abrir-modal">
        <i className="fa-solid fa-check"></i>
      </span>

      <div className={`g-concluir-modal-overley ${modal ? 'g-concluir-modal-overley--active' : ''}`}></div>
      <div className={`g-concluir-modal-container ${modal ? 'g-concluir-modal-container--active' : ''}`} data-testid="modal">
        <div className="g-concluir-modal-header">
          <span>Concluir tarefa</span>
          <button className="g-concluir-modal-header-btn" onClick={() => fecharModal()}><i className="fa-solid fa-x"></i></button>
        </div>
        <div className="g-concluir-modal-body">
          <span>Você realmente deseja concluir a seguinye tarefa?</span>
          <span className="g-concluir-modal-body--bold">{props.tarefas.nome}</span>
        </div>
        <div className="g-concluir-modal-footer">
          <button className="g-concluir-modal-btn-close" data-testid="modal-btn-fechar" onClick={fecharModal}>Não</button>
          <button className="g-concluir-modal-btn-success" onClick={() => conclurTarefa()} data-testid="modal-btn-concluir">Sim</button>
        </div>
      </div>

      <div className={modalErr ? `g-cadastrar-modal-overley--active` : `g-cadastrar-modal-overley`} onClick={() => mostrarModalErr(false)}></div>
      <div className={modalErr ? `g-cadastrar-modal-container--active` : 'g-cadastrar-modal-container'} data-testid="modalErr">
        <div className="g-cadastrar-modal-header">
          <p>Erro</p>
        </div>
        <div className="g-cadastrar-modal-body">
          <p>Erro ao concluir tarefa, tente novamente mais tarde!</p>
        </div>
        <div className="g-cadastrar-modal-footer">
          <button className="g-cadastrar-modal-btn--new" onClick={() => mostrarModalErr(false)}>Fechar</button>
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