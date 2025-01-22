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
