import React from "react";
import PropTypes from "prop-types";

function Ordenacao(props) {
  return (
    <>
      <span>
        Icon 1
        Icon 2
      </span>
    </>
  );
}

Ordenacao.propTypes = {
  ordenarAsc: PropTypes.bool.isRequired,
  ordenarDesc: PropTypes.bool.isRequired
}

export default Ordenacao;