const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

const DeleteSavedStock = async (savedStockId: number): Promise<any> => {
  const response = await fetch(`${apiUrl}/save/${savedStockId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete saved stock");
  }

  return response.json();
};
