import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // MOST OF IT TAKEN FROM THE "Styled Components" Docs !!!
  // https://styled-components.com/docs/advanced
  // Server Side Rendering -> ServerStyleSheet
  // Waits for the server side rendering of the styled components
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // takes the CSS from the styled components and
    // renders it out to the server
    const page = renderPage(
      // eslint-disable-next-line react/jsx-props-no-spreading
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );
    // Gets the styled tags and gathers all of the CSS
    const styleTags = sheet.getStyleElement();
    // console.log(styleTags);
    return { ...page, styleTags };
    // In case of console warning for className mismatch
    // between the Server and the Client delete
    // frontend/.next file containing the cache
  }

  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
