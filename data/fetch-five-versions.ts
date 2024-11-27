import useSWR from "swr"

interface Data {
  latest: string
  versions: string[]
}

export async function fetchFiveVersions() {
  const result = await (
    await fetch("/api/five-npm-info", {
      method: "POST",
    })
  ).json()

  if (result.code !== 0) throw new Error(result.msg)
  return result.data as Data
}

export function useFiveVersions() {
  return useSWR("five-versions", fetchFiveVersions)
}