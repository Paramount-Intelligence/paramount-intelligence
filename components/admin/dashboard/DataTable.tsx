import { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
};

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 ${column.className || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={`hover:bg-slate-50/80 ${onRowClick ? "cursor-pointer" : ""}`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-4 text-sm text-slate-600 ${column.className || ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
