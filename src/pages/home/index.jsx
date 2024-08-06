import Header from "@/components/header";
import TextSummarizer from "@/components/text-summarizer";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="flex mt-16 items-center justify-center">
        <TextSummarizer />
      </div>
    </div>
  );
};

export default Home;
