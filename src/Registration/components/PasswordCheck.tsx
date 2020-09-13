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
    return this.props.check ? (
      <Fragment>
        <Typography
          style={{ marginLeft: "0.2rem", fontSize: "0.8rem", color: "green" }}
        >
          <CheckCircleOutlineIcon />{this.props.text}
        </Typography>
      </Fragment>
    ) : (
      <Fragment>
        <Typography
          style={{ marginLeft: "0.2rem", fontSize: "0.8rem", color: "red" }}
        >
          <BlockIcon />{this.props.text}
        </Typography>
      </Fragment>
    );
  }
}

export default PasswordCheck;