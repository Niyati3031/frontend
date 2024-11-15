"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RxTimer } from "react-icons/rx";
import { FaGasPump, FaCogs } from "react-icons/fa";
import { BsBookmark, BsArrowUpRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFavorites } from "../Context/FavoritesContext";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CarCard = ({ carData }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(undefined);

  const {
    favoriteCars,
    setFavoriteCars,
    addFavoriteCars,
    removeFavoriteCars,
    isFavorite,
    countFavorite,
  } = useFavorites();

  const handleFavoriteToggle = (car) => {
    if (isFavorite(car.id)) {
      removeFavoriteCars(car?.id);
    } else {
      addFavoriteCars(car);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      setUserInfo(storedUserInfo);
    }
  }, []);

  return (
    <div className="px-10 mt-20 mb-20 lg:px-32 md:px-20">
      <h1 className="pb-20 text-4xl font-bold text-center text-black ">
        The Latest Cars 🔥
      </h1>
      <Slider {...settings}>
        {carData.map((car, index) => (
          <div
            key={index}
            className="px-1"
            onClick={() =>
              userInfo ? router.push(`/cars/${car.id}`) : router.push(`/login`)
            }
          >
            <Card className="overflow-hidden bg-white rounded-lg shadow-lg ">
              <CardHeader className="relative p-0">
                <Image
                  className="object-cover w-full h-48 cursor-pointer"
                  src={car.image[0]}
                  alt="Car"
                  width={500}
                  height={300}
                />
                {car.tags && 
                car.tags.map((car, ind) =>(
                  <div
                    className={`absolute px-3 py-2 text-xs font-semibold text-white rounded-full bg-blue-400 top-2 left-2`}
                  >
                    {car}
                  </div>
                ))
                }
              </CardHeader>
              <CardContent className="p-6 text-white bg-[#050B20]">
                <CardTitle className="text-lg font-bold cursor-pointer">
                  <Button
                    variant="link"
                    className="p-0 text-lg font-bold text-white cursor-pointer"
                  >
                    {car.title}
                  </Button>
                </CardTitle>
                <CardDescription className="text-sm truncate">
                  {car.description}
                </CardDescription>
              </CardContent>
              {/* <CardFooter className="flex items-center justify-between p-6 text-white bg-[#050B20]">
                <span className="text-lg font-bold">{car.price}</span>
                <Button
                  variant="link"
                  className="flex items-center text-white gap-x-2"
                >
                  View Details <BsArrowUpRight />
                </Button>
              </CardFooter> */}
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarCard;
