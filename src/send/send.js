import React, { useState } from 'react';
import './style.css';

function SEND() {
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      setFileData(fileContent);
    };

    reader.readAsText(selectedFile);
  };

  const handleEncrypt = () => {
    const encryptedData = encryptFunction(fileData);
  
    // Create a Blob with the encrypted data
    const blob = new Blob([encryptedData], { type: 'text/plain' });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    
    // Set the download attribute with the desired file name
    link.download = 'decrypted_file.txt';
    
    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up by revoking the URL object
    URL.revokeObjectURL(url);
  };
  

  const encryptFunction = (data) => {
    let encryptedData = '';
    for (let i = 0; i < data.length; i++) {
      // Check if the character is a letter
      if ((data[i] >= 'A' && data[i] <= 'Z') || (data[i] >= 'a' && data[i] <= 'z')) {
        // Shift the ASCII value by +1
        encryptedData += String.fromCharCode(data.charCodeAt(i) - 1);
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
        <h2>Decrypt File</h2>
      </div>
      <br />
      <center>
        
          <div>
            <input type='file' onChange={handleFileChange} accept=".txt" />
            {fileData && (
              <button onClick={handleEncrypt}>Decrypt</button>
            )}
          </div>
        <br />
      </center>
    </div>
  );
}

export default SEND;
