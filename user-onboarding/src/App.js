import React from 'react';
import UserForm from './components/Form';
import ls from 'local-storage';
import './App.css';

function App() {
  console.log(ls)
  return (
    <div className="container">
      <UserForm/>
    </div>
  );
}

export default App;
