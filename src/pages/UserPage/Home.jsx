import React from "react";
import Navbar from "../../components/Navbar";
import Aside from "../../components/Aside";
import Dashboard from "./Dashboard"; // This includes your routes

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex flex-row">
        <Aside className="w-full md:w-1/4 " />
        <Dashboard className="flex-grow" />
      </div>
    </>
  );
}
