import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import { MdCopyright, MdEmail, MdPhone, MdPlace } from 'react-icons/md';

import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <Container className="footer-content">
        <Row>
          <Col xs="6" sm="4">
            <h2>Harvest</h2>
            <p>Agricultural E-commerce Platform</p>
          </Col>
          <Col xs="6" sm="4">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/signup">
                  <a href="/signup">Get started</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a href="/signup">News</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a href="/signup">Success Stories</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a href="/signup">Top leaders</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a href="/signup">Get started</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs="6" sm="4">
            <h3>Contact us</h3>
            <p>
              <MdEmail /> info@aesop.com
            </p>
            <p>
              <MdPhone /> +251 925 555 555
            </p>
            <p>
              <MdPlace /> Aesop HQ
            </p>
          </Col>
        </Row>
        <Row className="copyright">
          <p>
            <MdCopyright /> {new Date().getFullYear()} {'Harvest'}
          </p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
