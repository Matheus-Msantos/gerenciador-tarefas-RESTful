import React from "react";
import PropTypes from "prop-types";

function Ordenacao(props) {
  return (
    <>
      <span>
        <i className="fa-solid fa-arrow-up-z-a"></i>
        <i className="fa-solid fa-arrow-down-z-a"></i>
      </span>
    </>
  );
}

Ordenacao.propTypes = {
  ordenarAsc: PropTypes.bool.isRequired,
  ordenarDesc: PropTypes.bool.isRequired
}

export default Ordenacao;