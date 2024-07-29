import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus } from 'lucide-react';

const CSVTable = ({ data, setData }) => {
  const [editingCell, setEditingCell] = useState(null);

  const handleEdit = (rowIndex, columnName, value) => {
    const newData = [...data];
    newData[rowIndex][columnName] = value;
    setData(newData);
    setEditingCell(null);
  };

  const handleDelete = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  const handleAdd = () => {
    const newRow = Object.fromEntries(Object.keys(data[0]).map(key => [key, '']));
    setData([...data, newRow]);
  };

  if (data.length === 0) return <p>No data to display</p>;

  const columns = Object.keys(data[0]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column}`}>
                  {editingCell === `${rowIndex}-${column}` ? (
                    <Input
                      value={row[column]}
                      onChange={(e) => handleEdit(rowIndex, column, e.target.value)}
                      onBlur={() => setEditingCell(null)}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => setEditingCell(`${rowIndex}-${column}`)}>
                      {row[column]}
                    </span>
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(rowIndex)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAdd} className="mt-4">
        <Plus className="mr-2 h-4 w-4" /> Add Row
      </Button>
    </div>
  );
};

export default CSVTable;