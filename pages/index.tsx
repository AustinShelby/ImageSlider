import React, { useState, useRef } from "react";

const Home = () => {
  const [slideAmount, setSlideAmount] = useState({ frac: 0.5 });

  const imageContainer = useRef<HTMLDivElement>(undefined);

  const handleMouseMove = (event: MouseEvent): void => {
    slide(event.clientX);
  };

  const slide = (xPosition: number): void => {
    const imageContainerBoundingRect = imageContainer.current.getBoundingClientRect();
    setSlideAmount(() => {
      if (xPosition < imageContainerBoundingRect.left) {
        return { frac: 0 };
      } else if (xPosition > imageContainerBoundingRect.right) {
        return { frac: 1 };
      } else {
        return {
          frac:
            (xPosition - imageContainerBoundingRect.left) /
            imageContainerBoundingRect.width,
        };
      }
    });
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    slide(event.touches.item(0).clientX);
  };

  const handleMouseDown = (event: any): void => {
    window.onmouseup = handleMouseUp;
    window.onmousemove = handleMouseMove;
  };

  const handleMouseUp = (): void => {
    window.onmouseup = undefined;
    window.onmousemove = undefined;
  };

  return (
    <div className="px-6">
      <div
        ref={imageContainer}
        className="max-w-lg w-full mt-32 mx-auto relative select-none group"
      >
        <img
          src="https://images.unsplash.com/photo-1546704259-d4dac118f426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
          className="pointer-events-none"
          style={{ filter: "grayscale(100%)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1546704259-d4dac118f426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${slideAmount.frac * 100}% 0, ${
              slideAmount.frac * 100
            }% 100%, 0 100%)`,
          }}
        />
        <div
          style={{
            left: `${slideAmount.frac * 100}%`,
            touchAction: "none",
          }}
          className="absolute inset-y-0 sm:opacity-0 group-hover:opacity-100"
        >
          <div className="relative h-full hover:opacity-100 opacity-50">
            <div className="inset-y-0 absolute w-0.5 -ml-px bg-white"></div>
            <div
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="w-12 -ml-6 h-12 -mt-6 top-1/2 cursor-pointer rounded-full bg-white absolute flex items-center justify-center shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-gray-500 w-6 rotate-90 transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
