import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Preloader from "../src/layouts/PreLoader";
import "../styles/globals.css";

// Redux imports
import { Provider } from "react-redux";
import store, {persistor} from "../src/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ Component, pageProps }) => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Joy Jump Inflatables</title>
                <link 
                href="assets/images/Favicon.png" 
                rel="shortcut icon" />
                <link 
                href="assets/images/Favicon.png" 
                rel="apple-touch-icon-precomposed"  />
                <link 
                href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
                rel="stylesheet" />
            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {loader && <Preloader />}
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </Fragment>
    );
};

export default App;

// _app.js
// import Head from "next/head";
// import React, { Fragment } from "react";
// import AppWrapper from "./appwrapper";
// import "../styles/globals.css";

// const App = ({ Component, pageProps }) => {
//   return (
//     <AppWrapper>
//       <Fragment>
//         <Head>
//           <title>Joy Jump Inflatables</title>
//           <link href="assets/images/Favicon.png" rel="shortcut icon" />
//           <link
//             href="assets/images/Favicon.png"
//             rel="apple-touch-icon-precomposed"
//           />
//           <link
//             href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
//             rel="stylesheet"
//           />
//         </Head>
//         <Component {...pageProps} />
//       </Fragment>
//     </AppWrapper>
//   );
// };

// export default App;
