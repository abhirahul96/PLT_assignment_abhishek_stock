import * as fs from 'fs';

/**
 * Read the content of a file asynchronously and return the data as a string.
 * @param filePath - The path of the file to read
 * @returns Promise that resolves to the file content as a string
 */
export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Read the file using fs.readFile
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // If an error occurs, reject the Promise with the error
        reject(err);
      } else {
        // If successful, resolve the Promise with the file content as a string
        resolve(data);
      }
    });
  });
};
