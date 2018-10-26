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
      lang: "en",
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

  switchLanguage(event) {
    event.preventDefault();
    this.setState((prevState, props) => {
      return { lang: prevState.lang === "en" ? "he" : "en" };
    });
  }

  render() {
    const {
      lang,
      englishTitle,
      hebrewTitle,
      sefer,
      startChapter,
      startVerse,
      endChapter,
      endVerse
    } = this.state;

    const ribbonStyle = {
      position: "absolute",
      top: 0,
      right: 0,
      border: 0
    };

    const rtl = {
      direction: "rtl"
    };

    const ltr = {
      direction: "ltr"
    };

    return (
      <Container className="content" style={lang === 'en' ? ltr : rtl}>
        <p>
          {lang === "en" ? "This week's Torah portion is" : "פרשת השבוע היא"}
        </p>
        <TorahPortion title={lang === "en" ? englishTitle : hebrewTitle} />
        <ReadButtons
          lang={lang}
          parsha={englishTitle}
          sefer={sefer}
          startChapter={startChapter}
          startVerse={startVerse}
          endChapter={endChapter}
          endVerse={endVerse}
        />
        <Footer lang={lang} switchLanguage={(event) => this.switchLanguage(event)} />
        <a href="https://github.com/alis0nc/whatisthisweekstorahportion">
          <img
            style={ribbonStyle}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
            alt="Fork me on GitHub"
          />
        </a>
      </Container>
    );
  }
}

export default App;
