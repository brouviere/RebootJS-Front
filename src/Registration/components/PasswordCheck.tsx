import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

interface PasswordCheckProps {
  check: boolean;
  text: string;
  
}

class PasswordCheck extends React.Component<PasswordCheckProps> {
  render() {
    return (
      <Fragment>
        <Typography
          style={{ marginLeft: "0.2rem", fontSize: "0.8rem", color: (this.props.check ? "green" : "red") }}
        >
          { this.props.check ? <CheckCircleOutlineIcon /> : <BlockIcon /> } {this.props.text}
        </Typography>
      </Fragment>
    );
  }
}

export default PasswordCheck;