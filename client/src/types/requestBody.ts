interface Meta {
  version: string;
}

interface Data<T> {
  items: T[];
  meta: Meta;
}

export interface ApiResponse<T> {
  status: string;
  data: Data<T>;
}
