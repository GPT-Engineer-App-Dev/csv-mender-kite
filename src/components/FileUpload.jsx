import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import Papa from 'papaparse';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          onFileUpload(result.data);
        },
        header: true
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>
        <Upload className="mr-2 h-4 w-4" /> Upload
      </Button>
    </div>
  );
};

export default FileUpload;