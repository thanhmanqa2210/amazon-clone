import React, { useState, useEffect } from "react";
import FooterInfo from "./FooterInfo";
import FooterItems from "./FooterItems";
import "../../assets/css/footer.css";
function Footer() {
  const [showBackToTop, setBackToTop] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  };
  const backToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="footer">
      {showBackToTop && (
        <button className="btn back_to_top" onClick={backToTop}>
          Back To Top
        </button>
      )}
      {/* <BorderFooter /> */}
      <FooterItems />
      <FooterInfo />
    </div>
  );
}
// const BorderFooter = () => {
//   const handleScroll = () => {
//     window.scrollTo(0, 0);
//   };
//   return (
//     <div className="border_footer" onClick={handleScroll}>
//       <h2>Border Footer</h2>
//     </div>
//   );
// };
export default Footer;
