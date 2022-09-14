import React, { useState, useEffect } from 'react';
import ItensListarTarefas from './itens-listar-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';

function ListarTarefas() {

  const ITENS_POR_PAG = 3

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {

    const obterTarefas = () => {
      const tarefasDb = localStorage['tarefas'];
      let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

      listaTarefas = listaTarefas.filter(tarefa => tarefa.nome.toLowerCase().indexOf(filtro.toLowerCase()) === 0)

      if (ordenarAsc) {
        listaTarefas.sort((l1, l2) => (l1.nome.toLowerCase() > l2.nome.toLowerCase() ? 1 : -1));
      } else if (ordenarDesc) {
        listaTarefas.sort((l1, l2) => (l1.nome.toLowerCase() < l2.nome.toLowerCase() ? 1 : -1));
      }

      setTotalItems(listaTarefas.length);
      setTarefas(listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG));
    }

    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false)
    }

  }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtro]);

  const mudarPagina = (pagina) => {
    setPaginaAtual(pagina);
    setCarregarTarefas(true);
  }

  const ordenarLista = () => {
    if (!ordenarAsc && !ordenarDesc) {
      setOrdenarAsc(true);
      setOrdenarDesc(false);
    } else if (ordenarAsc) {
      setOrdenarAsc(false);
      setOrdenarDesc(true);
    } else {
      setOrdenarAsc(false);
      setOrdenarDesc(false);
    }

    setCarregarTarefas(true);
  }

  const filtraTarefa = (e) => {

    setFiltro(e.target.value);
    setCarregarTarefas(true)

  }

  return (
    <div className="g-listar-container">
      <h1>Lista de Tarefas</h1>

      <div className="g-listar-table">
        <div className="g-listar-table-head">
          <button onClick={() => ordenarLista()}>
            Ordenar
            <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
          </button>
          <p>Tarefas</p>
          <a href="/cadastrar">Nova tarefa</a>

          <input
            type='search'
            value={filtro}
            onChange={filtraTarefa}
            data-testid="Inputsearch"
          />
        </div>

        <div className="g-listar-body" data-testid="tabela">
          <ItensListarTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas} />
        </div>
      </div>

      <Paginacao
        totalItems={totalItems}
        itemsPorPagina={ITENS_POR_PAG}
        paginaAtual={paginaAtual}
        mudarPagina={mudarPagina} />

    </div>
  );
}

export default ListarTarefas