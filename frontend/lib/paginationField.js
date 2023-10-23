import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cash
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x); // filter the undefined
      // If
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are not on the last page
      // THEN just sendit
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // We don't have any items, so we must go to the network to fetch them
        return false; // go to network
      }

      // If there are items, return them from the cash, and we don't need to go to the network.
      if (items.length) {
        // console.log(
        //   `There are ${items.length} items in the cash. Gonna send them to Apollo.`
        // );
        return items;
      }

      return false; // fallback to network

      // Apollo asks the read() function for those irems.
      //-----------------------

      // We can either do one of two things
      //-------------------------------

      // First thing we can do is return the items
      // because they are already in the cash.
      //------------------------------

      // The other thing we can do is to return FALSE
      // from here, so network request will follow instead.
      //---------------------------------
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client
      // comes back from the network with
      // our products.
      // console.log(`Merging items from the network ${incoming.length}`);
      // console.log(incoming);
      const merged = existing ? existing.slice() : []; // if there are existing items in the cash take them
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // Finally we returned the merged items from the cache.
      return merged; // Now Apollo will execute the read() function again
    },
  };
}
