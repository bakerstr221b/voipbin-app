import * as React from 'react';
import { Fragment } from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'src/createEmotionCache';
//https://velog.io/@juunghunz/Next.js-Typescript-Styled-Component-%EC%A0%81%EC%9A%A9
//서버로 부터  style을 적용 받은 HTML을 가져올 수 있게 처리
// 이 작업이 없으면  css로딩이 늦게 되어 깜박이는 현상 발생
//HTML은 SSR로 미리 렌더링 시키지만 styled-component의 스타일들은 사용자가 접속 시 변환되기 때문
 import { ServerStyleSheet } from "styled-components" ;

export default class MyDocument extends Document {
    
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  try {
    ctx.renderPage = () =>
        originalRenderPage({
        enhanceApp: (App: any) => (props) =>
        sheet.collectStyles(<App emotionCache={cache} {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            <Fragment key="1">
                {initialProps.styles}
                {sheet.getStyleElement()}
            </Fragment>,
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags
        ]
    };
    } finally {
        sheet.seal();
    }
};