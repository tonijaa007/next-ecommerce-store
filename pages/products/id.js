/* import Head from 'next/head';
import { products } from '../../database/products';

export default function Product(props) {
  return (
    <div>
      <Head>
        <title>Product single page</title>
        <meta name="description" content="Product single page" />
      </Head>
      <h1>Products</h1>
    </div>
  );
}

// getServerSideProps allows to access different data from the browser that is performing the request and that is something we call context.
export function getServerSideProps(context) {
  const id = context.params.id;
  const articles = products;
  return { props: {} };
}
 */
