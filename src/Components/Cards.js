import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import Slider from "react-slick";
const Cards = () => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Products");
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  // extract single product from array
  const productNames = products.map((item) => item.product_name);
  //find unique product names
  const uniqueProducts = [...new Set(productNames)];
  // extract single state from array
  const states = products.map((item) => item.address.state);
  //find unique state names
  const uniqueStates = [...new Set(states)];
  // extract city state from array
  const cities = products.map((item) => item.address.city);
  //find unique state names
  const uniqueCities = [...new Set(cities)];

  useEffect(() => {
    fetch("https://assessment-edvora.herokuapp.com")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayProducts(data);
      });
  }, []);
  // handle product name change from dropdown menu
  const handleNameChange = (selected) => {
    setSelectedOption(selected);
    const selectedProduct = products.filter(
      (product) => product?.product_name === selected
    );
    setDisplayProducts(selectedProduct);
  };
  // handle state change
  const handleStateChange = (selected) => {
    setSelectedOption(selected);
    const selectedProduct = products.filter(
      (product) => product?.address.state === selected
    );
    setDisplayProducts(selectedProduct);
  };
  // handle City change
  const handleCityChange = (selected) => {
    setSelectedOption(selected);
    const selectedProduct = products.filter(
      (product) => product?.address.city === selected
    );
    setDisplayProducts(selectedProduct);
  };
  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-2">
          <div
            style={{ backgroundColor: "#131313" }}
            className="box py-4 px-1 rounded"
          >
            <h4 className="text-white">Filters</h4>
            <hr className="text-white" />
            {/* select name */}
            <select
              onChange={(e) => handleNameChange(e.target.value)}
              value={selectedOption}
              id="brand_names"
              className="mb-3"
            >
              {uniqueProducts.map((item) => (
                <option value={item}> {item}</option>
              ))}
            </select> <br />

            {/* select State */}
            <select
              onChange={(e) => handleStateChange(e.target.value)}
              value={selectedOption}
              id="brand_names"
              className="mb-3"
            >
              {uniqueStates.map((item) => (
                <option value={item}> {item}</option>
              ))}
            </select> <br />
            {/* select City */}
            <select
              onChange={(e) => handleCityChange(e.target.value)}
              value={selectedOption}
              id="brand_names"
              className="mb-3"
            >
              {uniqueCities.map((item) => (
                <option value={item}> {item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            <h2 className="text-white">Edvora</h2>
            <h3 className="text-secondary">Products</h3>
            <h4 className="text-white">Product Name</h4>
            <hr />
            <div
              style={{ backgroundColor: "#131313" }}
              className="py-2 ps-0 pe-2 row rounded d-flex justify-content-center"
            >
              <Slider {...settings}>
                {displayProducts.map((product) => (
                  <SingleProduct key={product.time} product={product} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
