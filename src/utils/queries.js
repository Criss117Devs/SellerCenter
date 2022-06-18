export const handleDataOrder = (dataOrder, data) => {
  const response = [];
  dataOrder.forEach((key) => {
    response.push(data[key]);
  });
  return response;
};
