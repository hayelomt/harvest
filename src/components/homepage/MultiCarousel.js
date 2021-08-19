import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, Row } from 'reactstrap';

const MultiCarousel = props => {
  const { contents } = props;
  const items = [
    {
      cards: <Row>{contents.slice(0, 3)}</Row>,
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      cards: <Row>{contents.slice(2)}</Row>,
      altText: 'Slide 2',
      caption: 'Slide 2'
    }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  // constructor(props) {
  //   super(props);
  //   this.state = { activeIndex: 0 };
  //   this.next = this.next.bind(this);
  //   this.previous = this.previous.bind(this);
  //   this.goToIndex = this.goToIndex.bind(this);
  //   this.onExiting = this.onExiting.bind(this);
  //   this.onExited = this.onExited.bind(this);
  // }

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    // this.setState({ activeIndex: nextIndex });
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    // this.setState({ activeIndex: nextIndex });
    setActiveIndex(nextIndex);
  };

  // const goToIndex = newIndex => {
  //   if (animating) return;
  //   // this.setState({ activeIndex: newIndex });
  //   setActiveIndex(newIndex);
  // };
  // const { activeIndex } = this.state;

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={onExiting}
        onExited={onExited}
        key={index}
        // className="carousel-ind"
      >
        {/* <img src={'static/assets/pots.png'} alt={item.altText} /> */}

        {item.cards}
        {/* <CarouselCaption
              captionText={item.caption}
              captionHeader={item.caption}
            /> */}
      </CarouselItem>
    );
  });

  // const lastItem = [
  //   <Button className="more-btn">
  //     <Link href="/upload">
  //       <a href="/upload">More</a>
  //     </Link>
  //   </Button>
  // ];
  // slides.push(lastItem);
  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
      // className="carousel-ind"
    >
      {/* <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
            className="carousel-ind"
          /> */}
      {slides}
      {activeIndex === 1 ? (
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
          className="carousel-ind"
        />
      ) : null}
      {activeIndex === 0 ? (
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
          className="carousel-ind"
        />
      ) : null}
    </Carousel>
  );
};

export default MultiCarousel;
