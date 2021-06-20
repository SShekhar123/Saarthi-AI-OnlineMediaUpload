import React, { Component } from "react";
import { render } from "react-dom";
import $ from "jquery";
import FileUpload from './FileUpload';
import './App.css';
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <FileUpload />
      </div >
    );
  }
}
render(<App />, document.getElementById("root"));
export default App;