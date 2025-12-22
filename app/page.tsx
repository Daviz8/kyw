import { Footer, Navbar } from "./components/structural";
import Home from "./home/home";


export default function HomeLayout(){
    return(
        <main className="bg-[]">
        <Navbar/>
        <Home/>
        <Footer/>
        </main>
    )
}