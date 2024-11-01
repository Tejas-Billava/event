import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToBottom = () => {
  const { pathname } = useLocation(); // Hook to get the current location pathname

  useEffect(() => {
    // Scroll to the bottom of the page whenever the pathname changes
    window.scrollTo(0, document.body.scrollHeight);
  }, [pathname]); // Effect runs whenever the pathname changes

  return null; // This component does not render anything in the DOM
};

export default ScrollToBottom;
