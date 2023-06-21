import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), description: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filterTasks = (task) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'completed' && task.completed) {
      return true;
    }
    if (filter === 'uncompleted' && !task.completed) {
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      <div>
        <label>
          Filtrar:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="completed">Concluídas</option>
            <option value="uncompleted">Não Concluídas</option>
          </select>
        </label>
      </div>
      <ul>
        {tasks.filter(filterTasks).map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.description}</span>
            <div>
              <button onClick={() => toggleTaskCompletion(task.id)}>Concluir</button>
              <button onClick={() => removeTask(task.id)}>Remover</button>
              <button onClick={() => editTask(task.id, prompt('Digite a nova descrição:'))}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
