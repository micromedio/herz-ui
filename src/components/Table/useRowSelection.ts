import { useCallback, useMemo, useState } from "react"

interface UseRowSelectionProps {
  selectedRowIds?: Record<string, boolean>
  onChange?: (rowIds: Record<string, boolean>) => void
}

const useRowSelection = ({
  selectedRowIds: controlledSelectedRowIds,
  onChange,
}: UseRowSelectionProps) => {
  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<
    Record<string, boolean>
  >({})
  const isControlled = controlledSelectedRowIds !== undefined

  const selectedRowIds = useMemo(() => {
    if (controlledSelectedRowIds !== undefined) return controlledSelectedRowIds
    return internalSelectedRowIds
  }, [internalSelectedRowIds, controlledSelectedRowIds])

  const toggleRowSelected = useCallback(
    (rowId) => {
      const newValue = { ...selectedRowIds }
      if (newValue[rowId]) {
        delete newValue[rowId]
      } else {
        newValue[rowId] = true
      }

      if (isControlled) onChange?.(newValue)
      else setInternalSelectedRowIds(newValue)
    },
    [selectedRowIds, onChange, isControlled]
  )

  const setRowsSelected = useCallback(
    (rowIds, value) => {
      const newValue = { ...selectedRowIds }
      for (const rowId of rowIds) {
        if (value) {
          newValue[rowId] = true
        } else {
          delete newValue[rowId]
        }
      }

      if (isControlled) onChange?.(newValue)
      else setInternalSelectedRowIds(newValue)
    },
    [selectedRowIds, onChange, isControlled]
  )

  return {
    selectedRowIds,
    toggleRowSelected,
    setRowsSelected,
  }
}

export default useRowSelection
