import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <>
      <footer className='text-center' style={{ backgroundColor: '#343a40', padding: '40px 0', color: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 style={{ fontWeight: 'bold', fontSize: '28px' }}>About Us</h5>
              <p className='lh-base px-4 py-2' style={{ color: '#cccccc', fontSize: '16px' }}>
                Hey there! We’re E-Market, a friendly online shop where you can find great products and enjoy a smooth shopping experience. We’re here to help make your shopping fun and easy!
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h5 style={{ fontWeight: 'bold', fontSize: '28px' }}>Call Us</h5>
              <div className='lh-base px-4 py-2'>
                <p style={{ color: '#cccccc', marginBottom: '5px', fontSize: '16px' }}>
                  <strong>Mobile Phone: </strong>
                  <a href="tel:+9624567890" style={{ color: '#cccccc', textDecoration: 'none' }}>+962 456 7890</a>
                </p>
                <p style={{ color: '#cccccc', marginBottom: '5px', fontSize: '16px' }}>
                  <strong>Email Address: </strong>
                  <a href="mailto:E-market@outlook.com" style={{ color: '#cccccc', textDecoration: 'none' }}>E-market@outlook.com</a>
                </p>
                <p style={{ color: '#cccccc', fontSize: '16px' }}>
                  <strong>Location: </strong>
                  <a href="#" style={{ color: '#cccccc', textDecoration: 'none' }}>Amman - Jordan</a>
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <h5 style={{ fontWeight: 'bold', fontSize: '28px' }}>Follow Us</h5>
              <div>
                <ul className="d-flex flex-wrap list-unstyled align-items-center justify-content-center">
                  <li className="me-4">
                    <a href="#" style={{ color: '#ffffff', fontSize: '24px' }}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                  </li>
                  <li className="me-4">
                    <a href="#" style={{ color: '#ffffff', fontSize: '24px' }}>
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="me-4">
                    <a href="#" style={{ color: '#ffffff', fontSize: '24px' }}>
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                  <li className="me-4">
                    <a href="#" style={{ color: '#ffffff', fontSize: '24px' }}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="copyright">
            <div className="row-customized border-top p-4">
              <div className="col-lg-8 offset-lg-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="copyright-start d-flex flex-wrap gap-1" style={{ color: '#aaaaaa', fontSize: '14px' }}>
                    <p style={{ margin: '0' }}>© 2024 E-Market is Proudly Powered by </p>
                    <a href="https://www.egenslab.com/" style={{ color: '#aaaaaa', textDecoration: 'none' }}>Egens Lab.</a>
                  </div>
                  <div className="copyright-end">
                    <ul className="text-capitalize d-flex flex-wrap justify-content-end align-items-center list-unstyled" style={{ fontSize: '14px', color: '#aaaaaa', margin: '0' }}>
                      <li className="me-3">
                        <a href="#" style={{ color: '#aaaaaa', textDecoration: 'none' }}>privacy policy</a>
                      </li>
                      <li className="me-3">
                        <a href="#" style={{ color: '#aaaaaa', textDecoration: 'none' }}>terms & conditions</a>
                      </li>
                      <li className="me-3">
                        <a href="#" style={{ color: '#aaaaaa', textDecoration: 'none' }}>services</a>
                      </li>
                      <li className="me-3">
                        <a href="#" style={{ color: '#aaaaaa', textDecoration: 'none' }}>help</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
