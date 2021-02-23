import { useCallback, useMemo, useState } from "react"

interface UseRowSelectionProps {
  // initial selectedRowIds
  selectedRowIds?: Record<string, boolean>
  // callback called when selectedRows change, hook is controlled if this is not undefined
  onChange?: (rowIds: Record<string, boolean>) => void
}

const useRowSelection = ({
  selectedRowIds: controlledSelectedRowIds = {},
  onChange,
}: UseRowSelectionProps = {}) => {
  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<
    Record<string, boolean>
  >(controlledSelectedRowIds)
  const isControlled = onChange !== undefined

  const selectedRowIds = useMemo(() => {
    if (isControlled) return controlledSelectedRowIds
    return internalSelectedRowIds
  }, [internalSelectedRowIds, controlledSelectedRowIds, isControlled])

  const toggleRowSelected = useCallback(
    (rowId: string | number) => {
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
    (rowIds: Array<string | number>, value: boolean) => {
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
