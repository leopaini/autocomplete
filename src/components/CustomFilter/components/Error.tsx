import React from "react";
import { IErrorProps } from "../../../interfaces";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import styles from "./Error.module.css";

const Error: React.FunctionComponent<IErrorProps> = () => {
  return (
    <div className={styles.error}>
      <span className={styles.icon}>
        <ErrorOutlineIcon />
      </span>
      <span className={styles.text}>
        Ha ocurrido un error inesperado, vuelva a intentar en unos instantes...
      </span>
    </div>
  );
};

export default Error;
