/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('Adding to cart!!');
  // 1. Query the current user and see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;
  // 3. See if the current item is in their cart
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // 4. If it is, increment by 1
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  // 5. If it isn't, create a new cart item for that user!
  // Connect the product and the user - relationship field
  return context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    }
  });
}

export default addToCart;
