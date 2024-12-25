export const shortenString = (str: string, strLength = 20) => {
  if (str.length > strLength) {
    return str.slice(0, strLength) + "...";
  }

  return str;
};
