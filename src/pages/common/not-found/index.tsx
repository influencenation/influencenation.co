import { Link } from 'react-router-dom';

import './not-found.css';
import ilustration from './page-misc-error-light.png';

const NotFound = () => {
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Page Not Found :(</h2>
        <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <div className="mt-3">
          <img src={ilustration} alt="page-misc-error-light" width="500" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
