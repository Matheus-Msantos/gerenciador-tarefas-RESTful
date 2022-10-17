import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TarefaModel from '../Models/Tarefa.model';

function AtualizarTarefa(props) {

  const API_URL_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/';

  const [modal, setModal] = useState(false);
  const [modalErr, setModalErr] = useState(false);
  const [tarefa, setTarefa] = useState('');
  const [carregarTarefa, setCarregarTarefa] = useState(true);

  const abrirModal = () => {
    setModal(true);
  }

  const mostrarModalErr = (item) => {
    setModalErr(item);
  }

  const atualizar = async (e) => {
    e.preventDefault();

    try {
      const tarefaAtualizar = new TarefaModel(null, tarefa, false);
      await axios.put(API_URL_TAREFAS + props.id, tarefaAtualizar)
      setModal(true)
    } catch (err) {
      setModalErr(true)
    }
  }

  const txtTarefa = (e) => {
    setTarefa(e.target.value);
  }

  useEffect(() => {
    async function obterTarefa() {
      try {
        let { data } = await axios.get(API_URL_TAREFAS + props.id);
        setTarefa(data.nome);
      } catch (err) {
        mostrarModalErr(true);
      }
    }

    if (carregarTarefa) {

      obterTarefa();
      setCarregarTarefa(false);
    }
  }, [carregarTarefa, props]);

  return (
    <div className="g-atualizar-container">

      <h3 className="g-atualizar-title">Atualizar</h3>

      <div className="g-atualizar-form__container">
        <form onSubmit={atualizar}>
          <input
            value={tarefa}
            className="g-atualziar-form__input"
            type="text"
            placeholder='Digite o nome da tarefa'
            required
            data-testid="txt-tarefa"
            onChange={txtTarefa}
          />

          <div className="g-atualizar-btn__group">
            <a href="/" className="g-btn-back">Voltar</a>
            <button className="g-btn-submit" type="submit" onClick={() => abrirModal()} data-testid="btn-atualizar">Atualizar</button>
          </div>
        </form>

        <div className={`g-atualizar-modal-overley ${modal ? 'g-atualizar-modal-overley--active' : ''}`}></div>
        <div className={`g-atualizar-modal-container ${modal ? 'g-atualizar-modal-container--active' : ''}`} data-testid="modal">
          <div className="g-atualizar-modal-header">
            <span>atualizar tarefa</span>

          </div>
          <div className="g-atualizar-modal-body">
            <span>Tarefa atualizada com sucesso!</span>
          </div>
          <div className="g-atualizar-modal-footer">
            <a href="/" className="g-atualizar-modal-btn-success" data-testid="modal-btn-atualizar">Fechar</a>
          </div>
        </div>
      </div>

      <div className={modalErr ? `g-cadastrar-modal-overley--active` : `g-cadastrar-modal-overley`} onClick={() => mostrarModalErr(false)}></div>
      <div className={modalErr ? `g-cadastrar-modal-container--active` : 'g-cadastrar-modal-container'} data-testid="modalErr">
        <div className="g-cadastrar-modal-header">
          <p>Erro</p>
        </div>
        <div className="g-cadastrar-modal-body">
          <p>Erro ao atualizar' tarefa, tente novamente mais tarde!</p>
        </div>
        <div className="g-cadastrar-modal-footer">
          <button className="g-cadastrar-modal-btn--new" onClick={() => mostrarModalErr(false)}>Fechar</button>
        </div>
      </div>

    </div>
  );
}

AtualizarTarefa.propType = {
  id: PropTypes.number.isRequired
}

export default AtualizarTarefa