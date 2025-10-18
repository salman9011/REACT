import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  // to get the acces of error that has occured in route, we use another hook
  const  error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
