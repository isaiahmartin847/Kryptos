const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const deleteSavedStock = async (savedStockId: number): Promise<any> => {
  const response = await fetch(`${apiUrl}/saved/${savedStockId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Unable to delete saved stock");
  }

  return response.json();
};
