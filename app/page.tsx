import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhatWeBuild } from "@/components/what-we-build";
import { Philosophy } from "@/components/philosophy";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeBuild />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}