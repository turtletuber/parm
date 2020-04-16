export interface NameResponse {
  id: string;
  dateModified: string;
  name: string;
  epitaph: string;
  obituary: string;
  dateDeceased: string;
  country: string;
  province: string;
  town: string;
  image: string;
  wasHealthWorker: boolean;
  dateBorn: string;
}

const nameDefault = {
  id: '',
  dateModified: '',
  name: '',
  epitaph: '',
  obituary: '',
  dateDeceased: '',
  country: '',
  province: '',
  town: '',
  image: '',
  wasHealthWorker: '',
  dateBorn: '',
}

export interface NameArgs extends NameResponse {
  number?: number;
}

export const Name = ({
  ...args
}: Partial<NameArgs>) => ({
  ...nameDefault,
  ...args,
});
export type Name = ReturnType<typeof Name>