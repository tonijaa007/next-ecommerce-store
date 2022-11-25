import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { products } from '../../database/products';

const divStyles = css`
  display: inline-block;
  margin: 15px;
`;

const imageStyles = css`
  border: 1px solid black;
  padding: 20px;
`;

const priceStyles = css`
  margin-top: 5px;
`;
const buttonStyles = css`
  margin-top: 5px;
`;
const divHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const inputStyles = css`
  width: 400px;
  height: 35px;
  border-radius: 200px;
  margin: 5px;
  text-align: center;
`;

function List(props) {
  // create a new array by filtering the original array
  const filteredData = products.filter((product) => {
    // if no input the return the original
    if (props.input === '') {
      return product;
    }
    // return the item which contains the user input
    else {
      return product.text.toLowerCase().includes(props.input);
    }
  });
  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.Image}</li>
      ))}
    </ul>
  );
}

function Search({ handleSearch }) {
  function onChange(e) {
    handleSearch(e.target.value);
  }
}

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

export default function ProductIndex(props) {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('products');
  const [show, setShow] = useState(true);
  const [query, setQuery] = useState('');
  const [filteredProduct, setFilteredProduct] = useState('');
  function handleSearch(newSearchQuery) {
    setQuery(newSearchQuery);
    products.map((product) => {
      if (product.includes(query)) {
        setQuery(product);
      }
    });
  }
  const handleClick = (id) => {
    console.log('hi', props.products);
    const findProduct = props.products.find((product) => {
      console.log(product.id === id, 'hello');
      return product.id === id;
    });
    console.log(findProduct);
    setCart([...cart, products]);
  };

  const addToCart = (product) => {
    console.log('we are in addToCart');
    setCart([...cart, product]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  const displayProduct = products.map((product) => {
    return (
      <li key={product.id}>
        {product.name}
        {Image.src}
        {product.price}
      </li>
    );
  });

  const renderProducts = () => (
    <>
      <h1>Products</h1>
      <div css={divHeaderStyle}>
        <Search handleSearch={handleSearch} />
        <input
          id="message"
          type="search"
          name="message"
          css={inputStyles}
          placeholder="Search the store"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          /* onKeyDown={handleKeyDown}
  onChange={(event) => setQuery(event.target.value)} */
        />
      </div>
      {/* <div><List input={inputText} /></div> */}

      {/*       {[products].map((product) => {
       */}
      {props.products.map((product) => {
        return (
          <div css={divStyles} key={`product-${product.id}`}>
            {/* <div key={`product-' + product.id}>{product.name}</div> wäre die Alternative */}

            <Link href={`/products/${product.id}`}>
              <a>
                <h2>{product.name}</h2>
              </a>
            </Link>
            <Link href={`/products/${product.id}`}>
              <div css={imageStyles}>
                <a>
                  <Image
                    src={`/${product.id}-${product.name.toLowerCase()}.webp`}
                    alt=""
                    height="300"
                    width="300"
                  />
                </a>
              </div>
            </Link>

            <div css={priceStyles}>Price: {product.price}</div>

            <div css={buttonStyles}>
              <button
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button onClick={() => navigateTo(PAGE_CART)}>
                Go to Cart ({cart.length})
              </button>
            </div>
          </div>
        );
      })}
    </>
  );

  const renderCart = () => {
    <>
      <h1>Cart</h1>
      {props.products.map((product) => {
        return (
          <div css={divStyles} key={`product-${product.id}`}>
            {/* <div key={`product-' + product.id}>{product.name}</div> wäre die Alternative */}

            <Link href={`/products/${product.id}`}>
              <a>
                <h2>{product.name}</h2>
              </a>
            </Link>
            <Link href={`/products/${product.id}`}>
              <div css={imageStyles}>
                <a>
                  <Image
                    src={`/${product.id}-${product.name.toLowerCase()}.webp`}
                    alt=""
                    height="300"
                    width="300"
                  />
                </a>
              </div>
            </Link>

            <div css={priceStyles}>Price: {product.price}</div>

            <div css={buttonStyles}>
              {/* <button
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to Cart
              </button> */}
            </div>
          </div>
        );
      })}
    </>;
  };
  return (
    <div>
      <Head>
        <title>All of the products</title>
        <meta name="description" content="List of all products" />
      </Head>
      {page === PAGE_PRODUCTS && renderProducts()}
      {page === PAGE_CART && renderCart()}
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      abc: 123,
      // here we are saying products is the name of the thing and then products is also the name of the variable that we want to pass like the value. So it´s both the key name and also the value name. If they´re both the same then actually the shorter version is just animals. So you can just put animals in here and it does the same.
      // products (instead of products: products)
      products: products,
    },
  };
}
