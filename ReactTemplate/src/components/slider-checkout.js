import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlider } from "../SliderProps";

const CheckoutSlider = ({data}) => {

    return(
    <section className="tf-slider-1">
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
                          <div 
                          className="sub clr-pri-2"
                          style={{color: 'white !important'}}
                          >
                            {item.sub}
                          </div>
                          <div className="title clr-pri-2">
                            {item.title}
                          </div>
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
                          <div 
                            className="box-btn"
                            style={{
                                paddingTop: '60px'
                            }}
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
                        <div className="box-feature">
                          <div className="image">
                          {item.imgs.map((img, imgIdx) => (
                            <img
                              alt="Image"
                              key={imgIdx}
                              src={img.src}
                              style={{
                                paddingTop: '30px',
                                paddingBottom: '15px'
                              }}
                            />
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