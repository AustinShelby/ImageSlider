import { useState, useRef, TouchEvent } from "react";

const HomePage = () => {
  const [imageRevealAmount, setImageRevealAmount] = useState(0.7);
  const imageContainer = useRef<HTMLDivElement>(undefined);

  const slide = (xPosition: number): void => {
    const containerBounds = imageContainer.current.getBoundingClientRect();
    setImageRevealAmount(() => {
      if (xPosition < containerBounds.left) {
        return 0;
      } else if (xPosition > containerBounds.right) {
        return 1;
      } else {
        return (xPosition - containerBounds.left) / containerBounds.width;
      }
    });
  };

  const handleMouseDown = (event: any): void => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event: MouseEvent): void => {
    slide(event.clientX);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
    slide(event.touches.item(0).clientX);
  };

  const handleMouseUp = () => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  return (
    <div className="px-6">
      <div
        ref={imageContainer}
        className="max-w-lg mx-auto mt-32 relative w-full select-none"
      >
        <img
          src="https://images.unsplash.com/photo-1546704259-d4dac118f426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
        />
        <img
          style={{
            filter: "grayscale(100%)",
            clipPath: `polygon(0 0, 0 100%, ${imageRevealAmount * 100}% 100%, ${
              imageRevealAmount * 100
            }% 0)`,
          }}
          src="https://images.unsplash.com/photo-1546704259-d4dac118f426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
          className="absolute inset-0"
        />
        <div
          style={{ left: `${imageRevealAmount * 100}%` }}
          className="absolute inset-y-0"
        >
          <div className="relative h-full">
            <div className="absolute inset-y-0 w-0.5 -ml-px bg-red-400"></div>
            <div
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="absolute w-12 h-12 rounded-full bg-green-400 top-1/2 cursor-pointer -mt-6 -ml-6 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="rotate-90 transform text-white w-6"
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
