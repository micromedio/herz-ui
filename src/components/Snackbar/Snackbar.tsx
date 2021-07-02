/** @jsxImportSource theme-ui */

import { useMemo } from "react"
import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import Spinner from "../Spinner/Spinner"

export interface SnackbarProps {
  type: "success" | "error" | "loading"
  title: string
  body?: React.ReactNode
  onClose?: () => void
}

const Snackbar = ({ type, title, body, onClose }: SnackbarProps) => {
  const typeIcon = useMemo(() => {
    switch (type) {
      case "success":
        return (
          <Icon
            name="IconCircleCheck"
            size={20}
            sx={{
              fill: "success",
            }}
          />
        )
      case "error":
        return (
          <Icon
            name="IconCircleX"
            size={20}
            sx={{
              fill: "primary",
            }}
          />
        )
      case "loading":
        return <Spinner size={20} color="secondary" />
    }
  }, [type])

  return (
    <div
      sx={{
        display: "grid",
        gridTemplateAreas: `
          "icon title close"
          ${body ? `"icon body close"` : ""}
        `,
        gridTemplateColumns: "auto 1fr auto",
        rowGap: 2,
        columnGap: 3,
        padding: 3,
        width: "fit-content",
        backgroundColor: "text",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: 3,
        color: "text.40",
      }}
    >
      <div
        sx={{
          display: "flex",
          gridArea: "icon",
          color: "text",
        }}
      >
        {typeIcon}
      </div>

      <div
        sx={{
          gridArea: "title",
          color: "#fff",
          variant: "text.heading3",
        }}
      >
        {title}
      </div>

      {body && (
        <div
          sx={{
            gridArea: "body",
          }}
        >
          {body}
        </div>
      )}

      {onClose && (
        <div
          sx={{
            gridArea: "close",
          }}
        >
          <Button
            iconName="IconX"
            size="small"
            sx={{
              p: 0,
              width: 20,
              height: 20,
              color: "#fff",
              backgroundColor: "text.40",
              "&&:hover": {
                backgroundColor: "text.70",
              },
              "> svg": {
                width: 14,
                height: 14,
              },
            }}
            onClick={onClose}
          />
        </div>
      )}
    </div>
  )
}

export default Snackbar
