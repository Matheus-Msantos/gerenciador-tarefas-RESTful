import React from "react";
import PropTypes from 'prop-types';
import Pagination from "react-bootstrap/Pagination";

function Paginacao(props) {

  function gerarPrimeiroItem() {
    return (
      <Pagination.First
        Key="pagFisrt"
        onClick={() => props.mudarPagina(1)}
        disabled={props.paginaAtual === 1} />
    );
  }

  function gerarItemAnterior() {
    return (
      <Pagination.Prev
        key="pagPrev"
        onClick={() => props.mudarPagina(props.paginaAtual - 1)}
        disabled={props.paginaAtual === 1} />
    );
  }

  function gerarItemNumericos(pagina) {
    return (
      <Pagination.Item
        key={pagina}
        active={pagina === props.paginaAtual}
        onClick={() => props.mudarPagina(pagina)} >
        {pagina}
      </Pagination.Item>
    );
  }

  function gerarProximoItem(numPaginas) {
    return (
      <Pagination.Next
        key="pagNext"
        onClick={() => props.mudarPagina(props.paginaAtual + 1)}
        disabled={props.paginaAtual === numPaginas} />
    );
  }

  function gerarUltimoItem(numPaginas) {
    <Pagination.Last
      key="pagLast"
      onClick={() => props.mudarPagina(numPaginas)}
      disabled={props.paginaAtual === numPaginas} />
  }

  function obterPaginacao() {
    const numPaginas = Math.ceil(props.totalItems / props.itemsPorPagina);
    let items = [];
    items.push(gerarPrimeiroItem());
    items.push(gerarItemAnterior());

    for (let i = 0; i <= numPaginas; i++) {
      items.push(gerarItemNumericos(i));
    }

    items.push(gerarProximoItem(numPaginas));
    items.push(gerarUltimoItem(numPaginas));
    return items;
  }

  return (
    <Pagination data-testid="paginacao">
      {obterPaginacao()}
    </Pagination>
  );
}

Paginacao.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPorPagina: PropTypes.number.isRequired,
  paginaAtual: PropTypes.number.isRequired,
  mudarPagina: PropTypes.func.isRequired
}

export default Paginacao