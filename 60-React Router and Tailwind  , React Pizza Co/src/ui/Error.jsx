import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const navigate = useNavigate();

  // to get the acces of error that has occured in route, we use another hook
  const  error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>
      <LinkButton to ="-1" >&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
