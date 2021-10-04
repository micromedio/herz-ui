/** @jsxImportSource theme-ui */
import React from "react"
import ContentLoader from "react-content-loader"
import Divider from "../Divider/Divider"

const SidePanelSkeleton = () => {
  return (
    <>
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="200" height="28" />
        <rect x="333" y="3" rx="4" ry="4" width="51" height="20" />
      </ContentLoader>
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="264" y="0" rx="4" ry="4" width="120" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 52">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 68">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
        <rect x="172" y="24" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
      <ContentLoader viewBox="0 -16 384 68">
        <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
        <rect x="172" y="0" rx="4" ry="4" width="212" height="20" />
        <rect x="172" y="24" rx="4" ry="4" width="212" height="20" />
      </ContentLoader>
      <Divider />
    </>
  )
}

export default SidePanelSkeleton
