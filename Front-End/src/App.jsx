import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import DashboardMeta from './components/pages/Dashboard/DashboardMeta';
import Result from './components/pages/Result/Result';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleUpload = (data) => {
    setCsvData(data);
    setIsFileUploaded(true);
  };

  const resetUpload = () => {
    setCsvData([]);
    setIsFileUploaded(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              csvData={csvData}
              isFileUploaded={isFileUploaded}
              onUpload={handleUpload}
              onReset={resetUpload}
            />
          }
        />
        <Route path="/dashboard" element={<DashboardMeta />} />
        <Route path="/result" element={<Result onReset={resetUpload} />} />
      </Routes>
    </Router>
  );
}

export default App;
