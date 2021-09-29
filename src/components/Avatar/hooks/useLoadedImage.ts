import { useCallback, useEffect, useState } from "react"

const useLoadedImage = (
  source?: string,
  sourceSet?: string
): "error" | "iddle" | "loaded" | "nosource" => {
  const [status, setStatus] = useState<
    "error" | "iddle" | "loaded" | "nosource"
  >("iddle")

  const setLoaded = useCallback(() => {
    setStatus("loaded")
    console.log("loaded")
  }, [])
  const setError = useCallback(() => {
    setStatus("error")
    console.log("error")
  }, [])

  useEffect(() => {
    if (!source) {
      setStatus("nosource")
      return
    }
    const image = new Image()

    image.addEventListener("load", setLoaded)

    image.addEventListener("error", setError)
    image.src = source
    if (sourceSet) image.srcset = sourceSet
  }, [setError, setLoaded, source, sourceSet])

  return status
}

export { useLoadedImage }
