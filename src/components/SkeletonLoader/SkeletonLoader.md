### Skeleton loader

```jsx
<>
  <div sx={{ display: "flex", maxWidth: "600px", height: "50px" }}>
    <SkeletonLoader width="230" height="20" />
    <SkeletonLoader width="130" height="20" left="10" />
  </div>
  <div sx={{ display: "flex", maxWidth: "600px", height: "50px" }}>
    <SkeletonLoader width="230" height="20" />
    <SkeletonLoader width="130" height="20" left="10" />
  </div>
  <div sx={{ display: "flex", maxWidth: "600px", height: "30px" }}>
    <SkeletonLoader width="30" height="30" variant="circle" />
    <SkeletonLoader width="230" height="30" left="20" />
  </div>
</>
```
