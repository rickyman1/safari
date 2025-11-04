import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Destinations from "../components/Destinations";
import Hotels from "../components/Hotels";
import Subscribe from "../components/Subscribe";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Destinations />
      <Hotels />
      <Subscribe />
    </>
  );
}
