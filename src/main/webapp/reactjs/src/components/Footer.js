import { Navbar, Container, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
            Интернет-магазин музыкальных инструментов
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
