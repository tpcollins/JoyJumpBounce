import {
    Home,
    About,
    Contact
 } from "../layouts/header/Menus"

// navbar section
export const navbarData = {
    buttons: [
        { btnText: "Home", comp: <Home />},
        { btnText: "Inventory", comp: <Home />},
        { btnText: "About Us", comp: <About />},
        { btnText: "How It Works", comp: <Home />},
        { btnText: "Contact Us", comp: <Contact />},
        { btnText: "Booking", comp: <Contact />}
    ]
}