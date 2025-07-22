"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Eye, Trash2 } from "lucide-react"

export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, row?: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onView?: (item: T) => void
}

export function DataTable<T>({
  data,
  columns,
  searchKey,
  onEdit,
  onDelete,
  onView,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredData = React.useMemo(() => {
    if (!searchKey) return data
    return data.filter((item) => {
      const value = item[searchKey]
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [data, searchKey, searchTerm])

  return (
    <div className="space-y-4">
      {searchKey && (
        <input
          type="text"
          placeholder={`Search by ${searchKey.toString()}`}
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key.toString()} className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key.toString()} className="px-4 py-2 text-sm text-gray-900">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="px-4 py-2 space-x-2">
                    {onView && (
                      <Button variant="outline" size="sm" onClick={() => onView(row)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="destructive" size="sm" onClick={() => onDelete(row)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-4 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
