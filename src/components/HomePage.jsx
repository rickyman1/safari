import React from "react";
import Hero from "./Hero";
import About from "./About";
import Destinations from "./Destinations";
import Subscribe from "./Subscribe";
import Footer from "./Footer";

function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Destinations />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default HomePage;
