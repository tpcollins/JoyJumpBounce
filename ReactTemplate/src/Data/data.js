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
7. checkout page
8. footer
9. error modal


// comment
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
        { src: "assets/images/inflatables/DrySlideWBG.png", title: "17' Dry Slide", price: "$255 Single Day Wet, $175 Single Day Dry", description: "kindergarten", font: "", textImg: "assets/images/InvTextImages/DrySlide.png", pgSection: 'dryslide' },
        { src: "assets/images/inflatables/ObstacleCourseWBG.png", title: "30 Foot Obstacle Course", price: "$225 Single Day Dry", description: "kindergarten", font: "", textImg: "assets/images/InvTextImages/OCInvText2.png", pgSection: 'obc' },
    ]
}

// 3. swiper slider section (for slider component)
export const invSwiperData = {
    swiperItems: [
        // Tropical Combo Slide
        {sub:"Tropical Combo Slide", 
        title: "Book Today for just $225! ($175 Dry)", 
        wrap:"Joy Jump Inflatables", 
        listItems: [
            "Birthdays!",
            "Get Togethers!",
            "Tailgates!"
        ],
        icons: [
            "🎂",
            "🎉",
            "🏈"
        ],
        routeBtns: [
            {href: "/floats", text: "View All Floats", className: "fl-btn st-12"},
            {href: "/booking", text: "Booking", className: "fl-btn st-1"},
        ],
        imgs: [
            {src: "assets/images/inflatables/ComboWetSlideNoShadow.png"}
        ]},
        // Dry Slide
        {sub:"Dry Slide", 
            title: "Book Today for just $200!", 
            wrap:"Joy Jump Inflatables", 
            listItems: [
                "100% Satisfaction!",
                "We do Holidays!",
                "Book Below!"
            ],
            icons: [
                "✅",
                "🎁",
                "🛒"
            ],
            routeBtns: [
                {href: "/floats", text: "View All Floats", className: "fl-btn st-12"},
                {href: "/booking", text: "Booking", className: "fl-btn st-1"},
            ],
            imgs: [
                {src: "assets/images/inflatables/DrySlide2.png"}
        ]},
        // Accessories
        {sub:"Need Additional Party Favors?", 
            title: "We've got you Covered!", 
            wrap:"Joy Jump Inflatables", 
            listItems: [
                "Chairs!",
                "Tents!",
                "Generators and so Much More!"
            ],
            icons: [
                "🪑",
                "🎪",
                "⚙️"
            ],
            routeBtns: [
                {href: "/accessories", text: "View All Accessories", className: "fl-btn st-12"},
                {href: "/booking", text: "Booking", className: "fl-btn st-1"},
            ],
            imgs: [
                {src: "assets/images/accessories/HomepageAccessories.png"}
        ]},
        // Contact Us
        {sub:"Let's get to Know Each Other!", 
            title: "Send us a Message Today!", 
            wrap:"Joy Jump Inflatables", 
            listItems: [
                "Multi-Day Bookings!",
                "General Info!",
                "Let's Chat!"
            ],
            icons: [
                "📅",
                "❓",
                "💬"
            ],
            routeBtns: [
                {href: "/contactus", text: "Contact Us", className: "fl-btn st-12"},
                {href: "/booking", text: "Booking", className: "fl-btn st-1"},
            ],
            imgs: [
                {src: "assets/images/logo/HomepageSliderLogo.png"}
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
        {subject: "Float Rental"},
        {subject: "Accessories Rental"},
        {subject: "Multi-Day Rental"},
        {subject: "Pricing"},
        {subject: "Other"}
    ]
}

// 5. stock grid
// export const bcyHseStockData = {
//     data: [
//         {id:  1, imgSrc: "assets/images/inflatables/WaveRiderResized.png", title: "Wave Rider", price: 285,showPrice: "$285", pgSection: 'waverider'},
//         {id:  2, imgSrc: "assets/images/inflatables/ComboWetSlideNoShadow.png", title: "Tropical Combo Slide", price: 225,showPrice: "$225 - Wet $175 - Dry", pgSection: 'tropcombo'},
//         {id:  3, imgSrc: "assets/images/inflatables/DrySlide.png", title: "Dry Slide", price: 200,showPrice: "$200", pgSection: 'dryslide'},
//     ]
// }
export const bcyHseStockData = {
    data: [
      {
        id: 1,
        imgSrc: "assets/images/inflatables/WaveRiderResized.png",
        title: "Wave Rider",
        price: 285,
        showPrice: "$285",
        pgSection: "waverider",
      },
      {
        id: 2,
        imgSrc: "assets/images/inflatables/ComboWetSlideNoShadow.png",
        title: "Tropical Combo Slide",
        type: "radio", // Indicates this item has multiple pricing options
        priceOptions: [
          { label: "Wet", price: 225 },
          { label: "Dry", price: 175 },
        ],
        pgSection: "tropcombo"
      },
      {
        id: 3,
        imgSrc: "assets/images/inflatables/DrySlide.png",
        title: "Dry Slide",
        price: 200,
        showPrice: "$200",
        pgSection: "dryslide",
      },
      {
        id: 4,
        imgSrc: "assets/images/inflatables/oc-nobg.png",
        title: "Obstacle Course",
        price: 225,
        showPrice: "$225",
        pgSection: "obc",
      },
    ],
  };
  

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
        // {
        //     imgSrc: 'assets/images/accessories/Tent.png',
        //     title: 'Inflatable Tent',
        //     price: 200,
        //     showPrice: '$200',
        //     type: 'radio'
        //   },
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

// 7. checkout page
export const checkoutData = {
    apiRoute: '/api/checkout',
    fields: [
        {title: "What Time Does Your Event Start?*", type: "time", message: "*We will show up an hour before this time to set everything up"},
        {title: "What Time Does Your Event End?", type: "time", message: ""},
        {title: "First Name", type: "text"},
        {title: "Last Name", type: "text"},
        {title: "Email", type: "text"},
        {title: "Grass or Concrete", type: "radio", options: [ {label: "Grass", value: "Grass"}, {label: "Concrete", value: "Concrete"}]},
        {title: "Water Hook up Within 100 Feet?", type: "radio", options: [ {label: "Yes", value: "Yes"}, {label: "No", value: "No"}]},
        {title: "Power Hook up Within 100 Feet?*", type: "radio", options: [ {label: "Yes", value: "Yes"}, {label: "No", value: "No"}], message: "*You will need to rent a generator from Accessories if there is no power hookup within 100 feet"},
        {title: "Phone Number", type: "text", placeholder: "Phone Number ........"},
        {title: "Street Address", type: "text", placeholder: "Street Address ........"},
        {title: "City", type: "text", placeholder:"City ........"}, 
        {title: "State", type: "text", placeholder: "State ........"},
        {title: "Zip Code", type: "text", placeholder: "Zip Code ........"},
        {title: "Discount Code (Optional)", type: "text", placeholder: "Discount Code ........"},
    ]
}

// 8. footer
export const footerData = {
    shortBio: "Joy Jump Inflatables. Let us Make Your Experience Unforgettable!",
    contactSection: [
        {title: "Tuscaloosa, AL", className: "far fa-map-marker-alt", type: "location"},
        {title: "JoyJumpInflatables@gmail.com", className: "far fa-envelope", type: "email"},
        {title: "+1 (205) 861-4553", className: "fal fa-phone", type: "phoneNumber", href: "tel:2058614553"}
    ]
}

// 9. error modal
export const multiDayError = {
    title: "Error",
    errorMessage: "Multi-day bookings are not available online."
}