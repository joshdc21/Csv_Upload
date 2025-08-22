import { useEffect, useState } from 'react';
import Sidebar from '../../molecules/Sidebar/Sidebar';
import Loader from '../../atoms/Loader/Loader';
import './Result.css'; 

const Result = ({ onReset }) => {
  const [spResult, setSpResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/results'); 
        const data = await response.json();
        setSpResult(data);
      } catch (err) {
        console.error('Failed to fetch stored procedure result:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, []);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/results/download', {
        method: 'GET',
      });
      const blob = await response.blob();
      setIsLoading(false);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Processedresult.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to download', err);
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
          showDashboard={true}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      </aside>

      <main className="content-pane">
        <div className="download-btn-wrapper">
          <button className="download-btn" onClick={handleDownload}>
            <span className="material-icons">download</span> Download CSV
          </button>
        </div>

        {isLoading && (
          <div className="loader-overlay">
            <Loader isLoading={true} />
          </div>
        )}

        {spResult.length > 0 ? (
          <div className="table-wrapper">
            <h3 className="calculation-result">Result</h3>
            <table>
              <thead>
                <tr>
                  {Object.keys(spResult[0]).map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {spResult.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoading && <p>No results found</p>
        )}
      </main>
    </div>
  );
};

export default Result;
