import React, { useState } from 'react';
import Tarefa from '../Models/Tarefa.model';

function CadastrarTarefa() {

  const [tarefa, setTarefa] = useState('');
  const [validar, setValidar] = useState(false);
  const [modal, setModal] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const tarefasDb = localStorage['tarefas'];
    const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
    localStorage['tarefas'] = JSON.stringify(tarefas);

    mostrarModal(true);
  }

  const mostrarModal = (item) => {
    setModal(item);
  }

  return (
    <div className="g-cadastrar-container">
      <h3>Cadastrar</h3>

      <section className="g-cadastrar-section">
        <form onSubmit={(e) => {
          submitForm(e);
        }}>
          <label>Tarefa</label>
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
    </div>
  );

}
export default CadastrarTarefa