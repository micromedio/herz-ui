/* eslint-disable react/prop-types */
import Head from "@docusaurus/Head"
import { ThemeWrapper } from "@micromed/herz-ui"
import React from "react"

const Root = ({ children }) => {
  return (
    <ThemeWrapper>
      <Head>
        <link rel="stylesheet" href="https://cndcdn.storage.googleapis.com/stylesheet.css" />
      </Head>
      <>{children}</>
    </ThemeWrapper>
  )
}

export default Root
