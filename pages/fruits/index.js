import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { fruitsDatabase } from '../../database/fruits';
import { getParsedCookie } from '../../utils/cookies';

/* const divStyles = css`
  text-align: center;
`;
const h2Styles = css`
  margin: 10px;
`;

const aStyles = css`
  text-decoration: none;
`; */

export default function Shop(props) {
  return (
    <>
      <Head>
        <title>Fruits</title>
        <meta name="description" content="List of all products" />
      </Head>
      {/* {JSON.stringify(props.fruitList)} */}
      {props.fruits.map((fruit) => {
        return (
          <div /* css={divStyles} */ key={`fruit-div-${fruit.id}`}>
            <h2 /* css={h2Styles} */>
              <Link href={`/fruits/${fruit.id}`}>
                <a /* css={aStyles} */>{fruit.name}</a>
              </Link>
            </h2>
            <div>
              {fruit.icon} ⭐{' '}
              {getParsedCookie('stars')?.find(
                (cookieFruitObject) => cookieFruitObject.id === fruit.id,
              )?.stars || 0}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function getServerSideProps(context) {
  console.log(context.req.cookies);
  // 1. get the fruits from the database/fruits.js

  const parsedCookies = context.req.cookies.stars
    ? JSON.parse(context.req.cookies.stars)
    : [];

  const fruits = fruitsDatabase.map((fruit) => {
    return {
      ...fruit,
      stars:
        parsedCookies.find(
          (cookieFruitObject) => fruit.id === cookieFruitObject.id,
        )?.stars || 0,
    };
  });

  console.log(fruits);
  return {
    props: {
      fruits: fruits,
    },
  };
}
