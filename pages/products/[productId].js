import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '../../database/products';
import CartForm from './CartForm';

const productStyles = css`
  text-align: center;
  font-size: 20px;
`;
const containerStyle = css`
  display: inline-block;
  align-items: center;
  justify-content: center;
`;
const imageStyle = css``;

const headerStyles = css``;
const textStyle = css`
  line-height: 1.5;
`;
const priceStyle = css``;
export const buttonStyles = css`
  margin: 10px;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 10px;
`;

export function Counter() {
  const [count, setCount] = useState(0);

  if (count < 0) {
    return setCount(0);
  }

  return (
    <>
      {count}
      <button css={buttonStyles} onClick={() => setCount(count - 1)}>
        -
      </button>
      {count}
      <button css={buttonStyles} onClick={() => setCount(count + 1)}>
        +
      </button>
      <button css={buttonStyles} onClick={() => setCount(0)}>
        Reset
      </button>
    </>
  );
}

export default function Product(props) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart.push([...cart, product]);
    console.log(cart);
  };

  if (props.error) {
    return (
      <div>
        <Head>
          <title>Product not found</title>
          <meta name="description" content="Product not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/products">Products Page</Link>
      </div>
    );
  }

  return (
    <div css={productStyles}>
      <Head>
        <title>
          {props.product.name}, the {props.product.price}
        </title>
        <meta
          name="description"
          content={`${props.product.name} costs ${props.product.price} `}
        />
      </Head>
      <div css={containerStyle}>
        <div>
          <h2>{props.product.name}</h2>
        </div>
        <div css={imageStyle}>
          <Image
            src={`/${
              props.product.id
            }-${props.product.name.toLowerCase()}.webp`}
            alt=""
            width="400"
            height="400"
          />
        </div>
        <div css={headerStyles}>
          {/* <span css={textStyle}>Halloween Magic Potter Fire Wand Cosplay</span> */}
          <div css={priceStyle}>
            <div>Price: {props.product.price}</div>
          </div>
          <Counter css={buttonStyles} />
          <br />
          <button css={buttonStyles} onClick={() => addToCart(products)}>
            Add to Cart
          </button>
        </div>
      </div>
      <CartForm products={products} />
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the animal ID from the URL
  const productId = parseInt(context.query.productId);

  // Finding the animal
  //
  // Note: This is not the most efficient way
  // of finding the single animal, because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.
  // const foundAnimal = animals.find((animal) => {
  //   return animal.id === animalId;
  // });
  const foundProduct = products.find((product) => {
    return product.id === productId;
  });

  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  return {
    props: {
      product: foundProduct,
    },
  };
}
