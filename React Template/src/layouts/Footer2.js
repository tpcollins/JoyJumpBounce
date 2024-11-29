import JJBanner from "../components/JJBanner";
const Footer2 = ({footerData}) => {
  return (
    <footer id="footer" className="st-2">
      <JJBanner />

      <div className="footer-inner st-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="widget-footer">
                <div className="widget f2-widget widget-logo">
                  <p className="wrap f-mulish">
                    {footerData.shortBio}
                  </p>

                  <div className="list-contact">
                    <ul>
                      {footerData.contactSection.map((item, idx) => (
                        <li 
                        className="fx"
                        key={idx}
                        >
                          {item.type === "phoneNumber" ? (
                            <a href={item.href}>
                              <i className={item.className} /> {item.title}
                            </a>
                          ) : (
                            <span>
                              <i className={item.className} /> {item.title}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                
                <div className="widget f2-widget widget-business">
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
                <div className="widget f2-widget widget-news st-3">
                  <h4 className="title-widget">Addtional Questions? Get in Contact with us Today!</h4>
                  
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
                        >Go to Contact Page</span>
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
  );
};
export default Footer2;
