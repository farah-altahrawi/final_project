import Spinner from 'react-bootstrap/Spinner';

function BasicExample() {
  return (
    <div className='d-flex justify-content-center align-items-center p-5 m-5'>
            <Spinner animation="border" role="status" className='spinner-border-lg'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>

  );
}

export default BasicExample;