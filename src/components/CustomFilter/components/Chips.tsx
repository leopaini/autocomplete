import cx from "classnames";
import * as services from "../../../api";
import { useStore } from "../../../store";
import React, { useEffect, useState } from "react";
import { Paper, Chip, CircularProgress } from "@material-ui/core";
import { ICityInfo, IChipsProps, IPreferredCity } from "../../../interfaces";

import styles from "./Chips.module.css";

const Chips: React.FunctionComponent<IChipsProps> = props => {
  const { setShowAlert } = props;
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (state.selected.length === 0) {
      const promises = state.preferred.map((id: number) => services.getCityById(id));
      Promise.all(promises)
        .then((selected: ICityInfo[]) => {
          dispatch({ type: "SET_SELECTED", payload: { selected } });
        })
        .catch(() => setShowAlert(true))
        .finally(() => setLoading(false));
    }
  }, [dispatch, setShowAlert, state.preferred, state.selected]);

  const handleDelete = async (city: ICityInfo) => {
    const preferred: IPreferredCity = { [city.geonameid]: false };
    try {
      dispatch({ type: "ADD_REMOVE", payload: { preferred: city, checked: false } });
      await services.savePreferences(preferred);
    } catch (error) {
      setShowAlert(true);
    }
  };

  if (!loading && state.selected.length === 0) return null;
  return (
    <>
      <h3 className={styles.title}>Your Selection</h3>
      <Paper
        component="ul"
        className={cx(styles.listMenu, loading ? styles.loading : null)}>
        <div className={styles.loader}>
          <CircularProgress size={20} className={styles.spinner} />
          <span className={styles.text}>Loading preferred...</span>
        </div>

        {state.selected.map((city: ICityInfo) => (
          <li key={city.geonameid} className={styles.listItem}>
            <Chip
              label={city.name}
              className="chip-item"
              onDelete={() => handleDelete(city)}
            />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default Chips;
