import Link from 'next/link';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <Title>
        {/* ex.: http://localhost:7777/product/637a49364e348f2a88edf7a7
        works with product/[id].js, next.js injects query param query:{id:...}
        in the page component SingleProductPage */}
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* Add buttons to edit and delete items. */}
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              // ex.: http://localhost:7777/update?id=637a49364e348f2a88edf7a7
              // works with update.js, next.js injects query param query:{id:...}
              // in the page component UpdatePage
              id: product.id,
            },
          }}
        >
          Edit 📝
        </Link>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.any,
    id: PropTypes.any,
    price: PropTypes.any,
    description: PropTypes.any,
    photo: PropTypes.any,
    image: PropTypes.any,
    publicUrlTransformed: PropTypes.any,
  }),
};
