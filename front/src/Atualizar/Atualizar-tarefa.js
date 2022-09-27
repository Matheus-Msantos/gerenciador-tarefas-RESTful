import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


function AtualizarTarefa(props) {

  const [modal, setModal] = useState(false);
  const [tarefa, setTarefa] = useState('');
  const [carregarTarefa, setCarregarTarefa] = useState(true);

  const abrirModal = () => {
    setModal(true);
  }

  const fecharModal = () => {
    setModal(false);
  }

  const atualizar = (e) => {
    e.preventDefault();

    const tarefaDb = localStorage["tarefas"];
    let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];

    tarefas = tarefas.map(t => {
      if (t.id === parseInt(props.id)) {
        t.nome = tarefa
      }
      return t;
    });

    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  const txtTarefa = (e) => {
    setTarefa(e.target.value);
  }

  useEffect(() => {
    if (carregarTarefa) {
      const tarefaDb = localStorage["tarefas"];
      const tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
      const tarefa = tarefas.filter(
        t => t.id === parseInt(props.id)
      )[0];
      console.log(tarefa)
      setTarefa(tarefa.nome);
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

    </div>
  );
}

AtualizarTarefa.propType = {
  id: PropTypes.number.isRequired
}

export default AtualizarTarefa