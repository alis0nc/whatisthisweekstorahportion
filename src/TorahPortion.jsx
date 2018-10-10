import React, { Component } from "react";
import { Header } from "semantic-ui-react";

class TorahPortion extends Component {
  render() {
    const { title } = this.props;
    return <Header as="h1">{title}</Header>;
  }
}

export default TorahPortion;
