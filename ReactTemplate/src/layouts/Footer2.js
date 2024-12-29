import JJBanner from "../components/JJBanner";
import Image from 'react-bootstrap/Image';
const Footer2 = ({footerData}) => {
  return (
    <>
      <div className="f2-bg-img">
          <Image src="/assets/images/inflatables/FooterBlurred.png" alt="img not found"/>

          {/* We know this works. This is probably what we will need to do for fixing mobile footer */}
          {/* <picture>
            <source
              srcSet="/assets/images/inflatables/FooterBlurred-small.png"
              media="(max-width: 768px)"
            />
            <source
              srcSet="/assets/images/inflatables/FooterBlurred.png"
              media="(min-width: 769px)"
            />
            <img
              src="/assets/images/inflatables/FooterBlurred-large.png"
              alt="img not found"
            />
          </picture> */}
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
                        <p>We can accomadate holidays.</p>
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
