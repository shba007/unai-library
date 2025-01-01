export default function formatJSONSchema(model: 'Ollama' | 'Google' | 'OpenAI', obj: object | string): any {
  if (typeof obj === 'string') {
    return model === 'Google' ? obj.toUpperCase() : obj
  }

  if (Array.isArray(obj)) {
    return obj.map((obj) => formatJSONSchema(model, obj))
  }

  if (typeof obj === 'object' && obj !== null) {
    const updatedObj = {}
    for (const key in obj) {
      if ((model === 'Google' && (key === 'required' || key === 'additionalProperties')) || key === '$schema' || key === 'format' || key === 'minLength') {
        continue
      }
      // @ts-ignore
      updatedObj[key] = formatJSONSchema(model, obj[key])
    }
    return updatedObj
  }

  return obj
}
