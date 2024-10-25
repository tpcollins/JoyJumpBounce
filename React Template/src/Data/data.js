import {
    Home,
    About,
    Contact,
    Inventory,
    Booking
 } from "../layouts/header/Menus"

/*

TABLE OF CONTENTS:
1. navbar section
2. inventory section
3. swiper slider section (for slider component)
4. contact form section
5. stock grid

*/


// 1. navbar section
export const navbarData = {
    buttons: [
        { btnText: "Home", comp: <Home />},
        { btnText: "Inventory", comp: <Inventory />},
        { btnText: "About Us", comp: <About />},
        { btnText: "How It Works", comp: <Home />},
        { btnText: "Contact Us", comp: <Contact />},
        { btnText: "Booking", comp: <Booking />}
    ]
}

// 2. inventory section
export const inventoryData = {
    inventoryItems: [
        { src: "assets/images/inflatables/WaveRiderWBG2.png", title: "Wave Rider Waterslide", price: "$285 Single Day",description: "kindergarten", font: "'WaveRider', sans-serif", textImg: "assets/images/InvTextImages/waverider.png" },
        { src: "assets/images/inflatables/ComboWetSlideWBG.png", title: "Combo Wet Slide", price: "$200 Single Day", description: "kindergarten", font: "", textImg: "assets/images/InvTextImages/Tropical Combo.png"},
        { src: "assets/images/inflatables/DrySlideWBG.png", title: "17' Dry Slide", price: "$255 Single Day Wet, $175 Single Day Dry", description: "kindergarten", font: "", textImg: "assets/images/InvTextImages/DrySlide.png" }
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

// 4. contact form section
export const subjectData = {
    subjects: [
        {subject: "General Information"},
        {subject: "Bouncy House Rental"},
        {subject: "Accessories Rental"},
        {subject: "Pricing"},
        {subject: "Other"}
    ]
}

// 5. stock grid
export const bcyHseStockData = {
    data: [
        {imgSrc: "assets/images/inflatables/WaveRiderResized.png", title: "Wave Rider", price: "$285"},
        {imgSrc: "assets/images/inflatables/ComboWetSlideNoShadow.png", title: "Tropical Combo Slide", price: "$225 - Wet $175 Dry"},
        {imgSrc: "assets/images/inflatables/DrySlide.png", title: "Dry Slide", price: "$200"},
    ]
}