const isSeparator = (value: string): boolean =>
  value === '/' || value === '\\' || value === ':'

export const getExtension = (path: string): string => {
  for (let i = path.length - 1; i > -1; --i) {
    const value = path[i]
    if (value === '.') {
      if (i > 1) {
        if (isSeparator(path[i - 1])) {
          return ''
        }
        return path.substring(i + 1)
      }
      return ''
    }
    if (isSeparator(value)) {
      return ''
    }
  }
  return ''
}

export async function GetFileFromFilePath(path: string): Promise<File> {
  let response = await fetch(path)
  let data = await response.blob()
  return new File([data], 'UploadFile')
}
