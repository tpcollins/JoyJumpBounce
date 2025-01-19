import JJBanner from "../components/JJBanner";
import Image from 'react-bootstrap/Image';
const Footer2 = ({footerData}) => {
  return (
    <>
      <div>
          {/* <Image src="/assets/images/inflatables/FooterBlurred.png" alt="img not found"/> */}

          {/* We know this works. This is probably what we will need to do for fixing mobile footer */}
          <picture className="f2-bg-img">
            <source
              id="mbl-ftr"
              srcSet="/assets/images/inflatables/MobileFooterBackground.png"
              media="(max-width: 768px)"
            />

            {/* iPad Air */}
            <source
              srcSet="/assets/images/inflatables/MobileFooterBackground.png"
              media="(width: 820px) and (height: 1180px)"
            />

            {/* iPad Pro */}
            <source
              srcSet="/assets/images/inflatables/MobileFooterBackground.png"
              media="(width: 1024px) and (height: 1366px)"
            />

            {/* Surface 7 Pro */}
            <source
              srcSet="/assets/images/inflatables/MobileFooterBackground.png"
              media="(width: 912px) and (height: 1368px)"
            />

            {/* Asus Zenbook Fold */}
            <source
              srcSet="/assets/images/inflatables/MobileFooterBackground.png"
              media="(width: 853px) and (height: 1280px)"
            />

            <img
              src="/assets/images/inflatables/FooterBlurred.png"
              alt="img not found"
            />
          </picture>
      </div>
      <footer id="footer" className="st-2">
        
        <div className="footer-inner st-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="widget-footer">
                  <div className="widget f2 f2-widget widget-logo">
                  <p className="wrap f-mulish short-bio">
                    {footerData.shortBio}
                  </p>

                    <div className="list-contact">
                      <ul>
                        {footerData.contactSection.map((item, idx) => (
                          <li className="fx contact-item" key={idx}>
                            {item.type === "phoneNumber" ? (
                              <a href={item.href}>
                                <i className={item.className} /> 
                                <span className="contact-title">{item.title}</span>
                              </a>
                            ) : (
                              <span>
                                <i className={item.className} /> 
                                <span className="contact-title">{item.title}</span>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  
                  <div className="widget f2 widget-business">
                    <div className="inner">
                      <div className="op-time">
                        <h4 className="title-widget">opening hours</h4>
                        <ul>
                          <li>
                            <span className="f-mulish">Monday - Friday</span>
                          </li>
                          <li>
                            <span className="f-mulish">8:00am - 5:00pm</span>
                          </li>
                        </ul>
                      </div>
                      <div className="cls-time">
                        <p>We can accommodate holidays.</p>
                        {/* <h4 className="title-widget">closed</h4> */}
                      </div>
                    </div>
                  </div>

                  <div className="widget widget-news st-3 additional-questions f2">
                    <h4 className="title-widget additional-title">
                      Additional Questions? Get in Contact with us Today!
                    </h4>
                    
                    <div className="box-btn">
                      <a 
                        className="fl-btn st-12 footer"
                        href="/contactus"
                      >
                        <span 
                          className="inner"
                          style={{
                            fontSize: '10px !important'
                          }}
                        >
                          Go to Contact Page
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="social-icons">
                    <a
                        href="https://www.facebook.com/people/JoyJump-Inflatables/61556302704028/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#1877F2" viewBox="0 0 24 24" width="40px" height="40px">
                            <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.991 4.388 10.954 10.125 11.854V15.47h-3.047v-3.47h3.047v-2.644c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.953.928-1.953 1.88v2.244h3.328l-.531 3.47h-2.797v8.384C19.612 22.954 24 17.991 24 12z"/>
                        </svg>
                    </a>
                    <a
                        href="https://www.instagram.com/joyjump_inflatables/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#E4405F" viewBox="0 0 24 24" width="40px" height="40px">
                            <path d="M7.75 2h8.5C19.98 2 22 4.02 22 7.75v8.5C22 19.98 19.98 22 16.25 22h-8.5C4.02 22 2 19.98 2 16.25v-8.5C2 4.02 4.02 2 7.75 2zm-.43 2C5.517 4 4 5.517 4 7.32v9.36C4 18.483 5.517 20 7.32 20h9.36c1.803 0 3.32-1.517 3.32-3.32V7.32C20 5.517 18.483 4 16.68 4H7.32zm9.3 1.14h.72a1.14 1.14 0 1 1 0 2.28h-.72a1.14 1.14 0 1 1 0-2.28zM12 7.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 1.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z"/>
                        </svg>
                    </a>
              </div>

              <div className="col-12">
                <div className="footer-bottom f2 jus-ct">
                  <p className="copy-right">
                    Copyright © {new Date().getFullYear()}, Collins Web Design LLC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer2;
