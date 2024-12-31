import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"; // Import Heroicons

const DisplayHome = () => {
  const featuredChartsRef = useRef(null);
  const biggestHitsRef = useRef(null);

  const [showFeaturedLeftArrow, setShowFeaturedLeftArrow] = useState(false);
  const [showFeaturedRightArrow, setShowFeaturedRightArrow] = useState(true);
  const [showBiggestHitsLeftArrow, setShowBiggestHitsLeftArrow] = useState(false);
  const [showBiggestHitsRightArrow, setShowBiggestHitsRightArrow] = useState(true);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300; // Adjust the scroll amount as needed
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Function to update the visibility of arrows based on the scroll position
  const updateArrowsVisibility = (ref, setShowLeftArrow, setShowRightArrow) => {
    if (ref.current) {
      const scrollPosition = ref.current.scrollLeft;
      const scrollWidth = ref.current.scrollWidth;
      const clientWidth = ref.current.clientWidth;

      setShowLeftArrow(scrollPosition > 0); // Show left arrow if scrolled right
      setShowRightArrow(scrollPosition + clientWidth < scrollWidth); // Show right arrow if not at the end
    }
  };

  // Update arrow visibility on mount and when content is scrolled
  useEffect(() => {
    if (featuredChartsRef.current) {
      updateArrowsVisibility(featuredChartsRef, setShowFeaturedLeftArrow, setShowFeaturedRightArrow);
    }
    if (biggestHitsRef.current) {
      updateArrowsVisibility(biggestHitsRef, setShowBiggestHitsLeftArrow, setShowBiggestHitsRightArrow);
    }

    // Listen for scroll events to update arrow visibility
    const handleScroll = () => {
      if (featuredChartsRef.current) {
        updateArrowsVisibility(featuredChartsRef, setShowFeaturedLeftArrow, setShowFeaturedRightArrow);
      }
      if (biggestHitsRef.current) {
        updateArrowsVisibility(biggestHitsRef, setShowBiggestHitsLeftArrow, setShowBiggestHitsRightArrow);
      }
    };

    // Attach the scroll listener
    const featuredContainer = featuredChartsRef.current;
    const biggestHitsContainer = biggestHitsRef.current;

    if (featuredContainer) featuredContainer.addEventListener("scroll", handleScroll);
    if (biggestHitsContainer) biggestHitsContainer.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      if (featuredContainer) featuredContainer.removeEventListener("scroll", handleScroll);
      if (biggestHitsContainer) biggestHitsContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="relative">
          {/* Left Arrow */}
          {showFeaturedLeftArrow && (
            <button
              onClick={() => scrollContainer(featuredChartsRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {/* Scrollable Content */}
          <div ref={featuredChartsRef} className="flex overflow-x-auto no-scrollbar">
            {albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {showFeaturedRightArrow && (
            <button
              onClick={() => scrollContainer(featuredChartsRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s Biggest Hits</h1>
        <div className="relative">
          {/* Left Arrow */}
          {showBiggestHitsLeftArrow && (
            <button
              onClick={() => scrollContainer(biggestHitsRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {/* Scrollable Content */}
          <div ref={biggestHitsRef} className="flex overflow-x-auto no-scrollbar">
            {songsData.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {showBiggestHitsRightArrow && (
            <button
              onClick={() => scrollContainer(biggestHitsRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
