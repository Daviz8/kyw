import { Footer, Navbar } from "./components/structural";
import Home from "./home/home";


export default function HomeLayout(){
    return(
        <main className="bg-[rgba(11,13,21,1)]">
        <Navbar/>
        <Home/>
        <Footer/>
        </main>
    )
}