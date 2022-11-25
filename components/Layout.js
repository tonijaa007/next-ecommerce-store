import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css``;
export default function Layout(props) {
  console.log('props', props);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main css={mainStyles}>{props.children}</main>
      <Footer />
    </>
  );
}
