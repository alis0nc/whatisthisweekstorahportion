import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Footer extends Component {
  render() {
    const { lang, switchLanguage } = this.props;
    return (
      <Container className="footer">
        {lang === "en" ? (
          <p>
            An <a href="https://alisonc.net/">Alison Chan</a> production. Uses
            the <a href="https://hebcal.com/">Hebcal</a> API. (
            <a href="/" onClick={switchLanguage}>
              Hebrew
            </a>
            )
          </p>
        ) : (
          <p>
            הפקה של{" "}
            <a href="https://alisonc.net/">אלונה–סיון לבית אברהם ושרה</a>. משתמש
            בממשק API של <a href="https://hebcal.com/">Hebcal</a>. (
            <a href="/" onClick={switchLanguage}>
              אנגלית
            </a>
            )
          </p>
        )}
      </Container>
    );
  }
}

export default Footer;
