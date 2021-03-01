import React, { useState, useRef } from "react";

const Home = () => {
  const [slideAmount, setSlideAmount] = useState({ frac: 0.5 });

  const imageContainer = useRef<HTMLDivElement>(undefined);

  const handleMouseMove = (event: PointerEvent): void => {
    const imageContainerBoundingRect = imageContainer.current.getBoundingClientRect();
    setSlideAmount(() => {
      if (event.clientX < imageContainerBoundingRect.left) {
        return { frac: 0 };
      } else if (event.clientX > imageContainerBoundingRect.right) {
        return { frac: 1 };
      } else {
        return {
          frac:
            (event.clientX - imageContainerBoundingRect.left) /
            imageContainerBoundingRect.width,
        };
      }
    });
  };

  const handleMouseDown = (): void => {
    // window.onmouseup = handleMouseUp;
    // window.ontouchend = handleMouseUp;
    // window.onmousemove = handleMouseMove;
    // window.ontouchmove = handleMouseMove;
    // window.ondrag = handleMouseMove;
    window.onpointerup = handleMouseUp;
    window.onpointercancel = handleMouseUp;
    window.onpointermove = handleMouseMove;
  };

  const handleMouseUp = (): void => {
    // window.onmousemove = undefined;
    // window.ontouchmove = undefined;
    // window.onmouseup = undefined;
    // window.ontouchend = undefined;
    window.onpointerup = undefined;
    window.onpointercancel = undefined;
    window.onpointermove = undefined;
  };

  console.log("rendering");

  return (
    <div className="flex items-center min-h-screen justify-center">
      <div
        ref={imageContainer}
        className="max-w-2xl w-full mx-auto relative select-none group"
      >
        <img
          src="https://images.unsplash.com/photo-1498855926480-d98e83099315?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
          className="pointer-events-none"
          style={{ filter: "grayscale(100%)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1498855926480-d98e83099315?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
          }}
          className="absolute inset-y-0 pointer-events-auto opacity-0 group-hover:opacity-100"
        >
          <div className="relative h-full hover:opacity-100 opacity-50">
            <div className="inset-y-0 absolute w-0.5 -ml-px bg-white"></div>
            <div
              // onDragStart={handleMouseDown}
              // onMouseDown={handleMouseDown}
              // onTouchStart={handleMouseDown}
              onPointerDown={handleMouseDown}
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
