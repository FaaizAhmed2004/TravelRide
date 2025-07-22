"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: "slide1",
    image: "/assets/futuristic-landscape-dubai.jpg",
    title: "Explore the Unseen",
    description: "Discover hidden gems around the world with us.",
    next: "slide2",
    prev: "slide4",
  },
  {
    id: "slide2",
    image: "/assets/malaysia.jpg",
    title: "Luxury Destinations",
    description: "Experience premium travel with comfort and style.",
    next: "slide3",
    prev: "slide1",
  },
  {
    id: "slide3",
    image: "/assets/pakvalley.jpg",
    title: "Adventure Awaits",
    description: "Embark on thrilling adventures across the globe.",
    next: "slide4",
    prev: "slide2",
  },
  {
    id: "slide4",
    image: "/assets/singapour.jpg",
    title: "Make Memories",
    description: "Travel, explore, and create unforgettable moments.",
    next: "slide1",
    prev: "slide3",
  },
];

const Carousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState("slide1");

  return (
    <div className="relative w-full overflow-hidden">
      <div className="carousel w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            id={slide.id}
            className={`carousel-item relative w-full transition-opacity duration-700 ${
              activeSlide === slide.id ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0} // Prioritize the first image for better loading
              />
            </div>

            {/* Overlay for text */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
              <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white mt-2 drop-shadow-md">
                {slide.description}
              </p>
              <Link href="/destinations">
                <button className="mt-4 px-6 py-3 text-lg font-semibold bg-primary text-white rounded-lg hover:bg-opacity-80 transition duration-300">
                  Plan Your Trip
                </button>
              </Link>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 top-1/2 flex justify-between px-4">
              <button
                className="bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition duration-300"
                onClick={() => setActiveSlide(slide.prev)}
              >
                ❮
              </button>
              <button
                className="bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition duration-300"
                onClick={() => setActiveSlide(slide.next)}
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
