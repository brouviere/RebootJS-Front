import React from "react";
import { Grid } from "@material-ui/core";
import { IFormPasswordField } from "../../Utils/Types";
import PasswordCheck from "./PasswordCheck";

interface PasswordChecksProps {
  password: IFormPasswordField;
}

class PasswordChecks extends React.Component<PasswordChecksProps> {
  render() {
    const {
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      hasValidLength,
    } = this.props.password;    
    return (
      <Grid
        container
        direction="column"
        alignContent="flex-start"
        style={{ margin: "1rem 0" }}
      >
        <PasswordCheck
          check={hasLower}
          text="Password should contain lowercase letters"
        />
        <PasswordCheck
          check={hasUpper}
          text="Password should contain uppercase letters"
        />
        <PasswordCheck
          check={hasNumber}
          text="Password should contain at least a number"
        />
        <PasswordCheck
          check={hasSymbol}
          text="Password should contain at least a special character ()"
        />
        <PasswordCheck
          check={hasValidLength}
          text="Password should contain at least 8 to 30 characters"
        />
      </Grid>
    );
  }
}

export default PasswordChecks;