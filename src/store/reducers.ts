import Action from "./actions";
import { IState, ICityInfo } from "../interfaces";

function reducers(state: IState, action: Action) {
  switch (action.type) {
    case "SET_PREFERRED": {
      const items = action.payload.preferred.filter(el => el !== null);
      return { ...state, preferred: items };
    }
    case "ADD_REMOVE": {
      const checked = action.payload.checked;
      const city = action.payload.preferred;
      const preferred = addRemovePreferred(city, state.preferred, checked);
      const selected = addRemoveSelected(city, state.selected, checked);

      return { ...state, preferred, selected };
    }
    case "SET_SELECTED": {
      return { ...state, selected: action.payload.selected };
    }
    default:
      return state;
  }
}

function addRemovePreferred(city: ICityInfo, preferred: number[], checked: boolean) {
  let cities = [...preferred];
  if (checked) cities.push(city.geonameid);
  else {
    const index = cities.indexOf(city.geonameid);
    if (index !== -1) cities = [...cities.slice(0, index), ...cities.slice(index + 1)];
  }
  return cities;
}

function addRemoveSelected(city: ICityInfo, selected: ICityInfo[], checked: boolean) {
  let cities = [...selected];
  if (checked) cities.push(city);
  else {
    const index = cities.findIndex((c: ICityInfo) => c.geonameid === city.geonameid);
    if (index !== -1) cities = [...cities.slice(0, index), ...cities.slice(index + 1)];
  }
  return cities;
}

export default reducers;
