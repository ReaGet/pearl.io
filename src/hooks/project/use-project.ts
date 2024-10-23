import { useState } from "react"

export const useAddProject = () => {
  const [setLoading, loading] = useState(true)

  return {
    loading
  }
}