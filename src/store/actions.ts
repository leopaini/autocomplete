import { ICityInfo } from "../interfaces";

type Action =
  | {
      type: "SET_PREFERRED";
      payload: {
        preferred: number[];
      };
    }
  | {
      type: "ADD_REMOVE";
      payload: {
        preferred: ICityInfo;
        checked: boolean;
      };
    }
  | {
      type: "SET_SELECTED";
      payload: {
        selected: ICityInfo[];
      };
    };

export default Action;
