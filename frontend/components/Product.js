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
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete items. */}
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
