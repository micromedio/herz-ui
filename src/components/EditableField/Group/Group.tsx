/** @jsxRuntime classic /
/** @jsx jsx */
import React, { memo, RefObject, useCallback, useReducer } from "react"
import { jsx } from "theme-ui"
import {
  EditableFieldGroupContext,
  EditableFieldGroupContextArguments,
} from "./Context"

interface ReducerState {
  isFocused: boolean
  hasChanged: boolean
  fields: Record<
    string,
    {
      ref: RefObject<HTMLElement>
      reset: () => void
      value?: unknown
      defaultValue?: unknown
    }
  >
}

const initialState: ReducerState = {
  isFocused: false,
  hasChanged: false,
  fields: {},
}

export enum Actions {
  Focus,
  Blur,
  Reset,
  Register,
  Changed,
}

type ReducerAction =
  | { type: Actions.Focus }
  | {
      type: Actions.Blur
      payload: { event?: React.FocusEvent<HTMLElement>; reset?: boolean }
    }
  | {
      type: Actions.Reset
    }
  | {
      type: Actions.Register
      payload: {
        name: string
        ref: React.RefObject<HTMLElement>
        reset: () => void
      }
    }
  | {
      type: Actions.Changed
      payload: {
        name: string
        value: unknown
        defaultValue: unknown
      }
    }

function reducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case Actions.Focus: {
      return { ...state, isFocused: true }
    }
    case Actions.Reset: {
      Object.values(state.fields).forEach((field) => setTimeout(field.reset))
      return { ...state, isFocused: false }
    }
    case Actions.Blur: {
      const { event, reset = false } = action.payload
      if (event) {
        const toElement = event.relatedTarget
        // const fromElement = event.target

        const blurredInside = Object.values(state.fields).some(
          (field) =>
            toElement && field.ref.current?.contains(toElement as Element)
        )

        if (!blurredInside && reset) {
          // reset EditableFields values on next tick
          Object.values(state.fields).forEach((field) =>
            setTimeout(field.reset)
          )
        }
      }
      return { ...state, isFocused: false }
    }
    case Actions.Register: {
      const { name, ref, reset } = action.payload
      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: { ...state.fields[name], ref, reset },
        },
      }
    }
    case Actions.Changed: {
      const { name, value, defaultValue } = action.payload

      const newState = {
        ...state,
        fields: {
          ...state.fields,
          [name]: { ...state.fields[name], value, defaultValue },
        },
      }
      const hasChanged = Object.values(newState.fields).some(
        (field) =>
          JSON.stringify(field.value) !== JSON.stringify(field.defaultValue)
      )
      return {
        ...newState,
        hasChanged,
      }
    }
    default: {
      return state
    }
  }
}

export interface EditableFieldGroupProps {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (values: Record<string, any>) => void
  saveOnBlur?: boolean
  resetOnBlur?: boolean
  status?: "error" | "success" | "loading"
}

const EditableFieldGroup = ({
  children,
  onSave,
  saveOnBlur = false,
  resetOnBlur = true,
  status,
}: EditableFieldGroupProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const register = useCallback<
    Required<EditableFieldGroupContextArguments>["register"]
  >(({ name, ref, reset }) => {
    dispatch({ type: Actions.Register, payload: { name, ref, reset } })
  }, [])

  const onFocus = useCallback<
    Required<EditableFieldGroupContextArguments>["onFocus"]
  >(() => {
    dispatch({ type: Actions.Focus })
  }, [])

  const onGroupSave = useCallback<
    Required<EditableFieldGroupContextArguments>["onSave"]
  >(() => {
    onSave?.(
      // eslint-disable-next-line unicorn/no-array-reduce
      Object.entries(state.fields).reduce((result, [name, { value }]) => {
        return {
          ...result,
          [name]: value,
        }
      }, {})
    )
    dispatch({ type: Actions.Blur, payload: {} })
  }, [onSave, state.fields])

  const onBlur = useCallback<
    Required<EditableFieldGroupContextArguments>["onBlur"]
  >(
    (event) => {
      if (saveOnBlur) {
        onGroupSave()
      } else {
        dispatch({ type: Actions.Blur, payload: { event, reset: resetOnBlur } })
      }
    },
    [onGroupSave, resetOnBlur, saveOnBlur]
  )

  const onChange = useCallback<
    Required<EditableFieldGroupContextArguments>["onChange"]
  >(({ name, value, defaultValue }) => {
    dispatch({ type: Actions.Changed, payload: { name, value, defaultValue } })
  }, [])

  const onReset = useCallback<
    Required<EditableFieldGroupContextArguments>["onReset"]
  >(() => {
    dispatch({ type: Actions.Reset })
  }, [])

  return (
    <EditableFieldGroupContext.Provider
      value={{
        register,
        isFocused: state.isFocused,
        hasChanged: state.hasChanged,
        onFocus,
        onBlur,
        onChange,
        onSave: onGroupSave,
        onReset,
        status,
      }}
    >
      {children}
    </EditableFieldGroupContext.Provider>
  )
}

export default memo(EditableFieldGroup)
