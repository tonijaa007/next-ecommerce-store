import '../pages/products/index';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { index } from '../pages/products/index';

const divStyles = css`
  /*   background-color: #0b7189;
 */
  background-color: lightblue;
  color: white;
  text-align: center;
  font-size: 20px;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const divStyleShipping = css`
  justify-content: flex-start;
  margin: 0 100px;
`;

const logoNavStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 50px;
`;
const navStyles = css`
  > a {
    margin-right: 35px;
    text-decoration: none;
    color: black;
  }
`;
const cartStyles = css``;
export function Icon({ cart }) {
  return (
    <span css={cartStyles}>
      <Link href="/shopping-cart">🛍️</Link>
    </span>
  );
}

export default function Header({ cart }) {
  return (
    <header>
      <div>
        <div css={divStyles}>
          <div css={divStyleShipping}> World Wide Shipping</div>
          -30% Rabatt auf alles. Nur bis zum 07.10.2022!
          <div>{/* <button onClick="search()">Search</button> */}</div>
        </div>
      </div>
      <div css={logoNavStyles}>
        <a href="http://localhost:3000/">
          <Image
            src="/Ashura Logo.png"
            alt="Firmenlogo"
            width={80}
            height={80}
          />
        </a>
        <nav css={navStyles}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/fruits">Fruits</Link>
          <Link href="/support">Support</Link>
          <Icon />
          <button>Go to Cart</button>
        </nav>
      </div>
    </header>
  );
}
