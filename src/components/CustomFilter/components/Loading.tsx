import React from "react";
import { ILoadingProps } from "../../../interfaces";
import { CircularProgress } from "@material-ui/core";

import styles from "./Loading.module.css";

const Loading: React.FunctionComponent<ILoadingProps> = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress className={styles.spinner} />
      <span className={styles.text}>Loading results...</span>
    </div>
  );
};

export default Loading;
