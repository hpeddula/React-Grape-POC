import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'
import Template from './Template';
class GrapeJsEditor extends Component {

    render() {
        return (
            // <div className="App">

            //   <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <h1 className="App-title">Welcome to React</h1>
            //   </header>
            //   <p className="App-intro">
            //     To get started, edit <code>src/App.js</code> and save to reload.
            //   </p>
            // </div>
            <div>
                <div id="gjs"></div><hr />

            </div>

        );
    }

    componentDidMount() {
        var editor = grapesjs.init({
            container: '#gjs',

            // commands :{
            //   defaults:[{
            //     id :'helloworld',
            //     run :function(editor,sender){
            //       console.log("Hello Workd" );
            //     },
            //     stop :function(editor,sender){
            //       console.log("Stop" );
            //     },
            //   }]
            // },
            plugins: ['gjs-preset-webpage', 'gjs-navbar'],
            pluginsOpts: {
                'gjs-navbar': { labelMenuLink: 'Harsha', blocks: ['h-navbar'] }
            },
            storageManager: {
                id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
                type: 'remote',
                urlStore: 'http://localhost:49219/api/values',
                urlLoad: 'http://cimailer.dev/templates/template',
                contentTypeJson: true,
                autosave: false,         // Autoload stored data on init
                stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
                storeComponents: false, // Enable/Disable storing of components in JSON format
                storeStyles: false,     // Enable/Disable storing of rules/style in JSON format
                storeHtml: true,        // Enable/Disable storing of components as HTML string
                storeCss: true,         // Enable/Disable storing of rules/style as CSS string
            }

        });
        var storageManager = editor.StorageManager;
        storageManager.get()
        // storageManager.add('local2', {
        //   load: function(keys, clb) {
        //     var res = {};
        //     for (var i = 0, len = keys.length; i < len; i++){
        //       var v = localStorage.getItem(keys[i]);
        //       console.log(v)
        //       if(v) res[keys[i]] = v;
        //     }
        //     clb(res); // might be called inside some async method
        //   },
        //   store: function(data, clb) {
        //     for(var key in data)
        //       localStorage.setItem(key, data[key]);
        //     clb(); // might be called inside some async method
        //   }
        // });
        editor.Panels.addButton
            ('options',
            [{
                id: 'save-db',
                className: 'fa fa-floppy-o',
                command: 'save-db',
                attributes: { title: 'Save DB' }
            }]
            );
        editor.Commands.add
            ('save-db',
            {
                run: function (editor, sender) {
                    sender && sender.set('active'); // turn off the button
                    editor.store();

                    editor.on('storage:load', function (e) {
                        console.log('Loaded ', e);

                    });

                    editor.on('storage:store', () => { editor.setEditMode(false) });

                }
            });
        editor.setEditMode = (flag) => 
        {
            this.props.edit(flag);
        }
    }
}

export default GrapeJsEditor;
