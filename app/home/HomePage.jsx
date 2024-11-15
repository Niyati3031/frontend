"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "react-feather";
import Image from "next/image";
import HomeCar from "../././../public/HomePageCar.png";
import WhatWeHave from "./WhatWeHave";
import WhyUs from "./WhyUs";
import CarCard from "../Components/CarCard";
import Count from "./Count";
import CustomerReview from "./CustomerReview";
import carData from "../CarsData.json";
import { set } from "react-hook-form";
import { getAllCars } from "../api/helper";

const HomePage = () => {
  let allCarsData = [];
  // State
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleNameChange = (value) => setSelectedName(value);
  const handleModelChange = (value) => setSelectedModel(value);
  const handlePriceChange = (value) => setSelectedPrice(value);

  const handleSearchClick = () => {
    const searchParams = {
      name: selectedName,
      model: selectedModel,
      price: selectedPrice,
    };

    const filteredCar = carData.filter((car) => {
      const matchesName =
        searchParams.name === "" || car.name === searchParams.name;
      const matchesModel =
        searchParams.model === "" || car.model === searchParams.model;
      const matchesPrice =
        searchParams.price === "" ||
        (searchParams.price === "under-20k" && car.price < 20000) ||
        (searchParams.price === "20k-50k" &&
          car.price >= 20000 &&
          car.price <= 50000) ||
        (searchParams.price === "50k-100k" &&
          car.price >= 50000 &&
          car.price <= 100000) ||
        (searchParams.price === "over-100k" && car.price > 100000);

      // console.log({
      //   carName: car.name,
      //   carModel: car.model,
      //   carPrice: car.price,
      //   matchesName,
      //   matchesModel,
      //   matchesPrice,
      // });

      return matchesName || matchesModel || matchesPrice;
    });

    setFilteredCars(filteredCar);
  };

  useEffect(() => {
    let newData = [];
      getAllCars().then((data)=>{
        let cars = data.cars;
        for(var i =0;i<cars.length;i++){
          var val = cars[i];
          newData.push(val);
        }
        allCarsData = newData;
        console.log(allCarsData);
        setFilteredCars(allCarsData);
    })
      .catch((err)=>console.log(err));

  }, []);
  // unique car names
  const uniqueCarNames = Array.from(new Set(carData.map((car) => car.name)));

  return (
    <>
      <div className="w-full px-3 h-[400px] md:h-[650px] bg-tertiary pt-32 mb-40">
        <div className="flex flex-col items-center h-full gap-6">
          <p className="font-normal text-center text-md">
            Find cars for sale and for rent near you
          </p>
          <h1 className="text-2xl font-bold text-center md:text-4xl lg:text-5xl">
            Find Your Dream Car
          </h1>

          <div className="relative hidden md:block md:w-[700px] lg:w-[900px] md:mt-20 lg:mt-16">
            <Image
              src={HomeCar}
              alt="car"
              layout="responsive"
              width={800}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <WhatWeHave />
      <CarCard carData={filteredCars} />
      <WhyUs />
      <hr />
      <Count />
      <hr />
      <CustomerReview />
    </>
  );
};

export default HomePage;
