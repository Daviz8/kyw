import Footer  from "./components/structural/Footer";
import Navbar from "./components/structural/Navbar";
import Home from "./home/page";

export default function HomeLayout() {
  return (
    <main>
      <Navbar />
      <Home />
      <Footer />
    </main>
  );
}