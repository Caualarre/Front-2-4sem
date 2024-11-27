import React, { createContext, useState, useEffect, useContext } from 'react';

const TarefaContext = createContext();

export function TarefaProvider({ children }) {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (nome) => {
    const novaTarefa = { id: Date.now(), nome, concluida: false, passos: [] };
    setTarefas((prev) => [...prev, novaTarefa]);
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
  };

  const adicionarPasso = (tarefaId, nomePasso) => {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === tarefaId
          ? {
              ...tarefa,
              passos: [...tarefa.passos, { id: Date.now(), nome: nomePasso, concluido: false }],
            }
          : tarefa
      )
    );
  };

  const removerPasso = (tarefaId, passoId) => {
    setTarefas((prev) =>
      prev.map((tarefa) =>
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
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === tarefaId
          ? {
              ...tarefa,
              passos: tarefa.passos.map((passo) =>
                passo.id === passoId
                  ? { ...passo, concluido: !passo.concluido }
                  : passo
              ),
              concluida: tarefa.passos.every((passo) => passo.concluido),
            }
          : tarefa
      )
    );
  };

  return (
    <TarefaContext.Provider
      value={{
        tarefas,
        adicionarTarefa,
        removerTarefa,
        adicionarPasso,
        removerPasso,
        alternarPassoConcluido,
      }}
    >
      {children}
    </TarefaContext.Provider>
  );
}

export function useTarefaContext() {
  return useContext(TarefaContext);
}
