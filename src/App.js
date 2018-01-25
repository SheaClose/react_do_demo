import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }
  componentDidMount() {
    axios.get("/api/todos").then(res => {
      this.setState({ todos: res.data });
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Shea's Todos</h1>
        </header>
        <div className="App-intro">
          {todos.map(c => <p key={c.id}>{c.todo}</p>)}
        </div>
      </div>
    );
  }
}

export default App;
