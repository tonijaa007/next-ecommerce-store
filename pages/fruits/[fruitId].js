import Head from 'next/head';
import Link from 'next/link';
import { fruitsDatabase } from '../../database/fruits';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Fruit(props) {
  if (props.error) {
    return (
      <div>
        <Head>
          <title>Fruit not found</title>
          <meta name="description" content="Fruit not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/fruits">Products Page</Link>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Fruit single page</title>
        <meta name="description" content="Product not found" />
      </Head>
      <h1>{props.singleFruit.name}</h1>
      <div>{props.singleFruit.icon}</div>
      <button
        onClick={() => {
          const currentCookieValue = getParsedCookie('stars');

          if (!currentCookieValue) {
            setStringifiedCookie('stars', [
              { id: props.singleFruit.id, stars: -1 },
            ]);
            return;
          }

          const foundCookie = currentCookieValue.find(
            (cookieFruitObject) =>
              cookieFruitObject.id === props.singleFruit.id,
          );

          if (!foundCookie) {
            currentCookieValue.push({ id: props.singleFruit.id, stars: 1 });
          } else {
            foundCookie.stars--;
          }
          setStringifiedCookie('stars', currentCookieValue);
        }}
      >
        ⭐ -
      </button>
      <button
        onClick={() => {
          // 1. get the current value of the cookie
          // cookie is not there then is undefined
          // cookie is there then is a number
          const currentCookieValue = getParsedCookie('stars');

          if (!currentCookieValue) {
            setStringifiedCookie('stars', [
              { id: props.singleFruit.id, stars: 1 },
            ]);
          } else {
            const foundCookie = currentCookieValue.find(
              (cookieFruitObject) =>
                cookieFruitObject.id === props.singleFruit.id,
            );

            if (!foundCookie) {
              currentCookieValue.push({ id: props.singleFruit.id, stars: 1 });
            } else {
              foundCookie.stars++;
            }
            setStringifiedCookie('stars', currentCookieValue);
          }
        }}
      >
        ⭐ +
      </button>
    </div>
  );
}

export function getServerSideProps(context) {
  const fruitId = context.params.fruitId;

  const fruits = fruitsDatabase;

  console.log('fruits', fruits);
  console.log('fruitId', fruitId);

  const singleFruit = fruits.find((fruit) => {
    return fruit.id === fruitId;
  });

  if (typeof singleFruit === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Fruit not found',
      },
    };
  }

  return { props: { singleFruit: singleFruit } };
}
