import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import config from 'config/config'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
          <link rel='manifest' href='/static/icons/site.webmanifest' />
          <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/static/icons/favicon.ico' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
          <meta name='theme-color' content='#ffffff' />
          <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.gaTrackingId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.gaTrackingId}');
          ` }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
