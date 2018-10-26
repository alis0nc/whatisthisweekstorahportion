import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import leftpad from "left-pad";

const seferIndex = {
  Genesis: 1,
  Exodus: 2,
  Leviticus: 3,
  Numbers: 4,
  Deuteronomy: 5
};

const parshaIndex = {
  "Parashat Bereshit": 1,
  "Parashat Noach": 2,
  "Parashat Lech-Lecha": 3,
  "Parashat Vayera": 4,
  "Parashat Chayei Sara": 5,
  "Parashat Toldot": 6,
  "Parashat Vayetzei": 7,
  "Parashat Vayishlach": 8,
  "Parashat Vayeshev": 9,
  "Parashat Miketz": 10,
  "Parashat Vayigash": 11,
  "Parashat Vayechi": 12,
  "Parashat Shemot": 13,
  "Parashat Vaera": 14,
  "Parashat Bo": 15,
  "Parashat Beshalach": 16,
  "Parashat Yitro": 17,
  "Parashat Mishpatim": 18,
  "Parashat Terumah": 19,
  "Parashat Tetzaveh": 20,
  "Parashat Ki Tisa": 21,
  "Parashat Vayakhel": 22,
  "Parashat Pekudei": 23,
  "Parashat Vayikra": 24,
  "Parashat Tzav": 25,
  "Parashat Shmini": 26,
  "Parashat Tazria": 27,
  "Parashat Metzora": 28,
  "Parashat Achrei Mot": 29,
  "Parashat Kedoshim": 30,
  "Parashat Emor": 31,
  "Parashat Behar": 32,
  "Parashat Bechukotai": 33,
  "Parashat Bamidbar": 34,
  "Parashat Nasso": 35,
  "Parashat Beha'alotcha": 36,
  "Parashat Sh'lach": 37,
  "Parashat Korach": 38,
  "Parashat Chukat": 39,
  "Parashat Balak": 40,
  "Parashat Pinchas": 41,
  "Parashat Matot": 42,
  "Parashat Masei": 43,
  "Parashat Devarim": 44,
  "Parashat Vaetchanan": 45,
  "Parashat Eikev": 46,
  "Parashat Re'eh": 47,
  "Parashat Shoftim": 48,
  "Parashat Ki Teitzei": 49,
  "Parashat Ki Tavo": 50,
  "Parashat Nitzavim": 51,
  "Parashat Vayeilech": 52,
  "Parashat Ha'Azinu": 53,
  "Parashat Vezot Haberakhah": 54,
  // doubled up parshiyot
  "Parashat Vayakhel-Pekudei": 22,
  "Parashat Tazria-Metzora": 27,
  "Parashat Achrei Mot-Kedoshim": 29,
  "Parashat Behar-Bechukotai": 32,
  "Parashat Chukat-Balak": 39,
  "Parashat Matot-Masei": 42,
  "Parashat Nitzavim-Vayeilech": 51
};

const generateSefariaURL = (sefer, sc, sv, ec, ev) => {
  return `https://www.sefaria.org/${sefer}.${sc}.${sv}-${ec}.${ev}?lang=bi`;
};

const generateMMURL = (sefer, sc) => {
  return `http://mechon-mamre.org/p/pt/pt${leftpad(
    seferIndex[sefer],
    2,
    0
  )}${leftpad(sc, 2, 0)}.htm`;
};

const generateORTURL = (sefer, sc, sv, parsha) => {
  return `http://www.bible.ort.org/books/torahd5.asp?action=displaypage&book=${
    seferIndex[sefer]
  }&chapter=${sc}&verse=${sv}&portion=${parshaIndex[parsha]}`;
};

class ReadButtons extends Component {
  render() {
    const {
      lang,
      parsha,
      sefer,
      startChapter,
      startVerse,
      endChapter,
      endVerse
    } = this.props;
    return (
      <Button.Group vertical>
        <Button
          as="a"
          href={generateSefariaURL(
            sefer,
            startChapter,
            startVerse,
            endChapter,
            endVerse
          )}
          target="_blank"
          content={lang === "en" ? "Read on Sefaria" : "לקרוא בספריא"}
        />
        <Button
          as="a"
          href={generateMMURL(sefer, startChapter)}
          target="_blank"
          content={lang === "en" ? "Read on Mechon-Mamre" : "לקרוא במכון–ממרא"}
        />
        <Button
          as="a"
          href={generateORTURL(sefer, startChapter, startVerse, parsha)}
          target="_blank"
          content={lang === "en" ? "Read on ORT" : "לקרוא באר“ט"}
        />
      </Button.Group>
    );
  }
}

export default ReadButtons;
