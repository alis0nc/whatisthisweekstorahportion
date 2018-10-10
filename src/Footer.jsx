import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <Container className="footer">
        An <a href="https://alisonc.net/">Alison Chan</a> production.
      </Container>
    );
  }
}

export default Footer;
