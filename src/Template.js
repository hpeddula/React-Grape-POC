import React, { Component } from 'react';
//  import logo from './logo.svg';
import Api from './api.js'
import './App.css';
import grapesjs from 'grapesjs';
import Parser from 'html-react-parser';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'
import GrapeJsEditor from './GrapeJsEditor';
import TemplateEdit from './TemplateEdit';

//const path = 'values';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = { edit: false };
        this.setEditMode = this.setEditMode.bind(this);
        this.state = {
            editMode: false,
            templateID: 0,
            templateSaved: false
        }
    }

    render() {
        return (

            <div>
                {
                    !this.state.templateSaved && !this.state.editMode &&
                    <div>
                        <h1 className="text-center">Templates</h1>
                        <div className="template-container">
                            <div className="template" onClick={() => { this.handleTemplateSeclect(0) }}>Template1</div>
                            <div className="template" onClick={() => { this.handleTemplateSeclect(1) }}>Template2</div>
                            <div className="template" onClick={() => { this.handleTemplateSeclect(2) }}>Template3</div>
                            <div className="template" onClick={() => { this.handleTemplateSeclect(3) }}>Template4</div>
                        </div>
                    </div>
                }

                {
                    this.state.editMode && !this.state.templateSaved &&
                    <GrapeJsEditor edit={(flag)=>{this.setEditMode(flag)}} id={this.state.templateID} />
                }

                {
                    this.state.templateSaved &&
                    <TemplateEdit id={this.state.templateID} edit={(flag)=>{this.setEditMode(flag)}} />
                }
            </div>


        );
    }
    setEditMode(flag) {
        this.setState({ templateSaved: !flag });
    }
    handleTemplateSeclect(id) {
        this.setState(
            {
                templateID: id,
                editMode: true
            }
        )
    }

}
export default Template;


