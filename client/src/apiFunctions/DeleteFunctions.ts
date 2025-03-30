import { MsgResponse } from "@/types/responses";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const deleteSavedStock = async (
  savedStockId: number,
): Promise<MsgResponse> => {
  const response = await fetch(`${apiUrl}/saved/${savedStockId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || errorData?.error || "Unable to Save stock",
    );
  }

  return response.json();
};
