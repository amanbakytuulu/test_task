import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Records from './pages/Records';
import RecordEdit from './pages/RecordEdit';
import RecordCreate from './pages/RecordCreate';

function App() {

  // connecting to the server
  const apiFetch = () => {
    const url = 'https://demo.sibers.com/users';
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      localStorage.setItem('users', this.responseText);
    }
    xhr.open('GET', url);
    xhr.send();
  }

  // calling the api after downloading
  // it will be called every time the application is restarted
  useEffect(() => {
    apiFetch();
  }, [])

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact component={() => <Records />} />
        <Route path="/create" exact component={() => <RecordCreate />} />
        <Route path="/:uid" exact component={() => <RecordEdit />} />
      </Switch>
    </div>
  );
}

export default App;
