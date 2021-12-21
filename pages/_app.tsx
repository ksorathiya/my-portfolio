import React from "react";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { globals } from "../globals";
import { Header } from "../components/Header";
import "../styles/base.css";

const App: React.FC = ({ Component, pageProps }: any) => {
  return (
    <div className="">
      <Head>
        <script
          async
          defer
          data-website-id="cdae2032-c587-40f3-b564-80f15e53f19a"
          src="https://analytics.sorathiyakartik.com/umami.js"
        ></script>
        {globals.googleAnalyticsId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${globals.googleAnalyticsId}`}
          ></script>
        )}
        {globals.googleAnalyticsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('globals', '${globals.googleAnalyticsId}');
            `,
            }}
          ></script>
        )}
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default App;
