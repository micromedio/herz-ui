import Group from "./Group/EditableFieldGroup"
import Text from "./Text/EditableFieldText"
import Select from "./Select/EditableFieldSelect"
import Autocomplete from "./Autocomplete/EditableFieldAutocomplete"
export type { EditableFieldAutocompleteProps } from "./Autocomplete/EditableFieldAutocomplete"
export type { EditableFieldGroupProps } from "./Group/EditableFieldGroup"
export type { EditableFieldTextProps } from "./Text/EditableFieldText"
export type { EditableFieldSelectProps } from "./Select/EditableFieldSelect"

const EditableField = {
  Autocomplete,
  Group,
  Select,
  Text,
}

export default EditableField
