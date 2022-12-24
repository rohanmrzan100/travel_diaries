import Carousel from 'react-bootstrap/Carousel';

function CarouselComp() {
  return (
    <Carousel className='carousel'>
      <Carousel.Item>
        <img
          className="d-block carousel"
          src="https://source.unsplash.com/random"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel"
          src="https://picsum.photos/200/300"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel"
          src="https://picsum.photos/200/"
          alt="First slide"
        />
        
      </Carousel.Item>
     
    </Carousel>
  );
}

export default CarouselComp;