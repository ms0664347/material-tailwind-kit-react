import { Footer } from "@/widgets/layout";
import TopContainer from "./top-container";
import Profile from "./profile";
import Project from "./project";
import FlowChart from "./flowChart";

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
