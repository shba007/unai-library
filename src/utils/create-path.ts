import fs from 'node:fs'
import path from 'pathe'

/**
 * Recursively creates files and folders for a given path.
 * @param {string} targetPath - The target path to create.
 */
export default function (targetPath: string) {
  const dirs = targetPath.split(path.sep)
  let currentPath = ''

  for (const dir of dirs) {
    currentPath = path.join(currentPath, dir)

    if (!fs.existsSync(currentPath)) {
      // Check if the current part is a file or directory
      if (path.extname(currentPath)) {
        // If it's a file, create it and break out
        fs.writeFileSync(currentPath, '', { flag: 'w' })
      } else {
        // If it's a directory, create it
        fs.mkdirSync(currentPath)
      }
    }
  }

  return path.resolve(targetPath)
}
