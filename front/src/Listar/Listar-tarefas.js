import React, { useState, useEffect } from 'react';
import ItensListarTarefas from './itens-listar-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import axios from 'axios';

function ListarTarefas() {

  const ITENS_POR_PAG = 10
  const API_URL_LISTAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas';

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {

    const obterTarefas = async () => {

      let ordem = '';
      if (ordenarAsc)
        ordem = 'ASC';
      else if (ordenarDesc)
        ordem = 'DESC';

      try {
        const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtro}`
        let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
        setTotalItems(data.totalItens);
        setTarefas(data.tarefas);
      } catch (err) {
        setTarefas([]);
      }
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
          <input
            type='search'
            value={filtro}
            onChange={filtraTarefa}
            data-testid="Inputsearch"
            placeholder='Digita sua busca'
          />

          <button onClick={() => ordenarLista()}>
            <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
          </button>
          <a href="/cadastrar">Nova tarefa <i className="fa-solid fa-plus"></i></a>
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