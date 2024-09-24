import {
    Home,
    About,
    Contact,
    Inventory
 } from "../layouts/header/Menus"

// navbar section
export const navbarData = {
    buttons: [
        { btnText: "Home", comp: <Home />},
        { btnText: "Inventory", comp: <Inventory />},
        { btnText: "About Us", comp: <About />},
        { btnText: "How It Works", comp: <Home />},
        { btnText: "Contact Us", comp: <Contact />},
        { btnText: "Booking", comp: <Contact />}
    ]
}

// inventory section
export const inventoryData = {
    inventoryItems: [
        { src: "assets/images/inflatables/WaveRiderResized.png", title: "Wave Rider Waterslide - 285 Single Day", description: "kindergarten" },
        { src: "assets/images/common/sc-gallery-2.jpg", title: "17' Dry Slide - $200 Single Day", description: "kindergarten" },
        { src: "assets/images/common/sc-gallery-3.jpg", title: "Tropical Combo - $255 Single Day Wet, $175 Single Day Dry", description: "kindergarten" }
    ]
}
