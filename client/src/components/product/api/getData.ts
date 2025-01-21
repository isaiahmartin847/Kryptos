import HuntingUnit from "@/types/huntingUnit";
import Species from "@/types/species";
import State from "@/types/state";

export const fetchStates = async (): Promise<State[]> => {
  const response = await fetch("http://localhost:8080/states");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchSpeciesByStateID = async (
  stateID: number
): Promise<Species[]> => {
  const response = await fetch(
    `http://localhost:8080/species?stateID=${stateID}`
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
    `http://localhost:8080/hunting-units?speciesID=${speciesID}`
  );
  if (!response.ok) {
    throw new Error("Unable to fetch the hunting units");
  }
  return response.json();
};
