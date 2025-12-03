// import { Footer } from "@/api";
import TopContainer from "./top-container";
import Profile from "./profile";
import Project from "./project";
import FlowChart from "./flowChart";
import Footer from "./footer";

export function Home() {

  return (
    <>
      <TopContainer />
      <Profile />
      <Project />
      <FlowChart />
      <Footer />
    </>
  );
}

export default Home;
