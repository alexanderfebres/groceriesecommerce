export const updateState = (oldObject, updatedPoperties) => {
  return {
    ...oldObject,
    ...updatedPoperties,
  };
};
