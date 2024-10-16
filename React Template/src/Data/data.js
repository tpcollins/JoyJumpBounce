import {
    Home,
    About,
    Contact,
    Inventory
 } from "../layouts/header/Menus"

/*

TABLE OF CONTENTS:
1. navbar section
2. inventory section
3. swiper slider section (for slider component)

*/


// 1. navbar section
export const navbarData = {
    buttons: [
        { btnText: "Home", comp: <Home />},
        { btnText: "Inventory", comp: <Inventory />},
        { btnText: "How It Works", comp: <Home />},
        { btnText: "About Us", comp: <About />},
        { btnText: "Contact Us", comp: <Contact />},
        { btnText: "Booking", comp: <Contact />}
    ]
}

// 2. inventory section
export const inventoryData = {
    inventoryItems: [
        { src: "assets/images/inflatables/WaveRiderWBG2.png", title: "Wave Rider Waterslide", price: "$285 Single Day",description: "kindergarten", font: "'WaveRider', sans-serif", textImg: "assets/images/InvTextImages/waverider.png" },
        { src: "assets/images/inflatables/ComboWetSlideWBG.png", title: "17' Dry Slide", price: "$200 Single Day", description: "kindergarten", font: "", textImg: ""},
        { src: "assets/images/common/sc-gallery-3.jpg", title: "Tropical Combo", price: "$255 Single Day Wet, $175 Single Day Dry", description: "kindergarten", font: "", textImg: "" }
    ]
}

// 3. swiper slider section (for slider component)
export const invSwiperData = {
    swiperItems: [
        {sub:"Book Today!", 
        title: "View All of our Inventory Below!", 
        wrap:"Joy Jump Inflatables", 
        listItems: [
            "Birthdays!",
            "Get Togethers!",
            "Tailgates and so Much More!"
        ],
        routeBtns: [
            {href: "#", text: "Inventory", className: "fl-btn st-12"},
            {href: "#", text: "Booking", className: "fl-btn st-1"},
        ],
        imgs: [
            {src: "assets/images/inflatables/ComboWetSlideNoShadow.png"}
        ]},
    ]
}
