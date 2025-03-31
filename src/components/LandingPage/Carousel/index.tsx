import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  banner1,
  banner2,
  banner3,
} from "../../../assets/landingPage/index.js";
import {
  TiChevronLeftOutline,
  TiChevronRightOutline,
  TiChevronLeft,
  TiChevronRight,
} from "react-icons/ti";
import Image from "next/image";

const StakingNFTCarousel = () => {
  const sliderRef = React.useRef<Slider>(null);
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      id: 1,
      img: banner1,
      alt: "Staking Reward Event 1",
    },
    {
      id: 2,
      img: banner2,
      alt: "Staking Reward Event 2",
    },
    {
      id: 3,
      img: banner3,
      alt: "Staking Reward Event 3",
    },
  ];

  const handleLeftClick = () => {
    setLeftClicked(true);
    sliderRef.current?.slickPrev();
    setTimeout(() => setLeftClicked(false), 200);
  };

  const handleRightClick = () => {
    setRightClicked(true);
    sliderRef.current?.slickNext();
    setTimeout(() => setRightClicked(false), 200);
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === images.length - 1;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-4 h-4 md:w-6 md:h-6 border rounded-full transition-colors ${
          i === currentSlide ? "bg-blue-400" : "bg-white"
        }`}
      ></div>
    ),
  };

  return (
    <div className="mt-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          <Slider
            ref={sliderRef}
            {...settings}
            className="h-[40vh] sm:h-[50vh] md:h-[78vh]"
          >
            {images.map((src) => (
              <div key={src.id} className="outline-none">
                <div className="rounded-3xl overflow-hidden p-4 sm:p-8">
                  <div className="max-w-5xl mx-auto">
                    <Image
                      width={100}
                      height={100}
                      src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                      alt={src.alt}
                      className="w-full h-[30vh] sm:h-[40vh] md:h-[84vh] rounded-4xl object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <button
            className={`absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-18 sm:h-18 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              isFirstSlide
                ? "bg-gray-200 border border-gray-300"
                : leftClicked
                ? "bg-gray-200 border border-gray-300"
                : "bg-white border border-gray-300"
            }`}
            onClick={handleLeftClick}
          >
            {isFirstSlide ? (
              <TiChevronLeftOutline className="text-gray-300" size={24} />
            ) : (
              <TiChevronLeft className="text-black" size={24} />
            )}
          </button>

          <button
            className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-18 sm:h-18 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              isLastSlide
                ? "bg-gray-200 border border-gray-300"
                : rightClicked
                ? "bg-gray-200 border border-gray-300"
                : "bg-white border border-gray-300"
            }`}
            onClick={handleRightClick}
          >
            {isLastSlide ? (
              <TiChevronRightOutline className="text-gray-300" size={24} />
            ) : (
              <TiChevronRight className="text-black" size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakingNFTCarousel;
