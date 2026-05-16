import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo_lab_data');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todo_lab_data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
      createdAt: new Date().toLocaleString()
    };

    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.isCompleted));
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;

  return (
  <div className="container">
    <h1>Менеджер задач</h1>

    <form onSubmit={addTask} className="task-form">
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="задача"
      />
      <button type="submit">добавить</button>
    </form>

    <div className="task-list">
      {filteredTasks.map(task => (
        <div 
          key={task.id} 
          className={`task-item ${task.isCompleted ? 'completed' : ''}`}
          onClick={() => toggleTask(task.id)}
        >
          <div className="task-body">
            <span className="icon">{task.isCompleted ? '✓' : '⭕'}</span>
            <div className="content-wrapper">
              <span className="task-text">{task.text}</span>
              <span className="task-date">дата создания {task.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <input 
      className="search-input"
      placeholder="найти задачи по тексту" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <div className="stats">
      <span>сколько всего {total}</span>
      <span>активных {total - completed}</span>
      <span>выполненных {completed}</span>
    </div>

    {completed > 0 && (
      <button className="clear-btn" onClick={clearCompleted}>
         удалить все выполненные
      </button>
    )}
  </div>
);
}

export default App;