export const getUniqueItems = (items: any[]) => {
  let uniqueItems = items.reduce((accumulator: any, currentValue: any) => {
    // Check if the ID of the current object is already in the accumulator
    let existingObject = accumulator.find((obj: any) => obj.id === currentValue.id);
    // If the ID is not in the accumulator, add the current object
    if (!existingObject) {
      accumulator.push(currentValue);
    }
    // Return the accumulator
    return accumulator;
  }, []);
  return uniqueItems
}