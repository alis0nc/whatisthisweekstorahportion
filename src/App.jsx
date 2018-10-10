import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import TorahPortion from "./TorahPortion";
import ReadButtons from "./ReadButtons";
import Footer from "./Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Container textAlign="center" className="content">
        <p>This week's Torah portion is...</p>
        <TorahPortion />
        <ReadButtons />
        <Footer />
      </Container>
    );
  }
}

export default App;
