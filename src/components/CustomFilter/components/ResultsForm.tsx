import React from "react";
import * as services from "../../../api";
import { useStore } from "../../../store";
import { ICityInfo, IResultsFormProps, IPreferredCity } from "../../../interfaces";
import { Checkbox, FormGroup, FormControl, FormControlLabel } from "@material-ui/core";

// Components
import Loading from "./Loading";
import CustomLabel from "./CustomLabel";

const ResultsForm: React.FunctionComponent<IResultsFormProps> = props => {
  const [state, dispatch] = useStore();
  const { cities, filter, loading, setShowAlert } = props;

  const handleChange = async (city: ICityInfo, checked: boolean) => {
    const preferred: IPreferredCity = { [city.geonameid]: checked };
    try {
      dispatch({ type: "ADD_REMOVE", payload: { preferred: city, checked } });
      await services.savePreferences(preferred);
    } catch (error) {
      setShowAlert(true);
    }
  };

  if (loading) return <Loading />;
  if (cities.length === 0)
    return <span className="no-results">No se han encontrado resultados...</span>;

  return (
    <FormControl required component="fieldset" className="form-control">
      <FormGroup>
        {cities.map((city: ICityInfo) => (
          <FormControlLabel
            key={city.geonameid}
            className="form-label"
            label={<CustomLabel city={city} filter={filter} />}
            control={
              <Checkbox
                className="checkbox"
                name={city.geonameid.toString()}
                checked={state.preferred.includes(city.geonameid)}
                onChange={(_e, checked: boolean) => handleChange(city, checked)}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default ResultsForm;
