import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Shared/Sidebar";
import bg from "../assets/bg.jpeg";
import { useEffect, useState } from "react";

const Main = () => {
    const [theme, setTheme] = useState("light");

    // apply theme to HTML tag
    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div
            className={`w-full mx-auto p-3 lg:max-w-6xl xl:max-w-7xl grid grid-cols-12 gap-5 min-h-screen bg-cover bg-center ${theme === "dark" && "text-white"} `}
        
        >
            <div className="col-span-full md:col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-full md:col-span-10 h-[96vh] overflow-y-auto">
                <Outlet context={{ toggleTheme, currentTheme: theme }} />
            </div>
        </div>
    );
};

export default Main;
