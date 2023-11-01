import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ErrorMessage from '../components/ErrorMessage';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import Head from 'next/head';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import Link from 'next/link';

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY {
        allOrders {
            id
            total
            charge
            user {
                id
            }
            items {
                id
                name
                description
                price
                quantity
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`;

const OrderUI = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {

  const { data, error, loading } = useQuery(USER_ORDERS_QUERY)
  ;
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error}></ErrorMessage>;
  const { allOrders } = data;

  return (
    <OrderUI>
      <div>
        <Head>
          <title>Your Orders ({allOrders.length})</title>
        </Head>
        <h2>You have {allOrders.length} orders</h2>
        <div>
          {allOrders.map(order => (
            <OrderItemStyles key={order.id}>
              <Link href={`/order/${order.id}`}>
                <a>
                  <div className='order-meta'>
                    <p>{countItemsInAnOrder(order)} Items</p>
                    <p>{order.items.length} Product{order.items.length === 1 ? '' : 's'}</p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className='images'>
                    {order.items.map(item => (
                      <img key={`image ${item.id}`} src={item.photo?.image?.publicUrlTransformed} alt={item.name} />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          ))}
        </div>
      </div>
    </OrderUI>

  );


}
