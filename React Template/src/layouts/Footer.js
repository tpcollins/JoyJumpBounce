import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer-1">
      <div className="footer-content">
          <div className="inner-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="widget-footer">
                    <div className="widget widget-logo">
                      {/* <p className="wrap f-mulish">
                      Let the Fun Begin. Book with us Below!
                      </p> */}
                      <div className="list-contact">
                        <ul>
                          <li className="fx">
                            <span>
                              <i className="far fa-map-marker-alt" /> Tuscaloosa, AL
                            </span>
                          </li>
                          <li className="fx">
                            <a href="mailto:hotline@gmail.com">
                              <i className="far fa-envelope" /> JoyJumpInflatables@gmail.com
                            </a>
                          </li>
                          <li className="fx">
                            <a href="tel:2058614553">
                              <i className="fal fa-phone" /> +(205) 861-4553
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="widget widget-business">
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
                          <p>We can accomadate holidays.<br/>Just reach out and let us know!</p>
                          {/* <h4 className="title-widget">closed</h4> */}
                        </div>
                      </div>
                    </div>
                    <div className="widget widget-news st-3">
                      <h4 className="title-widget">Recent Events</h4>
                      <ul className="list-news">
                        <li className="fx">
                          <img
                            src="assets/images/thumbnails/widget9.jpg"
                            alt="Image"
                            className="feature"
                          />
                          <ul className="box-content">
                            <li>
                              <h6 className="title">
                                {/* <Link href="/blog-grid">
                                  <a>Event 1</a>
                                </Link> */}
                              </h6>
                            </li>
                            <li>
                              {/* <Link href="/blog-grid">
                                <a 
                                className="fx meta-news clr-pri-6"
                                style={{color: '#1AB9FF'}}
                                >
                                  <i className="far fa-calendar-alt" />
                                  09/27/2024
                                </a>
                              </Link> */}
                            </li>
                          </ul>
                        </li>
                        <li className="fx">
                          <img
                            src="assets/images/thumbnails/widget10.jpg"
                            alt="Image"
                            className="feature"
                          />
                          <ul className="box-content">
                            <li>
                              <h6 className="title">
                                {/* <Link href="/blog-grid">
                                  <a>Event 2</a>
                                </Link> */}
                              </h6>
                            </li>
                            <li>
                              {/* <Link href="/blog-grid">
                                <a 
                                className="fx meta-news clr-pri-6"
                                style={{color: '#1AB9FF'}}
                                >
                                  <i className="far fa-calendar-alt" />
                                  09/28/2024
                                </a>
                              </Link> */}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="footer-bottom jus-ct">
                    <p className="copy-right">
                      Copyright © {new Date().getFullYear()}, Collins Web Design LLC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
};
export default Footer;
