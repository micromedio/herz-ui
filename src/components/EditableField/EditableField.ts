import Group from "./Group/Group"
import Text from "./Text/Text"
import Select from "./Select/Select"
import Autocomplete from "./Autocomplete/Autocomplete"
export type { EditableFieldAutocompleteProps } from "./Autocomplete/Autocomplete"
export type { EditableFieldGroupProps } from "./Group/Group"
export type { EditableFieldTextProps } from "./Text/Text"
export type { EditableFieldSelectProps } from "./Select/Select"

const EditableField = {
  Autocomplete,
  Group,
  Select,
  Text,
}

export default EditableField
