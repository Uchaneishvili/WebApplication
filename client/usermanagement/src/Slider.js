import React from "react";
import "./Slider.css";
import { Carousel } from "react-bootstrap";

function Slider() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="Slide1.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3 className="sliderTitle">First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="Slide2.jpg" alt="Second slide" />

          <Carousel.Caption>
            <h3 className="sliderTitle">Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="Slide3.jpg" alt="Third slide" />

          <Carousel.Caption>
            <h3 className="sliderTitle">Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slider;
