import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlider } from "../SliderProps";

const CheckoutSlider = ({data}) => {

    return(
    <section className="tf-slider-1 slider-checkout">
        <div className="overlay" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="slider-1">
                <div className="themesflat-carousel clearfix">
                    <SwiperSlide className="owl-item">
                    {data.swiperItems.map((item, sdIdx) => (
                      <div 
                      className="item-slider-1"
                      key={sdIdx}
                      >
                        <div className="box-content">
                          
                          <div className="clr-content-mbl">
                            <div 
                            className="sub clr-pri-2"
                            style={{color: 'white !important'}}
                            >
                              {item.sub}
                            </div>
                            <div className="title clr-pri-2">
                              {item.title}
                            </div>
                          </div>

                          <div className="box-feature">
                            <div className="image">
                            {item.imgs.map((img, imgIdx) => (
                              <img
                                alt="Image"
                                key={imgIdx}
                                src={img.src}
                              />
                            ))}
                            </div>
                          </div>

                          <div className="box-custom">
                            <ul>
                            {item.listItems.map((li, liIdx) => (
                              <li 
                              key={liIdx}
                              style={{
                                  paddingTop: '60px'
                              }}
                              >
                                <p 
                                  className="li-clr-pri-2-chkout"
                                  style={{
                                      color: 'white'
                                  }}
                                >{li}</p>
                              </li>
                            ))}
                            </ul>
                          </div>

                          <div 
                            className="box-btn"
                          >
                          {item.routeBtns.map((btn, btnIdx) => (
                            <a 
                            className={btn.className}
                            href={btn.href}
                            key={btnIdx}
                            >
                              <span className="inner">{btn.text}</span>
                            </a>
                          ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    </SwiperSlide>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default CheckoutSlider;