/* eslint-disable react/prop-types */

// next.js understands the route /product/[id].js
// and matches the template and pushes the [id]
// or anything that comes after /product/....
// in query prop in the SingleProductPage component.
// id is passed via {props} as query.id to the
// SingleProduct component

import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
