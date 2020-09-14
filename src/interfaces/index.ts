// Api Response
export interface IApiResponse {
  data: ICityInfo[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
  filter?: string;
}

export interface IPreferredCitiesResponse {
  data: number[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
}

export interface ICityInfo {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
}

export interface IPreferredCity {
  [key: string]: boolean;
}

// Components
export interface IAppProps {}
export interface IErrorProps {}
export interface ILoadingProps {}
export interface ICustomFilterProps {}

export interface IChipsProps {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICustomLabelProps {
  city: ICityInfo;
  filter: string | undefined;
}

export interface IResultsFormProps {
  loading: boolean;
  cities: ICityInfo[];
  filter: string | undefined;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

// Store
export interface IState {
  preferred: number[];
  selected: ICityInfo[];
}

export interface IProviderProps {
  children: React.ReactNode;
}
