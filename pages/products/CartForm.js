import products from '../../database/products';

const name = { products };

export default function CartForm(props) {
  return (
    <div>
      <h2>{props.products.name}</h2>
      {/* <hr /> */}
    </div>
  );
}
