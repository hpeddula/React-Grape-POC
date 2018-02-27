import React, { Component } from 'react';
//  import logo from './logo.svg';
import Api from './api.js'
import './App.css';
import grapesjs from 'grapesjs';
import Parser from 'html-react-parser';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'


const path = 'values';
var divStyle = {
    background: "#eee",
    padding: "20px",
    margin: "20px",
    border :"1px solid blue"
  };

class TemplateEdit extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                css: '',
                html: '',
                assets: ''
            };
    }

    componentWillMount() {
        Api.get(path + "/" + this.props.id).then((pageData) => {
            if (pageData) {
                this.setState({ css: pageData["gjs-css"], html: pageData["gjs-html"], assets: pageData["gjs-assets"] });
            }
        })
    }

    render() {
        return (

            <div>
                    <div className="text-center" style={{ paddingTop:30  }}>
                    <button className="btn btn-primary" onClick={() => { this.props.edit(true) }} >Edit Mode</button>
                    </div>
                    <style>{this.state.css}</style>
                    <div style={{ paddingTop:10}}>{Parser(this.state.html)}</div>
                
            </div>
        );
    }
}
export default TemplateEdit;


