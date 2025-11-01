import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Destinations from "../components/Destinations";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Destinations />
      <Subscribe />
      <Footer />
    </>
  );
};

export default HomePage;
