import React, { useState } from 'react';
import Tarefa from '../Models/Tarefa.model';
import axios from 'axios';

function CadastrarTarefa() {
  const API_URL_CADASTRAR_TAREFA = 'http://localhost:3001/gerenciador-tarefas';

  const [tarefa, setTarefa] = useState('');
  const [validar, setValidar] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalErr, setModalErr] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const novaTarefa = new Tarefa(null, tarefa, false);
      await axios.post(API_URL_CADASTRAR_TAREFA, novaTarefa);
      mostrarModal(true);

    } catch (err) {
      mostrarModalErr(true);

    }

  }

  const mostrarModal = (item) => {
    setModal(item);
  }

  const mostrarModalErr = (item) => {
    setModalErr(item);
  }

  return (
    <div className="g-cadastrar-container">
      <h3>Cadastrar</h3>

      <section className="g-cadastrar-section">
        <form onSubmit={(e) => {
          submitForm(e);
        }}>
          <input
            value={tarefa}
            type="text"
            name="newTarefa"
            minLength="5"
            maxLength="100"
            onChange={(e) => {
              setTarefa(e.target.value);
            }}
            required
            data-testid="text-tarefa"
            placeholder='Nome da tarefa'
          />

          <div className="g-cadastrar-grupo-btn">
            <a className="g-btn-back" href="/">Voltar</a>
            <button className="g-btn-submit" type="submit" data-testid="btn-cadastrar">cadastrar</button>
          </div>
        </form>
      </section>

      <div className={modal ? `g-cadastrar-modal-overley--active` : `g-cadastrar-modal-overley`} onClick={() => mostrarModal(false)}></div>
      <div className={modal ? `g-cadastrar-modal-container--active` : 'g-cadastrar-modal-container'} data-testid="modal">
        <div className="g-cadastrar-modal-header">
          <p>Sucesso</p>
        </div>
        <div className="g-cadastrar-modal-body">
          <p>Tarefa adicionada com sucesso!</p>
        </div>
        <div className="g-cadastrar-modal-footer">
          <a href="/" className="g-btn-back">Voltar</a>
          <button className="g-cadastrar-modal-btn--new" onClick={() => mostrarModal(false)}>Criar nova tarefa</button>
        </div>
      </div>

      <div className={modalErr ? `g-cadastrar-modal-overley--active` : `g-cadastrar-modal-overley`} onClick={() => mostrarModalErr(false)}></div>
      <div className={modalErr ? `g-cadastrar-modal-container--active` : 'g-cadastrar-modal-container'} data-testid="modalErr">
        <div className="g-cadastrar-modal-header">
          <p>Erro</p>
        </div>
        <div className="g-cadastrar-modal-body">
          <p>Erro ao adicionar tarefa, tente novamente mais tarde!</p>
        </div>
        <div className="g-cadastrar-modal-footer">
          <button className="g-cadastrar-modal-btn--new" onClick={() => mostrarModalErr(false)}>Fechar</button>
        </div>
      </div>
    </div>
  );

}
export default CadastrarTarefa