import React from "react";
import { IAppProps } from "./interfaces";
import CustomFilter from "./components/CustomFilter";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import "./css/styles.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(",")
  }
});

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-app">
        <CustomFilter />
      </div>
    </ThemeProvider>
  );
};

export default App;
