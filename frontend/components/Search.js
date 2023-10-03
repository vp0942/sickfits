/* eslint-disable react/jsx-props-no-spreading */
import gql from 'graphql-tag';
import { resetIdCounter, useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  // The useLazyQuery hook is used to fetch the data from the server
  const [findItems, { data, loading, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  // console.log(data);
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      // console.log('Input Changed');
      // Assigns the value of the inputValue variable to the searchTerm variable
      // and then passes it to the SEARCH_PRODUCTS_QUERY query using the useLazyQuery hook
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      // console.log(selectedItem);
      // console.log('Selected Item Changed');
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No Items Found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
