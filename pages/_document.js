/* eslint-disable react/no-danger */

import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import htmlescape from 'htmlescape';
import Document, { Head, Main, NextScript } from 'next/document';

import getContext from '../styles/get-context';

const { GOOGLE_API_KEY } = process.env;
const env = { GOOGLE_API_KEY };

export default class ExtendedDocument extends Document {
  static getInitialProps(ctx) {
    const context = getContext();
    const { sheetsRegistry, jss } = context;

    const page = ctx.renderPage(Component => props => (
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <Component {...props} />
      </JssProvider>
    ));

    return {
      ...page,
      stylesContext: context,
      styles: (
        <style
          id="jss-server-side"
          dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }} // eslint-disable-line react/no-danger
        />
      ),
    };
  }

  render() {
    return (
      <html>
        <Head>
          <title>When To Call</title>
          <meta charSet="utf-8" />
          <meta name="description" content="When to call businesses during their local business hours" />
          <meta name="author" content="James Carr" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#00a0c6" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/assets/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/assets/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/static/assets/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <script dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
