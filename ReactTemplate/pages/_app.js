import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Preloader from "../src/layouts/PreLoader";
import "../styles/globals.css";

// Redux imports
import { Provider } from "react-redux";
import store, {persistor} from "../src/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
// Cart Wrapper
import CartWrapper from "./cartwrapper";
// Book Now Button
import BookNowButton from "../src/components/booknow-button";

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
                {/* Standard favicon */}
                <link rel="icon" href="/favicon.ico" />
                {/* Favicons for modern browsers */}
                <link rel="icon" type="image/png" sizes="512x512" href="/assets/images/android-chrome-512x512.png" />
                {/* <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/android-chrome-192x192.png" /> */}
                {/* Apple Touch Icon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
                {/* Web App Manifest */}
                <link rel="manifest" href="/site.webmanifest" />

                <link 
                href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
                rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
                    rel="stylesheet"
                />


                {/* Meta for Web App */}
                <meta name="theme-color" content="#ffffff" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            </Head>




            {/* <Head>
                <title>Joy Jump Inflatables</title>
                <link 
                href="assets/images/favicon.ico" 
                rel="shortcut icon" />
                <link 
                href="assets/images/favicon.ico" 
                rel="apple-touch-icon-precomposed"  />
                <link 
                href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
                rel="stylesheet" />

                <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />

                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                <link rel="manifest" href="/site.webmanifest" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
                    rel="stylesheet"
                />
            </Head> */}
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {loader && <Preloader />}

                    <CartWrapper />

                    <BookNowButton />

                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </Fragment>
    );
};

export default App;
