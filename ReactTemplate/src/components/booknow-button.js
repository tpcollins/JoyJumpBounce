import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const BookNowButton = () => {
    const router = useRouter();
    const [hideButton, setHideButton] = useState(false);

  // Use Effect to hide the button based on the current route
    useEffect(() => {
        const hideOnPages = ["/booking", "/checkoutpage"]; // Pages to hide the button
        setHideButton(hideOnPages.includes(router.pathname));
    }, [router.pathname]);
    
    return (
        <>
            {!hideButton && (
                <a 
                className="side-button"
                href="/booking">
                    <span>Book Now!</span>
                </a>
            )}
        </>
    );
}

export default BookNowButton;
  