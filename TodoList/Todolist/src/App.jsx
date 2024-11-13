import React, { useState, useEffect } from "react"; 
import "./App.css";
import FormularioTarefa from "./components/TodoForm";
import Tarefa from "./components/Tarefa"; 

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem("tarefas")) || [];
    setTarefas(tarefasArmazenadas);
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (nome) => {
    const novaTarefa = {
      id: Date.now(),
      nome,
      concluida: false,
      passos: [],
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const adicionarPasso = (tarefaId, nomePasso) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaId
          ? {
              ...tarefa,
              passos: [
                ...tarefa.passos, 
                { id: Date.now(), nome: nomePasso, concluido: false },
              ],
            }
          : tarefa
      )
    );
  };

  const removerPasso = (tarefaId, passoId) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaId
          ? {
              ...tarefa,
              passos: tarefa.passos.filter((passo) => passo.id !== passoId), 
            }
          : tarefa
      )
    );
  };

  const alternarPassoConcluido = (tarefaId, passoId) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaId
          ? {
              ...tarefa,
              passos: tarefa.passos.map((passo) =>
                passo.id === passoId
                  ? { ...passo, concluido: !passo.concluido }
                  : passo
              ),
              concluida: tarefa.passos.every(
                (passo) => passo.concluido || passo.id === passoId
              ),
            }
          : tarefa
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Lista de Tarefas</h1>
      <FormularioTarefa adicionarTarefa={adicionarTarefa} />
      {tarefas.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          adicionarPasso={adicionarPasso}
          removerTarefa={removerTarefa}
          alternarPassoConcluido={alternarPassoConcluido}
          removerPasso={removerPasso}
        />
      ))}
    </div>
  );
}

export default App;
