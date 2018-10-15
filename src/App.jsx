import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import startOfWeek from "date-fns/start_of_week";
import addDays from "date-fns/add_days";
import format from "date-fns/format";
import parse from "date-fns/parse";
import isAfter from "date-fns/is_after";
import compareAsc from "date-fns/compare_asc";
import TorahPortion from "./TorahPortion";
import ReadButtons from "./ReadButtons";
import Footer from "./Footer";
import "./App.css";

const today = new Date();
// 5 days from the monday before today, is always this coming shabbat.
// this
const nextShabbat = addDays(startOfWeek(today, { weekStartsOn: 1 }), 5);
const url = `https://www.hebcal.com/hebcal/?v=1&cfg=json&s=on&year=${format(
  nextShabbat,
  "YYYY"
)}&month=${format(nextShabbat, "M")}&ss=on&geo=none`;

const parshaFilter = apiResponse => {
  const nextParsha = apiResponse.items
    .filter(item => isAfter(parse(item.date), today))
    .sort((a, b) => compareAsc(parse(a.date), parse(b.date)))[0];
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

class App extends Component {
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
    return (
      <Container className="content">
        <p>This week's Torah portion is</p>
        <TorahPortion title={this.state.englishTitle} />
        <ReadButtons
          parsha={this.state.englishTitle}
          sefer={this.state.sefer}
          startChapter={this.state.startChapter}
          startVerse={this.state.startVerse}
          endChapter={this.state.endChapter}
          endVerse={this.state.endVerse}
        />
        <Footer />
      </Container>
    );
  }
}

export default App;
