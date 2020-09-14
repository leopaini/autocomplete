import React from "react";
import { ICustomLabelProps } from "../../../interfaces";

import styles from "./CustomLabel.module.css";

const CustomLabel: React.FunctionComponent<ICustomLabelProps> = props => {
  const { city, filter } = props;

  const filterText = (text: string) => {
    if (filter) {
      const index = text.toLowerCase().indexOf(filter.toLowerCase());
      let dangerousHTML = text;
      if (index !== -1) {
        const first = text.slice(0, index);
        const middle = text.slice(index, index + filter.length);
        const last = text.slice(index + filter.length);
        dangerousHTML = `${first}<em>${middle}</em>${last}`;
      }
      return <label dangerouslySetInnerHTML={{ __html: dangerousHTML }} />;
    }
    return text;
  };

  return (
    <div className={styles.label}>
      <span className={styles.city}>{filterText(city.name)}</span>
      <span className={styles.info}>
        {filterText(city.country)} - {city.subcountry && filterText(city.subcountry)}
      </span>
    </div>
  );
};

export default CustomLabel;
