export const getDataLocal = (name: string) => {
  const getData = localStorage.getItem(name);

  if (getData) {
    return getData;
  }
  return null;
};
