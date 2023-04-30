import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

// eslint-disable-next-line react/prop-types
export default function ResetPage({ query }) {
  // eslint-disable-next-line react/prop-types
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      <p>RESET YOUR PASSWORD {query.token}</p>
      {/* eslint-disable-next-line react/prop-types */}
      <Reset token={query.token} />
    </div>
  );
}
