import React, { useState } from "react";
import Passo from "./Etapa";
import { useTarefaContext } from "../contexts/TarefaContexto";

function Tarefa({ tarefa }) {
  const [novoNomePasso, setNovoNomePasso] = useState("");
  const { removerTarefa, adicionarPasso, removerPasso, alternarPassoConcluido } = useTarefaContext();

  const handleAddStep = () => {
    if (novoNomePasso.trim()) {
      adicionarPasso(tarefa.id, novoNomePasso);
      setNovoNomePasso("");
    }
  };

  return (
    <div className="tarefa">
      <h2 style={{ textDecoration: tarefa.concluida ? "line-through" : "none" }}>{tarefa.nome}</h2>
      <button onClick={() => removerTarefa(tarefa.id)}>Remover Tarefa</button>
      <div className="step-form">
        <input
          type="text"
          value={novoNomePasso}
          onChange={(e) => setNovoNomePasso(e.target.value)}
          placeholder="Novo passo..."
        />
        <button onClick={handleAddStep}>Adicionar Passo</button>
      </div>
      <ul>
        {tarefa.passos.map((passo) => (
          <Passo
            key={passo.id}
            passo={passo}
            idTarefa={tarefa.id}
            alternarPassoConcluido={alternarPassoConcluido}
            removerPasso={removerPasso}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tarefa;
