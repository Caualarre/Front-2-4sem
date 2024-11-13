import React from "react";

function Passo({ passo, idTarefa, alternarPassoConcluido, removerPasso }) {
  return (
    <li style={{ display: "flex", alignItems: "center" }}>
      <label
        style={{
          textDecoration: passo.concluido ? "line-through" : "none",
          color: passo.concluido ? "green" : "black",
        }}
      >
        <input
          type="checkbox"
          checked={passo.concluido}
          onChange={() => alternarPassoConcluido(idTarefa, passo.id)}
        />
        {passo.nome}
      </label>s
      <button onClick={() => removerPasso(idTarefa, passo.id)} style={{ marginLeft: "10px" }}>
        Remover Passo
      </button>
    </li>
  );
}

export default Passo;
