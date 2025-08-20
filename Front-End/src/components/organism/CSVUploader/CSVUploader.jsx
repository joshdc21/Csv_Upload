import React from 'react';
import FileDrop from '../../molecules/FileDrop/FileDrop';
import Papa from 'papaparse';

const CSVUploader = ({ onDataParsed }) => {
  const handleFile = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,         
      skipEmptyLines: true,  
      complete: (results) => {
        onDataParsed(file, results.data);
      },
      error: (err) => {
        console.error('CSV parsing error:', err);
        alert('Failed to parse CSV file');
      },
    });
  };

  return <FileDrop onFileSelected={handleFile} />;
};

export default CSVUploader;

// import Papa from 'papaparse';
// import FileDrop from '../molecules/FileDrop';

// const CSVUploader = ({ onDataParsed }) => {
//   const handleFile = (file) => {
//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (results) => {
//         const allRows = results.data
//         const N = 100;
//         const limitedRows = allRows.slice(0, N);
//         onDataParsed(limitedRows);
//       },
//     });
//   };

//   return <FileDrop onFileSelected={handleFile} />;
// };

// export default CSVUploader;

// import Papa from 'papaparse';
// import FileDrop from '../molecules/FileDrop';

// // const CSVUploader = ({ onDataParsed }) => {
// //   const handleFile = (file) => {
// //     Papa.parse(file, {
// //       header: true,
// //       skipEmptyLines: true,
// //       complete: (results) => {
// //         onDataParsed(results.data, file); // pass file to parent
// //       },
// //     });
// //   };

// //   return <FileDrop onFileSelected={handleFile} />;
// // };

// // export default CSVUploader;