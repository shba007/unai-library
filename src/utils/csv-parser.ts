function trimQuotes(value: string) {
  if (value.startsWith('"') || value.startsWith("'")) value = value.slice(1)
  if (value.endsWith('"') || value.endsWith("'")) value = value.slice(0, -1)

  return value
}

export function parseCSV<T>(text: string, options: { delimiter?: string } = {}): T[] {
  const delimiter = options.delimiter ?? ','
  const [keys, ...lines] = text.split('\n').map((line) => line.split(delimiter))
  const trimmedKeys = keys.map((key) => trimQuotes(key))

  return lines.map((line) => {
    const parsedLine: Record<string, string> = {}

    for (const [index, key] of trimmedKeys.entries()) {
      const cellValue = line[index] || ''
      parsedLine[key] = trimQuotes(cellValue)
    }

    return parsedLine as T
  })
}

export function stringifyCSV(
  data: object[],
  options: {
    delimiter?: string
    headers?: boolean
  } = {}
): string {
  const { delimiter = ',', headers = true } = options

  const keys = Object.keys(data[0] || {})

  const quote = (value: any): string => {
    if (value == undefined) return ''
    const str = String(value)
    return str.includes(delimiter) || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
  }

  const rows = data.map((obj: any) => {
    return keys.map((key) => quote(obj[key])).join(delimiter)
  })

  return headers ? [keys.map((key) => quote(key)).join(delimiter), ...rows].join('\n') : rows.join('\n')
}
