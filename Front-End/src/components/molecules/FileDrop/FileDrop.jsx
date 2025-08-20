import React, { useRef } from 'react';
import Button from '../../atoms/Button/Button';
import './FileDrop.css';

const FileDrop = ({ onFileSelected }) => {
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div 
      className="drop-zone" 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <span className="material-icons upload-icon">cloud_upload</span>
      <p className="text-description">
        Drag and drop your CSV file here, or click to browse
      </p>

      <Button onClick={handleClick} icon="download" className="drop-button">
        Browse Files
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileDrop;
