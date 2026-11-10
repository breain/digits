import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-2 bg-dark">
    <Container>
      <Col className="text-center">
        Department of Information and Computer Sciences
      </Col>
    </Container>
  </footer>
);

export default Footer;
