import React, { useState } from "react";
import { useTarefaContext } from "../contexts/TarefaContexto";

function FormularioTarefa() {
  const [novoNomeTarefa, setNovoNomeTarefa] = useState("");
  const { adicionarTarefa } = useTarefaContext();

  const handleAddTask = () => {
    if (novoNomeTarefa.trim()) {
      adicionarTarefa(novoNomeTarefa);
      setNovoNomeTarefa("");
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        value={novoNomeTarefa}
        onChange={(e) => setNovoNomeTarefa(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button onClick={handleAddTask}>Adicionar Tarefa</button>
    </div>
  );
}

export default FormularioTarefa;
