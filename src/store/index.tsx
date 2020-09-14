import React from "react";
import Action from "./actions";
import reducers from "./reducers";
import { initialState } from "./initialData";
import { IState, IProviderProps } from "../interfaces";

export type Dispatch = (action: Action) => void;
export type Store = [IState, Dispatch];

const State = React.createContext<IState | undefined>(undefined);
const Dispatch = React.createContext<Dispatch | undefined>(undefined);

export function StoreProvider(props: IProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(reducers, initialState);

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{props.children}</Dispatch.Provider>
    </State.Provider>
  );
}

export function useState() {
  const context = React.useContext(State);
  if (context === undefined) {
    throw new Error("useState must be used within a Provider");
  }
  return context;
}

export function useDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a Provider");
  }
  return context;
}

export function useStore(): Store {
  return [useState(), useDispatch()];
}
