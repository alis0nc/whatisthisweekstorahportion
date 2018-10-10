import React, { Component } from "react";
import {Button} from "semantic-ui-react";

class ReadButtons extends Component {
  render() {
    return (
        <div>
        <Button content="Read on Sefaria" />
        <Button content="Read on Mechon-Mamre" />
        <Button content="Read on ORT" />
        </div>
    );
  }
}

export default ReadButtons;
