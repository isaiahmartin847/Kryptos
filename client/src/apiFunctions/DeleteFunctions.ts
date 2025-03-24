const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const deleteSavedStock = async (savedStockId: number): Promise<any> => {
  const response = await fetch(`${apiUrl}/saved/${savedStockId}`, {
    method: "DELETE",
  });

  console.log(`saved stock id: ${savedStockId} one that was passed ${0}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || errorData?.error || "Unable to Save stock",
    );
  }

  return response.json();
};
