import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CSVTable from '../components/CSVTable';
import FileUpload from '../components/FileUpload';

const Index = () => {
  const [csvData, setCSVData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const handleFileUpload = (data) => {
    setCSVData(data);
    setOriginalData(data);
  };

  const handleDownload = () => {
    // Implementation for downloading CSV
  };

  const handleReset = () => {
    setCSVData(originalData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">CSV Management Tool</h1>
        <p className="text-xl text-gray-600">Upload, Edit, and Download CSV Files</p>
      </header>

      <main>
        <section className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </section>

        <section className="mb-8">
          <CSVTable data={csvData} setData={setCSVData} />
        </section>

        <section className="flex justify-center space-x-4">
          <Button onClick={handleDownload}>Download CSV</Button>
          <Button onClick={handleReset} variant="outline">Reset</Button>
        </section>
      </main>
    </div>
  );
};

export default Index;