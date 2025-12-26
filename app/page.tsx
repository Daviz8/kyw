import { Footer, Navbar } from "./components/structural";
import Home from "./home/home";


export default function HomeLayout(){
    return(
        <main>
        <Navbar/>
        <Home/>
        <Footer/>
        </main>
    )
}