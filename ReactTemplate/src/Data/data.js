import {
    Home,
    About,
    Contact,
    HowItWorks,
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
6. checkout accessories 
7. checkout modal
8. footer

*/


// 1. navbar section
export const navbarData = {
    buttons: [
        { btnText: "Home", comp: <Home />},
        { btnText: "Inventory", comp: <Inventory />},
        { btnText: "About Us", comp: <About />},
        { btnText: "How It Works", comp: <HowItWorks />},
        { btnText: "Contact Us", comp: <Contact />},
        { btnText: "Booking", comp: <Booking />}
    ]
}

// 2. inventory section
export const inventoryData = {
    inventoryItems: [
        { src: "assets/images/inflatables/WaveRiderWBG2.png", title: "Wave Rider Waterslide", price: "$285 Single Day",description: "kindergarten", font: "'WaveRider', sans-serif", textImg: "assets/images/InvTextImages/waverider.png", pgSection: 'waverider' },
        { src: "assets/images/inflatables/ComboWetSlideWBG.png", title: "Combo Wet Slide", price: "$200 Single Day", description: "kindergarten", font: "", textImg: "assets/images/InvTextImages/Tropical Combo.png", pgSection: 'tropcombo'},
        { src: "assets/images/inflatables/DrySlideWBG.png", title: "17' Dry Slide", price: "$255 Single Day Wet, $175 Single Day Dry", description: "kindergarten", font: "", textImg: "assets/images/InvTextImages/DrySlide.png", pgSection: 'dryslide' }
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
            {src: "assets/images/inflatables/DrySlide.png"}
        ]},
    ]
}

export const checkoutSwiperData = {
    swiperItems: [
        {sub:"Thanks for Choosing Joy Jump Inflatables! You Will Recieve a Reciept Shortly.", 
        title: "", 
        wrap:"Joy Jump Inflatables", 
        listItems: [
            "If you feel there is an issue with your order, please reach out to JoyJumpInflatables@gmail.com so we can assist you."
        ],
        routeBtns: [
            {href: "/", text: "Go Back Home", className: "fl-btn st-12"},
        ],
        imgs: [
            {src: "assets/images/logo/chsuccess.png"}
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
        {id:  1, imgSrc: "assets/images/inflatables/WaveRiderResized.png", title: "Wave Rider", price: 285,showPrice: "$285", pgSection: 'waverider'},
        {id:  2, imgSrc: "assets/images/inflatables/ComboWetSlideNoShadow.png", title: "Tropical Combo Slide", price: 225,showPrice: "$225 - Wet $175 - Dry", pgSection: 'tropcombo'},
        {id:  3, imgSrc: "assets/images/inflatables/DrySlide.png", title: "Dry Slide", price: 200,showPrice: "$200", pgSection: 'dryslide'},
    ]
}

// 6. checkout accessories 
export const accessoryData = {
    accessories: [
        {
          imgSrc: 'assets/images/accessories/generator.png',
          title: 'Generator',
          price: 75,
          showPrice: '$75',
          type: 'radio'
        },
        {
            imgSrc: 'assets/images/accessories/tent.png',
            title: 'Inflatable Tent',
            price: 200,
            showPrice: '$200',
            type: 'radio'
          },
        {
          imgSrc: 'assets/images/accessories/table.png',
          title: 'Table',
          price: 10,
          showPrice: '$10/Table',
          type: 'dropdown'
        },
        {
          imgSrc: 'assets/images/accessories/chair.png',
          title: 'Chair',
          price: 2,
          showPrice: '$2/Chair',
          type: 'dropdown'
        }
    ]
}

// 7. checkout modal
export const checkoutData = {
    apiRoute: '/api/checkout',
    fields: [
        {title: "What Time Does Your Event Start?*", type: "time", message: "*We will show up an hour before this time to set everything up"},
        {title: "First Name", type: "text"},
        {title: "Last Name", type: "text"},
        {title: "Grass or Concrete", type: "radio", options: [ {label: "Grass", value: "Grass"}, {label: "Concrete", value: "Concrete"}]},
        {title: "Water Hook up Within 100 Feet?", type: "radio", options: [ {label: "Yes", value: "Yes"}, {label: "No", value: "No"}]},
        {title: "Power Hook up Within 100 Feet?*", type: "radio", options: [ {label: "Yes", value: "Yes"}, {label: "No", value: "No"}], message: "*You will need to rent a generator from Accessories if there is no power hookup within 100 feet"},
        {title: "Phone Number", type: "text", placeholder: "Phone Number ........"},
        {title: "Street Address", type: "text", placeholder: "Street Address ........"},
        {title: "City", type: "text", placeholder:"City ........"}, 
        {title: "State", type: "text", placeholder: "State ........"},
        {title: "Zip Code", type: "text", placeholder: "Zip Code ........"},
    ]
}

// 8. footer
export const footerData = {
    shortBio: "Joy Jump Bounce LLC. Let us Make Your Experience Unforgettable!",
    contactSection: [
        {title: "Tuscaloosa, AL", className: "far fa-map-marker-alt", type: "location"},
        {title: "JoyJumpInflatables@gmail.com", className: "far fa-envelope", type: "email"},
        {title: "+1 (205) 861-4553", className: "fal fa-phone", type: "phoneNumber", href: "tel:2058614553"}
    ]
}