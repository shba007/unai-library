import path from 'pathe'
import { storage } from '..'

/**
 * Recursively creates files and folders for a given path using Unstorage.
 * @param {string} targetPath - The target path to create.
 */
export default async function (targetPath: string) {
  const dirs = targetPath.split(path.sep)
  let currentPath = ''

  for (const dir of dirs) {
    currentPath = path.join(currentPath, dir)

    const exists = await storage.hasItem(currentPath)
    if (!exists) {
      // Check if the current part is a file or directory and create it accordingly
      await storage.setItem(path.extname(currentPath) ? currentPath : currentPath + '/', '')
    }
  }

  return path.resolve(targetPath)
}
