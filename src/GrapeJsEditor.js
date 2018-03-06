import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'
import 'grapesjs-lory-slider/dist/grapesjs-lory-slider.min.js'
import 'grapesjs-blocks-basic/dist/grapesjs-blocks-basic.min.js'
import $ from "jquery";
class GrapeJsEditor extends Component {

    
    componentWillReceiveProps()
    {

    }

    render() {
        return (
            <div id="gjs"></div>
        );
    }

    componentDidMount() {
        var editor = grapesjs.init({
            container: '#gjs',
            plugins: ['gjs-blocks-basic', 'gjs-preset-webpage', 'grapesjs-lory-slider'],
            pluginsOpts: {
                'grapesjs-lory-slider': {
                    blocks: ['lory-sliders'],
                    blocksBasicOpts: true
                    },
                'gjs-blocks-basic': {
                blocks: ['text', 'link', 'image', 'video', 'map', 'link-block', 'quote', 'text-basic'],
                blocksBasicOpts: true
                },
                
                'gjs-preset-webpage': {
                blocks: ['quote'],
                blocksBasicOpts: true
                } 
            }, 
 


                //blocks: ['text', 'link', 'image', 'video', 'map', 'link-block', 'quote', 'text-basic']
            
            canvas: {
                scripts: ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
                    'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js']
            },
            // script: function () {
            //     $('.carousel').carousel('cycle');
            // },
            assetManager: {
                assets: ["https://c1cleantechnicacom-wpengine.netdna-ssl.com/files/2017/01/Tesla-Model-3-red.png", "https://tctechcrunch2011.files.wordpress.com/2017/11/tesla-semi_46.jpg?w=738","http://www.spacex.com/sites/spacex/files/images/dragon/tabs/dragon-lab.jpg"],
                noAssets: 'No <b>assets</b> here, drag to upload',
                upload: 'http://192.168.9.188:97/api/image/PostUserImage',
                uploadName: 'files',
                headers: {'Content-Type':'mulitpart/form-data'},
                uploadText: 'Drop files here or click to upload',
                addBtnText: 'Add image',
                autoAdd: 1,
            
               
                uploadFile: function (e) {
                    var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
                    // ...send somewhere
                    console.log(files);

                    var formData = new FormData();

                    for (var i in files) {
                        formData.append('file-' + i, files[i])
                    }
                    console.log(formData);
                    $.ajax({
                        url: 'http://192.168.9.188:97/api/image/PostUserImage',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        crossDomain: true,
                        mimeType: "multipart/form-data",
                        processData: false,
                        dataType :"text",
                        success: function (result) {
                            var images = JSON.parse(result); // <- should be an array of uploaded images
                            for(var i =0;i<images.length;i++){
                            editor.AssetManager.add(JSON.parse(result)[i].data);}
                        }
                    });

                }
            },
            //,'http://localhost:49219/api/values/',http://localhost:49219/api/image/PostUserImage
            storageManager: {
                id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
                type: 'remote',
                urlStore:  'http://192.168.9.188:97/api/values/'  + this.props.id,
                urlLoad:  'http://192.168.9.188:97/api/values/'+ this.props.id,
                contentTypeJson: true,
                autosave: false,         // Autoload stored data on init
                stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
                storeComponents: false, // Enable/Disable storing of components in JSON format
                storeStyles: false,     // Enable/Disable storing of rules/style in JSON format
                storeHtml: true,        // Enable/Disable storing of components as HTML string
                storeCss: true,         // Enable/Disable storing of rules/style as CSS string
            },

        });


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
        editor.setEditMode = (flag) => {
            this.props.edit(flag);
        }
        // editor.BlockManager.add('test-block', {
        //     label: 'Heading',
        //     content: '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>',
        //     attributes: {
        //         title: 'Insert h1 block', class: 'fa fa-text'
        //     }
        // });
        // editor.BlockManager.add('test-block1', {
        //     label: 'Test block',
        //     attributes: { class: 'fa fa-text' },
        //     content: {
        //         script: function () {
        //             alert('Hi This is Harsha!!');
        //         },
        //         // Add some style just to make the component visible
        //         style: {
        //             width: '100px',
        //             height: '100px',
        //             'background-color': 'red',
        //         }
        //     }
        // });
        // editor.BlockManager.add('test-block2', {
        //     label: 'Carousel',
        //     attributes: { class: 'fa fa-slideshare' },
        //     content:
        //         '<div id=\"carouselExampleSlidesOnly\" class=\"carousel slide\" data-ride=\"carousel\"><div class=\"carousel-inner\"><div class=\"carousel-item active\"><img class=\"d-block w-100\" src=\"https://c1cleantechnicacom-wpengine.netdna-ssl.com/files/2017/01/Tesla-Model-3-red.png"alt=\"First slide\"></div><div class=\"carousel-item\"><img class=\"d-block w-100\" src=\"https://tctechcrunch2011.files.wordpress.com/2017/11/tesla-semi_46.jpg?w=738\" alt=\"Second slide\"></div><div class=\"carousel-item\"><img class=\"d-block w-100\" src=\"https://img.wennermedia.com/article-leads-horizontal/20171116_shd_z03_739-f88212ae-0692-4efb-93bd-4d49ace747b2.jpg\" alt=\"Third slide\"></div></div></div>',


        // });
       

    }
}

export default GrapeJsEditor;
