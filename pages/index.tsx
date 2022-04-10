// import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import HeroSection from "../components/sections/HeroSection";
import Footer from "../components/Footer";
import MainSection from "../components/sections/MainSection";

function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={"flex flex-col items-center justify-center"}>
        <HeroSection />
        <MainSection />
      </main>

      <Footer />
    </>
  );
}

export default Home;
