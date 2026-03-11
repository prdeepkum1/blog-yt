import React from "react";
import {Button} from "../components/ui/button";
import Hero from "../components/Hero";
import RecentBlog from "../components/RecentBlog"
import PopularAuthors from "@/components/PopularAuthors"
// import Footer from "@/components/Footer"


const Home = () => {
  return (
    <div className="pt-40">
      <Hero/>
      <RecentBlog />
      <PopularAuthors />
      {/* <Footer /> */}
      
    </div>
  )
};

export default Home;