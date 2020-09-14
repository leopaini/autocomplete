import axios from "axios";
import * as services from "../../api";
import { useStore } from "../../store";
import React, { useEffect, useState } from "react";
import { ICityInfo, ICustomFilterProps } from "../../interfaces";

// Material UI
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

// Components
import Chips from "./components/Chips";
import Error from "./components/Error";
import ResultsForm from "./components/ResultsForm";

// Styles
import "./styles.css";
import styles from "./CustomFilter.module.css";

const CustomFilter: React.FunctionComponent<ICustomFilterProps> = () => {
  const [state, dispatch] = useStore();
  const [error, setError] = useState<boolean>(false);
  const [cities, setCities] = useState<ICityInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string | undefined>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const promises = [services.getCities(10), services.getPreferences()];
    Promise.all(promises)
      .then(results => {
        const [cities, preferred] = results;
        setCities(cities);
        dispatch({ type: "SET_PREFERRED", payload: { preferred } });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value === "" ? undefined : e.target.value);
    getCities(filter);
  };

  const getCities = async (filter?: string): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await services.getCities(10, filter);
      setCities(response);
      setLoading(false);
    } catch (error) {
      if (!(error instanceof axios.Cancel)) {
        setLoading(false);
        setError(true);
      }
    }
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <>
      <form className={styles.customForm} noValidate autoComplete="off">
        {state.preferred.length > 0 && <Chips setShowAlert={setShowAlert} />}

        <TextField
          label="Search"
          variant="outlined"
          className="text-field"
          onChange={handleTextChange}
        />

        {error ? (
          <Error />
        ) : (
          <>
            <h3 className={styles.title}>Search Results</h3>
            <ResultsForm
              cities={cities}
              filter={filter}
              loading={loading}
              setShowAlert={setShowAlert}
            />
          </>
        )}
      </form>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}>
        <Alert onClose={() => setShowAlert(false)} severity="error">
          Lo sentimos, ha ocurrido un error inesperado, vuelva a intentar en unos
          segundos...
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomFilter;
