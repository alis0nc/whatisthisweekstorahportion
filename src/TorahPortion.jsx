import React, { Component } from "react";
import { Header } from "semantic-ui-react";

const today = new Date();
const nextShabbat = new Date(today);
nextShabbat.setDate(today.getDate() + (6 + 7 - today.getDay()) % 7);
console.log(nextShabbat);
const url = `https://www.hebcal.com/hebcal/?v=1&cfg=json&s=on&year=${nextShabbat.getFullYear()}&month=${nextShabbat.getMonth() +
  1}&ss=on&geo=none`;

const parshaFilter = apiResponse => {
  const nextParsha = apiResponse.items
    .filter(item => new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  return nextParsha;
};

const parseHelper = parshaDesc => {
  const parshaParts = /([a-z]+) (\d+):(\d+) - (\d+):(\d+)/gi.exec(parshaDesc);
  return {
    sefer: parshaParts[1],
    sc: parshaParts[2],
    sv: parshaParts[3],
    ec: parshaParts[4],
    ev: parshaParts[5]
  };
};

class TorahPortion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      englishTitle: null,
      hebrewTitle: null,
      sefer: null,
      startChapter: null,
      startVerse: null,
      endChapter: null,
      endVerse: null
    };
  }

  componentDidMount() {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(res => {
        const p = parshaFilter(res);
        const { sefer, sc, sv, ec, ev } = parseHelper(p.leyning.torah);
        this.setState({
          englishTitle: p.title,
          hebrewTitle: p.hebrew,
          sefer: sefer,
          startChapter: sc,
          startVerse: sv,
          endChapter: ec,
          endVerse: ev
        });
      });
  }

  render() {
    const { englishTitle } = this.state;
    return <Header as="h1">{englishTitle}</Header>;
  }
}

export default TorahPortion;
