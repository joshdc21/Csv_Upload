import { useState, useEffect } from 'react';
import CSVUploader from '../../organism/CSVUploader/CSVUploader';
import Sidebar from '../../molecules/Sidebar/Sidebar';
import Loader from '../../atoms/Loader/Loader';
import './Home.css';

const Home = ({ isFileUploaded: initialFileUploaded, onUpload, onReset }) => {
  const [csvFile, setCsvFile] = useState(() => {
    const stored = localStorage.getItem('csvFileMeta');
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const [totalRows, setTotalRows] = useState(() => {
    const stored = localStorage.getItem('totalRows');
    return stored ? JSON.parse(stored) : 0;
  });


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

  useEffect(() => {
    if (csvFile) {
      localStorage.setItem(
        'csvFileMeta',
        JSON.stringify({ name: csvFile.name, size: csvFile.size })
      );
    } else {
      localStorage.removeItem('csvFileMeta');
    }
  }, [csvFile]);

  useEffect(() => {
    localStorage.setItem('totalRows', JSON.stringify(totalRows));
  }, [totalRows]);

  const handleFileSelected = (file, parsedData) => {
    setResults([]);
    setIsResultReady(false);

    setCsvFile(file);
    onUpload(file);
    setPreview(parsedData.slice(0, 100));
    setIsFileUploaded(true); 

    setTotalRows(parsedData.length);
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
          <div className="card">
            <div className="card-header">
              <h3>Preview</h3>
            </div>
            <div className="card-body table-wrapper">
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
          </div>
        )}
      </main>

      <aside className="summary-pane">
        {csvFile && (
          <>
            <div className="summary-row">
              <div className="summary-card"><div className="card-header"><h3>File Name</h3></div><div className="card-body"><p>{csvFile.name}</p></div></div>
              <div className="summary-card"><div className="card-header"><h3>File Size</h3></div><div className="card-body"><p>{Math.round(csvFile.size / 1024).toLocaleString()} KB</p></div></div>
              <div className="summary-card"><div className="card-header"><h3>Total Rows</h3></div><div className="card-body"><p>{totalRows}</p></div></div>
            </div>

            <div className="summary-row">
              <div className="summary-card"><div className="card-header"><h3>Rows Previewed</h3></div><div className="card-body"><p>{preview.length}</p></div></div>
              <div className="summary-card"><div className="card-header"><h3>Columns</h3></div><div className="card-body"><p>{preview.length > 0 ? Object.keys(preview[0]).length : 0}</p></div></div>
            </div>

            <div className="summary-actions">
              <button className="process-btn small-btn" onClick={handleReset}>
                Change File
              </button>
            </div>
          </>
        )}
      </aside>

    </div>
  );
};

export default Home;
