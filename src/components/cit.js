import React, { useState, useEffect } from 'react';
import './style.css';

function CIT() {
  const [speed, setSpeed] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleSpeed = () => {
    fetch('/speed')
      .then(response => response.json())
      .then(data => setSpeed(data.devices[0]))
      .catch(error => console.error('Error fetching speed:', error));
  };

  useEffect(() => {
    handleSpeed();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      setFileData(fileContent);
    };

    reader.readAsText(selectedFile);
  };

  const handleCopy = () => {
    const textarea = document.getElementById('fileContent');
    textarea.select();
    document.execCommand('copy');
  };

  const handleEncrypt = () => {
    const encryptedData = encryptFunction(fileData);
    setFileData(encryptedData);
  };

  const encryptFunction = (data) => {
    let encryptedData = '';
    for (let i = 0; i < data.length; i++) {
      // Check if the character is a letter
      if ((data[i] >= 'A' && data[i] <= 'Z') || (data[i] >= 'a' && data[i] <= 'z')) {
        // Shift the ASCII value by +1
        encryptedData += String.fromCharCode(data.charCodeAt(i) + 1);
      } else {
        // For non-letter characters, keep them unchanged
        encryptedData += data[i];
      }
    }
    return encryptedData;
  };

  return (
    <div className='whole'>
      <div className='heading'>
        <h2>Open File</h2>
      </div>
      <br />
      <center>
        <div>
          <input type='file' onChange={handleFileChange} accept=".txt" />
          <button onClick={handleEncrypt}>Open</button>
          {fileData && (
            <div>
            <br/>
              <textarea id="fileContent" value={fileData} readOnly />
              <br/>
              <button onClick={handleCopy}>Copy</button>
            </div>
          )}
        </div>
        <br />
      </center>
    </div>
  );
}

export default CIT;
