export interface Session {
  ID: number;
  State: string;
  Species: string;
  HuntingUnit: string;
  CreatedAt: string;
}

export interface SessionPostBody {
  UserID: string;
  StateID: number;
  SpeciesID: number;
  HuntingUnitID: number;
}

export interface SessionResponse {
  id: string;
  stateID: number;
  stateFullName: string;
  speciesID: number;
  speciesName: string;
  huntingUnitID: number;
  huntingUnitName: string;
  createdAt: Date;
  expiresAt: Date;
}
