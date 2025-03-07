export function mergeObject(target: Record<string, any>, ...sources: Array<Record<string, any>>) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const value = source[key]
      const targetValue = target[key]

      if (isObject(value)) {
        if (!isObject(targetValue)) {
          target[key] = {}
        }
        mergeObject(target[key], value)
      } else {
        target[key] = value
      }
    }
  }
  return target
}

export function id() {
  return Math.random().toString(36).substring(2)
}

export function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export type Result<T = unknown, E = unknown> = Ok<T> | Err<E>

export class Ok<T> {
  readonly ok = true
  constructor(public val: T) { }
}

export class Err<E> {
  readonly ok = false
  constructor(public val: E) { }
}

export function arrayBufferToText(buffer: ArrayBuffer) {
  const textDecoder = new TextDecoder('utf-8')
  return textDecoder.decode(buffer)
}

export function arrayBufferToJSON(buffer: ArrayBuffer) {
  return JSON.parse(arrayBufferToText(buffer))
}

export function arrayBufferToBlob(buffer: ArrayBuffer) {
  return new Blob([buffer])
}

export function arrayBufferToFormData(buffer: ArrayBuffer, fieldName: string, fileName: string) {
  const blob = arrayBufferToBlob(buffer)
  const formData = new FormData()
  formData.append(fieldName, blob, fileName)
  return formData
}
