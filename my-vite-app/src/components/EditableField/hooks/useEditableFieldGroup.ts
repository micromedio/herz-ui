import { useContext } from "react"
import { EditableFieldGroupContext } from "../Group/Context"

export default function useEditableFieldGroup() {
  const context = useContext(EditableFieldGroupContext)
  return context
}
