import React, { useRef, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';

function FileUpload() {
    const componentDidMount = () => {

        $( "#slider-range" ).slider({
          range: true,
          min: 0,
          max: 500,
          values: [ 75, 300 ],
          slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
          }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
          " - $" + $( "#slider-range" ).slider( "values", 1 ) );
      
    }
    const [file, setFile] = useState(''); // storing the uploaded file   
     // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" }); 
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        setFile(file); // storing file
    }
    
    const uploadFile = () => {
        const formData = new FormData(); formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({
                name: res.data.name,
                path: 'http://localhost:4500' + res.data.path
            })
        }).catch(err => console.log(err))
    }

    const showResult = (path) => {
        if(path)
            switch(path.split('.')[1]){
                case 'mp3': return <audio controls><source src={path} type="audio/ogg" /><source src={path} type="audio/mpeg" />Your browser does not support audio</audio>;
                default: return <div>Please select an mp3 media to play.</div>;
            }
    }
    const showPlayer = () => {
        
        return <div id="slider-range" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div class="ui-slider-range ui-corner-all ui-widget-header"></div><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span></div>
    }
    return (
      
        <div>
            <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />                
                <div className="progessBar" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">                   
                    Upload
                </button>
                <hr />    
                {showResult(data.path) }
                {showPlayer()}
            </div>
        </div>
    );
}
export default FileUpload;