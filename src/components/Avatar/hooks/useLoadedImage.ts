import { useCallback, useEffect, useState } from "react"

const useLoadedImage = (
  source?: string,
  sourceSet?: string
): "error" | "idle" | "loaded" | "nosource" => {
  const [status, setStatus] = useState<
    "error" | "idle" | "loaded" | "nosource"
  >("idle")

  const setLoaded = useCallback(() => {
    setStatus("loaded")
  }, [])
  const setError = useCallback(() => {
    setStatus("error")
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
