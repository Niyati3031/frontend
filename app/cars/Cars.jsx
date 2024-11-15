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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search } from "react-feather";
import { RxTimer } from "react-icons/rx";
import { FaGasPump, FaCogs } from "react-icons/fa";
import { BsBookmark, BsArrowUpRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import carData from "../CarsData.json";
import { useFavorites } from "../Context/FavoritesContext";
import { getAllCars, getAllCarsDesc, getAllCarsTag, getAllCarsTitle } from "../api/helper";

const Cars = () => {
  const type = ["Title", "Description", "Tag"];
  let allCarsData = [];
  let matchesName;
  let matchesTag;
  let matchesDesc;
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(undefined);

  // State
  const[allTags, setAllTags] = useState("");
  const [filteredCars, setFilteredCars] = useState(allCarsData);
  const [dataCar, setDataCar] = useState(filteredCars);
  const [op, setOp] = useState("");
  const [titles, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);
  
  const [selectedType, setSelectedType] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");

  const handleTypeChange = async(value) => {
    if(value==type[0] && titles.length!=0){
      setOptions(titles);
      setOp(type[0]);
    }
    else if(value==type[1] && desc.length!=0){
      setOptions(desc);
      setOp(type[1]);
    }
    else if(value==type[2] && tags.length!=0){
      setOptions(tags);
      setOp(type[2]);
    }
    setSelectedType(value);
  }
  const handleValueChange = async(value) => {
    let newData = [];
      if(op==type[0]){
        getAllCarsTitle(value).then((data)=>{
          let cars = data.post;
          for(var i =0;i<cars.length;i++){
            var val = cars[i];
            newData.push(val);
          }
          setFilteredCars(newData);
        }
      )
      .catch((err)=>console.log(err));
      }else if(op==type[1]){
        getAllCarsDesc(value).then((data)=>{
          let cars = data.post;
          for(var i =0;i<cars.length;i++){
            var val = cars[i];
            newData.push(val);
          }
          setFilteredCars(newData);
        })
      .catch((err)=>console.log(err));
      }else if(op==type[2]){
        getAllCarsTag(value).then((data)=>{
          let cars = data.post;
          for(var i =0;i<cars.length;i++){
            var val = cars[i];
            newData.push(val);
          }
          setFilteredCars(newData);
        })
      .catch((err)=>console.log(err));
      }
  }
  const handlePriceChange = (value) => setSelectedPrice(value);

  const handleSearchClick = async () => {
    setFilteredCars(dataCar);
  };

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

  // unique car names
  const uniqueCarNames = Array.from(new Set(carData.map((car) => car.title)));
  
  useEffect(() => {
    let newData = [];
      getAllCars().then((data)=>{
        let cars = data.cars;
        for(var i =0;i<cars.length;i++){
          var val = cars[i];
          newData.push(val);
        }
        allCarsData = newData;
        // console.log(allCarsData);
        setFilteredCars(allCarsData);
        let titles = [];
        let desc = [];
        let tags = [];
        allCarsData.map((car)=>{
          titles.push(car.title);
          desc.push(car.desc);
          let tg = car.tags;
          tg.map((t)=> tags.push(t));
        })
        titles = Array.from(new Set(titles));
        desc = Array.from(new Set(desc));
        tags = Array.from(new Set(tags));
        setTitle(titles);
        setDesc(desc);
        setTags(tags);
    })
      .catch((err)=>console.log(err));

    
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      setUserInfo(storedUserInfo);
    }
  }, []);

  return (
    <div className="px-10 mt-10 mb-16 lg:px-40 md:px-20">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cars">Cars</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="pt-5 pb-10 text-2xl font-bold text-center text-black md:text-3xl lg:text-4xl ">
        Cars 🚀
      </h1>
      {/* Filtering Things */}
      <div className="flex mx-auto items-center justify-between mt-3 mb-16 border-white rounded-full bg-tertiary h-auto md:h-[60px] w-full max-w-[950px] p-2 shadow-lg gap-4 md:gap-0">
        <Select onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full ml-3 h-[50px] z-10 border-none bg-tertiary rounded-none outline-none focus:border-none focus:ring-0">
            <SelectValue placeholder="Select a search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {type.map((name, index) => (
                <SelectItem key={index} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedType &&
          <Select onValueChange={handleValueChange}>
          <SelectTrigger className="w-full h-[50px] z-10 bg-tertiary rounded-none border-none outline-none focus:border-none focus:ring-0">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectedType &&
              options.map((car, index) => (
                  <SelectItem key={index} value={car}>
                    {car}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        }
        {/* <div
          onClick={handleSearchClick}
          className="z-10 flex items-center justify-center p-3 rounded-full cursor-pointer bg-primary "
        >
          <Search className="w-4 h-4 text-white" />
        </div> */}
      </div>
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCars.map((car, index) => (
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
                  {car.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
