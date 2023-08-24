import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import React from 'react'
import { Navbar } from "../components/Navbar";
import Search from "../components/Search";
import Category from "../components/Category";

function Home() {
  return (
    <div>
      <Navbar />
      <div class="main">
        <Search />
        <Category />
        <Veggie />
        <Popular />
      </div>
    </div>
  )
}

export default Home