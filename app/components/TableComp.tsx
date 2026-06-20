import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export type Column<T> = {
  id: number;
  header: string;
  key: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
};

interface TableColumnProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function TableComp<T>({ columns, data }: TableColumnProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.render
                  ? column.render(row, index)
                  : column.key
                    ? String(row[column.key] ?? "")
                    : ""}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
