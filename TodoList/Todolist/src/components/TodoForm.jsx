import React, { useState } from "react"; 

function FormularioTarefa({ adicionarTarefa }) {
  const [novoNomeTarefa, setNovoNomeTarefa] = useState("");

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
