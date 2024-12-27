// import { useState } from "react";

// const MobileMenu = () => {
//   const [toggle, setToggle] = useState(false);

//   return (
//     <header id="header" className="d-block d-xl-none">
//       <div className="top-bar">
//         <div className="inner jus-ct">
//           <p className="clr-pri-1">
//             Working Hours : Monday - Friday, 08:00 am - 05:00 pm
//           </p>
//         </div>
//       </div>
//       <div id="site-header" className="">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="site-header-inner fx">
//                 <div
//                   className="btn-menu"
//                   style={{ display: "block" }}
//                   onClick={() => setToggle(!toggle)}
//                 >
//                   <span />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <nav
//           id="mainnav-mobi"
//           className="mainnav st-2"
//           style={{ display: toggle ? "block" : "none" }}
//         >
//           <ul className="menu" id="mainnav">
//             <li className="menu-item">
//               <a href="/">Home</a>
//             </li>

//             <li className="menu-item">
//               <a href="/inventory">Inventory</a>
//             </li>

//             <li className="menu-item">
//               <a href="/aboutus">About Us</a>
//             </li>
            
//             <li className="menu-item">
//               <a href="/howitworks">How It Works</a>
//             </li>
            
//             <li className="menu-item">
//               <a href="/contactus">Contact Us</a>
//             </li>
            
//             <li className="menu-item">
//               <a href="/booking">Booking</a>
//             </li>

//           </ul>
//         </nav>
//       </div>
//       <div style={{ display: "none" }} />
//     </header>
//   );
// };
// export default MobileMenu;

import { useState } from "react";

const MobileMenu = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header id="header" className="d-block d-xl-none">
      <div className="top-bar">
        <div className="inner jus-ct">
          <p className="clr-pri-1">
            Working Hours : Monday - Friday, 08:00 am - 05:00 pm
          </p>
        </div>
      </div>
      <div id="site-header" className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="site-header-inner fx">
                <div
                  className="btn-menu"
                  style={{ display: "block" }}
                  onClick={() => setToggle(!toggle)}
                >
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          id="mainnav-mobi"
          className="mainnav st-2"
          style={{ display: toggle ? "block" : "none" }}
        >
          {/* Add the close button */}
          <button
            className="close"
            onClick={() => setToggle(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <ul className="menu" id="mainnav">
            <li className="menu-item">
              <a href="/">Home</a>
            </li>
            <li className="menu-item">
              <a href="/inventory">Inventory</a>
            </li>
            <li className="menu-item">
              <a href="/aboutus">About Us</a>
            </li>
            <li className="menu-item">
              <a href="/howitworks">How It Works</a>
            </li>
            <li className="menu-item">
              <a href="/contactus">Contact Us</a>
            </li>
            <li className="menu-item">
              <a href="/booking">Booking</a>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ display: "none" }} />
    </header>
  );
};
export default MobileMenu;