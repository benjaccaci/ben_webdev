import React from "react";
import { Row, Col } from "react-bootstrap";

export default function BootstrapGrids() {
  return (
    <div>
      <h2>Bootstrap</h2>
      <div id="wd-bs-grid-system">
        <h2>Grid system</h2>
        <Row>
          <Col className="bg-danger text-white">
            <h3>Left half</h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
            qui deleniti voluptate totam quam accusamus odit, sunt laudantium
            omnis, perferendis quasi id provident, mollitia assumenda. Ullam
            aperiam sint tenetur quasi.
          </Col>
          <Col className="bg-primary text-white">
            <h3>Right half</h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            nobis aliquam minus beatae, incidunt repellat voluptatem officia
            facere, inventore id eum dolore fuga exercitationem, vero quae
            asperiores tenetur dolor numquam.
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={4} className="bg-warning">
            <h3>One third</h3>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            ipsum non aspernatur magni ratione. Perspiciatis quibusdam
            doloribus, vero ad odio delectus in excepturi facere, minus dolorem
            obcaecati? Dolorum, provident rem.
          </Col>
          <Col md={8} className="bg-success text-white">
            <h3>Two thirds</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sunt
            distinctio odit dolor ullam? Rerum ullam cupiditate earum eveniet
            neque temporibus nisi dolor consequatur, voluptatum, excepturi
            voluptas quod facere dignissimos!
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2} className="bg-black text-white">
            <h3>Sidebar</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
            repudiandae tempora. Exercitationem deserunt, error in reprehenderit
            sapiente labore ullam non, illo adipisci dolores aut atque id
            distinctio, a itaque ea.
          </Col>
          <Col xs={8} className="bg-secondary text-white">
            <h3>Main content</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            tenetur labore sapiente eligendi aspernatur, a possimus nesciunt aut
            modi veritatis vero explicabo quo excepturi, quisquam soluta
            pariatur repellendus in dicta?
          </Col>
          <Col xs={2} className="bg-info">
            <h3>Sidebar</h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur provident officia sit ipsum vero suscipit deserunt quis
            natus illo molestiae perferendis labore debitis nobis nam repellat,
            saepe cum earum quisquam.
          </Col>
        </Row>
        <div id="wd-bs-responsive-grids">
          <h2>Responsive grid system</h2>
          <Row>
            <Col xs={12} md={6} xl={3} className="bg-warning">
              <h3>Column A</h3> Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Rerum, delectus odit. Quia iste vel repellat,
              vero debitis quos labore similique atque, laudantium nihil nisi
              consequatur. Velit eaque vero debitis! Velit!
            </Col>
            <Col xs={12} md={6} xl={3} className="bg-primary text-white">
              <h3>Column B</h3> Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quaerat vitae voluptates accusamus nobis esse
              praesentium debitis excepturi earum voluptas dicta vel ad quisquam
              ea, officiis repellendus fugit! Sint, quisquam minima?
            </Col>
            <Col xs={12} md={6} xl={3} className="bg-danger text-white">
              <h3>Column C</h3> Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Suscipit deserunt porro excepturi. Saepe totam
              quod distinctio nulla in dolorum excepturi illum, dignissimos
              fugiat fugit veritatis aperiam? Quidem eos eaque quod!
            </Col>
            <Col xs={12} md={6} xl={3} className="bg-success text-white">
              <h3>Column D</h3> Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Velit nulla, porro vitae quisquam culpa modi
              alias temporibus illo totam quam corrupti ipsam qui ea aspernatur
              repellendus quis suscipit illum error?
            </Col>
          </Row>
        </div>
      </div>
      <div id="wd-bs-responsive-dramatic">
        <h2>Responsive grid system</h2>
        <Row>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-warning"
          >
            <h4>1</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-primary text-white"
          >
            <h4>2</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-danger text-white"
          >
            <h4>3</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-success text-white"
          >
            <h4>4</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-warning"
          >
            <h4>5</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-primary text-white"
          >
            <h4>6</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-danger text-white"
          >
            <h4>7</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-success text-white"
          >
            <h4>8</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-warning"
          >
            <h4>9</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-primary text-white"
          >
            <h4>10</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-danger text-white"
          >
            <h4>11</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-success text-white"
          >
            <h4>12</h4>
          </Col>
        </Row>
      </div>
    </div>
  );
}
