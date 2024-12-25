export const convertToString = (arr: any[]): string => {
  try {
    return JSON.stringify(arr);
  } catch (error) {
    console.error("Error converting array to string:", error);
    return "[]";
  }
};

export const convertToArray = <T>(str: string): T[] => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("Error converting string to array:", error);
    return [];
  }
};
