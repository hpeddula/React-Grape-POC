import React, { Component } from 'react';
//  import logo from './logo.svg';
import Api from './api.js'
import './App.css';
import grapesjs from 'grapesjs';
import Parser from 'html-react-parser';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'


const path ='values';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {css: '',
        html:'',
        assets:''};
    }
    render() {
        return (
            
            <div>
                <button className="text-center btn btn-primary" onClick={() => {this.props.edit(true)} } >Edit Mode</button>
                <style>{this.state.css}</style>
                <div>{Parser(this.state.html)}</div>
            </div>
        );
    }
    componentWillMount(){
        Api.get(path).then((e)=>{
            this.setState({css:e["gjs-css"],html:e["gjs-html"],assets:e["gjs-assets"]});
            
        })
    }
}
export default Template;


