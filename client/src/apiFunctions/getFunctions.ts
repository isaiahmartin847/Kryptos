import HuntingUnit from "@/types/huntingUnit";
import Species from "@/types/species";
import State from "@/types/state";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL

export const fetchStates = async (): Promise<State[]> => {
  const response = await fetch(`${apiUrl}/states`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchSpeciesByStateID = async (
  stateID: number
): Promise<Species[]> => {
  const response = await fetch(
    `${apiUrl}/species?stateID=${stateID}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchHuntingUnitBySpeciesID = async (
  speciesID: number
): Promise<HuntingUnit[]> => {
  const response = await fetch(
    `${apiUrl}/hunting-units?speciesID=${speciesID}`
  );
  if (!response.ok) {
    throw new Error("Unable to fetch the hunting units");
  }
  return response.json();
};
