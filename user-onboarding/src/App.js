import React from 'react';
import UserForm from './components/Form';
import './App.css';

function App() {
  console.log(localStorage)
  return (
    <div className="container">
      <UserForm/>
    </div>
  );
}

export default App;
