/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import {
  DATA_STORE_KEY,
  COLUMN_KEY_TODO,
  COLUMN_KEY_ONGOING,
  COLUMN_KEY_DONE
} from './components/KanbanBoard';
import AdminContext from './context/AdminContext';

function App() {
  const [todoList, setTodoList] = useState([
    { title: '开发任务1', status: '22-05-22 18:15' },
    { title: '开发任务2', status: '22-05-22 18:15' }
  ]);
  const [ongoingList, setOngoningList] = useState([
    { title: '开发任务3', status: '22-05-22 18:15' },
    { title: '开发任务4', status: '22-05-22 18:15' }
  ]);
  const [doneList, setDoneList] = useState([
    { title: '开发任务5', status: '22-05-22 18:15' },
    { title: '开发任务6', status: '22-05-22 18:15' }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const KanbanColumnData = JSON.parse(data);
        setTodoList(KanbanColumnData.todoList);
        setOngoningList(KanbanColumnData.ongoingList);
        setDoneList(KanbanColumnData.doneList);
      }
      setIsLoading(false);
    }, 1000);
  }, []);
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoningList,
    [COLUMN_KEY_DONE]: setDoneList
  }

  const handleAdd = (column, newCard) => {
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  }

  const handleRemove = (column, removeCard) => {
    updaters[column]((currentStat) => currentStat.filter(item => !Object.is(item, removeCard)));
  }

  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList
    });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  }

  const [isAdmin, setIsAdmin] = useState(false);
  const handleToggleAdmin = (evt) => {
    setIsAdmin(!isAdmin);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          看板视图
          <button onClick={handleSaveAll}>保存所有卡片</button>
          <label>
            <input type='checkbox' value={isAdmin} onChange={handleToggleAdmin} />
            管理员模式
          </label>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AdminContext.Provider value={isAdmin}>
        <KanbanBoard
          isLoding={isLoading}
          todoList={todoList}
          ongoningList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </AdminContext.Provider>
    </div>
  );
}

export default App;
