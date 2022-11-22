import PropTypes from 'prop-types';

export default function Product({ product }) {
  return <div>{product.name}</div>;
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.any,
  }),
};
