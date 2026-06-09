import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";



export default function App() {
  return (
    <div className="bg-base text-text min-h-screen transition-colors duration-300">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}