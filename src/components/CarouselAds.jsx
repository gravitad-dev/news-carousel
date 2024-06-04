import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function CarouselAds({ data }) {
  const [imagesArr, setImagesArr] = useState([]);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => a.order - b.order);
    setImagesArr(sortedData);
  }, [data]);

  //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", imagesArr);

  return (
    <div className="flex justify-center items-center w-full bg-black py-[12px] md:py-[8px] shadow-sm">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-[996px]"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent>
          {imagesArr.map((element, index) => (
            <CarouselItem key={element.id}>
              <div className="">
                <div className="flex h-[130px] md:h-[140px]">
                  <img
                    src={element.image.url}
                    alt={element.name}
                    className="w-full object-cover object-center"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}

export default CarouselAds;
