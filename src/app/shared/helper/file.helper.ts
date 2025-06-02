export const getFileName = (path: string): string => {
  const encodedFileName = path.substring(path.lastIndexOf('/') + 1);
  const decodedFileName = decodeURIComponent(encodedFileName);

  return decodedFileName.substring(0, decodedFileName.lastIndexOf('.'));
};

export const getFileNameWithExtension = (path: string): string => {
    const encodedFileName = path.substring(path.lastIndexOf('/') + 1);

    return decodeURIComponent(encodedFileName);
  }
