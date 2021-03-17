import { useState, useRef, TouchEvent } from "react";

const HomePage = () => {
  const [imageRevealFraq, setImageRevealFraq] = useState(0.5);
  const imageContainer = useRef<HTMLDivElement>(undefined);

  const slide = (xPosition: number): void => {
    const containerBoundingRect = imageContainer.current.getBoundingClientRect();
    setImageRevealFraq(() => {
      if (xPosition < containerBoundingRect.left) {
        return 0;
      } else if (xPosition > containerBoundingRect.right) {
        return 1;
      } else {
        return (
          (xPosition - containerBoundingRect.left) / containerBoundingRect.width
        );
      }
    });
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
    slide(event.touches.item(0).clientX);
  };

  const handleMouseDown = (): void => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event: MouseEvent): void => {
    slide(event.clientX);
  };

  const handleMouseUp = (): void => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  return (
    <div className="px-4">
      <div
        ref={imageContainer}
        className="max-w-lg w-full mx-auto mt-32 relative select-none group"
      >
        <img
          src="https://images.unsplash.com/photo-1546704259-d4dac118f426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
          className="pointer-events-none"
        />
        <img
          style={{
            filter: "grayscale(100%)",
            clipPath: `polygon(0 0, ${imageRevealFraq * 100}% 0, ${
              imageRevealFraq * 100
            }% 100%, 0 100%)`,
          }}
          src="https://images.unsplash.com/photo-1546704259-d4dac118f426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
          className="absolute inset-0 pointer-events-none"
        />
        <div
          style={{ left: `${imageRevealFraq * 100}%` }}
          className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
        >
          <div className="relative h-full opacity-50 hover:opacity-100">
            <div className="absolute inset-y-0 bg-white w-0.5 -ml-px"></div>
            <div
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="h-12 w-12 -ml-6 -mt-6 rounded-full bg-white absolute top-1/2 shadow-xl flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 text-gray-400 rotate-90 transform"
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

export default HomePage;
