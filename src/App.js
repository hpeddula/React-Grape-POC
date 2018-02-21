import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css' 
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'
import Template from './Template';
import GrapeJsEditor from './GrapeJsEditor';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
    this.setEditMode=this.setEditMode.bind(this);
  }
  render() {
    return (
      
      <div>
        {(this.state.edit === true)
          ?
          <GrapeJsEditor edit={this.setEditMode} />
          :
          <Template edit={this.setEditMode}/>
          }
        
      </div>
     
    );
  }
  setEditMode(e){
    this.setState({edit: e});
  }
}
  

export default App;
