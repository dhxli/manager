import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTask, 
  toggleTask, 
  clearCompleted, 
  selectAllTasks, 
  selectActiveTasks, 
  selectCompletedTasks 
} from './tasksSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const activeTasks = useSelector(selectActiveTasks);
  const completedTasks = useSelector(selectCompletedTasks);

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    dispatch(addTask(inputValue));
    setInputValue('');
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const total = tasks.length;
  const completedCount = completedTasks.length;

  return (
    <div className="container">
      <h1>Менеджер задач</h1>

      <form onSubmit={handleSubmit} className="task-form">
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
            onClick={() => dispatch(toggleTask(task.id))}
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
        <span>активных {activeTasks.length}</span>
        <span>выполненных {completedCount}</span>
      </div>

      {completedCount > 0 && (
        <button className="clear-btn" onClick={() => dispatch(clearCompleted())}>
           удалить все выполненные
        </button>
      )}
    </div>
  );
}

export default App;