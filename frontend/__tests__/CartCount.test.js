import { render, screen } from '@testing-library/react';
import CartCount from '../components/CartCount';
import wait from 'waait';

describe('<CartCount />', () => {
  it('Renders', () => {
    render(<CartCount count={10} />)
  });

  it('Matches the snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });

  it('updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11');
    // expect(container).toHaveTextContent('11'); // Exactly the same as the above line

    rerender(<CartCount count={12} />);
    expect(container.textContent).toBe('1211');
    // We need to wait for the animation to finish - otherwise, the test will fail
    await wait(400);
    expect(container.textContent).toBe('12');
    // debug();
    expect(container).toMatchSnapshot();

  });

});