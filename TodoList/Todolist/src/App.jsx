import React from 'react';
import './App.css';  
import FormularioTarefa from './components/TodoForm';
import Tarefa from './components/Tarefa';
import { useTarefaContext } from './contexts/TarefaContexto';  
import { TarefaProvider } from './contexts/TarefaContexto';

function App() {
  const { tarefas } = useTarefaContext();  

  return (
    <div className="app-container">
      <h1>Lista de Tarefas</h1>
      <FormularioTarefa />  {/* Componente para adicionar tarefas */}
      <div className="tarefas-list">
        {tarefas && tarefas.length > 0 ? (
          tarefas.map((tarefa) => (
            
            <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))
        ) : (
          <p>Nenhuma tarefa encontrada</p>
        )}
      </div>
    </div>
  );
}

// envolver o App com o Provider do contexto
export default function WrappedApp() {
  return (
    <TarefaProvider>  {/* Envolvendo App com TarefaProvider*/}
      <App />
    </TarefaProvider>
  );
}
