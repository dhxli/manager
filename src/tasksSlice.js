import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  const saved = localStorage.getItem('todo_lab_data');
  return saved ? JSON.parse(saved) : [];
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: loadTasksFromStorage()
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        isCompleted: false,
        createdAt: new Date().toLocaleString()
      };
      state.items.unshift(newTask);
      localStorage.setItem('todo_lab_data', JSON.stringify(state.items));
    },
    toggleTask: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
      localStorage.setItem('todo_lab_data', JSON.stringify(state.items));
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(t => !t.isCompleted);
      localStorage.setItem('todo_lab_data', JSON.stringify(state.items));
    }
  }
});

export const { addTask, toggleTask, clearCompleted } = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.items;
export const selectActiveTasks = (state) => state.tasks.items.filter(t => !t.isCompleted);
export const selectCompletedTasks = (state) => state.tasks.items.filter(t => t.isCompleted);

export default tasksSlice.reducer;