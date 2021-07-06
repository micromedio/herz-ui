{
  "presets": [
    [
      "@babel/preset-env", {
        "loose": true,
        "modules": false
      }
    ],
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "react"
      }
    ]
  ]
}
