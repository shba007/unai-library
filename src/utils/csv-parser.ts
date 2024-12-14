function trimQuotes(value: string) {
  if (value.startsWith('"') || value.startsWith("'")) value = value.slice(1)
  if (value.endsWith('"') || value.endsWith("'")) value = value.slice(0, -1)

  return value
}

export function parseCSV<T>(text: string, options: { delimiter?: string } = { delimiter: ',' }): T[] {
  const delimiter = options.delimiter || ','
  let [keys, ...lines] = text.split('\n').map((line) => line.split(delimiter))
  keys = keys.map((key) => trimQuotes(key))

  const result = lines.map((line) =>
    keys.reduce(
      (acc, key, index) => {
        acc[key] = trimQuotes(line[index] || '')

        return acc
      },
      {} as Record<string, any>
    )
  )

  return result as T[]
}

export function stringifyCSV(value: object, options?: any) {}
