import { useState, useEffect } from 'react';
import CSVUploader from '../../organism/CSVUploader/CSVUploader';
import Sidebar from '../../molecules/Sidebar/Sidebar';
import Loader from '../../atoms/Loader/Loader';
import './Home.css';

const Home = ({ isFileUploaded: initialFileUploaded, onUpload, onReset }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [preview, setPreview] = useState(() => {
    const storedPreview = localStorage.getItem('preview');
    return storedPreview ? JSON.parse(storedPreview) : [];
  });

  const [isResultReady, setIsResultReady] = useState(() => {
    const storedResult = localStorage.getItem('isResultReady');
    return storedResult ? JSON.parse(storedResult) : false;
  });

  const [isFileUploaded, setIsFileUploaded] = useState(() => {
    const storedFlag = localStorage.getItem('isFileUploaded');
    return storedFlag ? JSON.parse(storedFlag) : initialFileUploaded || false;
  });

  const [results, setResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('preview', JSON.stringify(preview));
  }, [preview]);

  useEffect(() => {
    localStorage.setItem('isResultReady', JSON.stringify(isResultReady));
  }, [isResultReady]);

  useEffect(() => {
    localStorage.setItem('isFileUploaded', JSON.stringify(isFileUploaded));
  }, [isFileUploaded]);

  const handleFileSelected = (file, parsedData) => {
    setCsvFile(file);
    onUpload(file);
    setPreview(parsedData.slice(0, 100));
    setIsFileUploaded(true); 
  };

  const handleReset = () => {
    setCsvFile(null);
    setPreview([]);
    setResults([]);
    setIsResultReady(false);
    setIsFileUploaded(false);

    localStorage.removeItem('preview');
    localStorage.removeItem('isResultReady');
    localStorage.removeItem('isFileUploaded');

    if (onReset) onReset();
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message || 'Upload completed');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunSP = async () => {
    if (!csvFile) {
      alert('No file uploaded yet.');
      return;
    }

    setIsLoading(true);
    try {
      await fetch('http://localhost:3000/api/join');
      const statusRes = await fetch('http://localhost:3000/api/status');
      const statusData = await statusRes.json();
      setIsResultReady(statusData.success);
      alert(statusData.success ? 'Join Successful' : 'SP is still running.');
    } catch (err) {
      console.error('Failed to run stored procedure:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app ${isSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
      <button
        className="hamburger"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      <div
        className={`mobile-overlay ${isSidebarOpen ? 'visible' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className="sidebar-pane">
        <Sidebar
          onReset={handleReset}
          showDashboard={isResultReady}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      </aside>

      <main className="content-pane">
        {isLoading && (
          <div className="loader-overlay">
            <Loader isLoading={true} />
          </div>
        )}

        {!isFileUploaded && (
          <div className="uploader-box">
            <CSVUploader onDataParsed={handleFileSelected} />
          </div>
        )}

        {(csvFile !== null || isFileUploaded) && (
          <div className="sticky-bar">
            <button
              className="process-btn"
              onClick={handleUpload}
              disabled={!csvFile}
            >
              Upload
            </button>
            <button className="process-btn" onClick={handleRunSP}>
              Run Stored Procedure
            </button>
          </div>
        )}

        {preview?.length > 0 && (
          <div className="table-wrapper">
            <h3>Preview</h3>
            <table>
              <thead>
                <tr>
                  {Object.keys(preview[0]).map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
