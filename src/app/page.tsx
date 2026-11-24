import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import ProblemSolving from "@/components/ProblemSolving";
import FutureDirection from "@/components/FutureDirection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Journey />
      {/* <ProblemSolving /> */}
      {/* <FutureDirection /> */}
      <Projects />
      <Contact />
    </>
  );
}
