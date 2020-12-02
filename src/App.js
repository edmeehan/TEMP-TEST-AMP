import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

function App() {
  const [todos, updateTodos] = useState([]);
  
  const createTodoItem = async () => {
    await DataStore.save(
      new Todo({
        "name": "Lorem ipsum dolor sit amet",
        "description": "Lorem ipsum dolor sit amet"
      })
    );
    query();
  }

  const updateTodoItem = async (CURRENT_ITEM) => {
    /* Models in DataStore are immutable. To update a record you must use the copyOf function
    to apply updates to the item’s fields rather than mutating the instance directly */
    await DataStore.save(Todo.copyOf(CURRENT_ITEM, item => {
      item.name = 'Testing Update';
      item.description = 'Will it work?'
    }));
    query();
  }

  const deleteTodoItem = async (DELETE_ITEM) => {
    await DataStore.delete(DELETE_ITEM);
    query();
  }

  const query = async () => {
    const models = await DataStore.query(Todo);
    updateTodos(models);
  }

  useEffect(() => {
    query();
  },[])

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>

        <button type="button" onClick={createTodoItem}>Create Item</button>
        <ul>
          { todos.map(item => 
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <button type="button" onClick={() => updateTodoItem(item)}>Update Item</button>
              <button type="button" onClick={() => deleteTodoItem(item)}>Delete Item</button>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}

export default App;
