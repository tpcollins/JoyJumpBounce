import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlider } from "../SliderProps";
import Link from "next/link";
import { invSwiperData } from "../Data/data";

const Slider = () => {

    return(
    <section className="tf-slider-1">
        <div className="overlay" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="slider-1">
                <div className="themesflat-carousel clearfix">
                  <Swiper
                    {...heroSlider}
                    className="owl-carousel owl-theme none dots-none"
                  >
                    <SwiperSlide className="owl-item">
                    {invSwiperData.swiperItems.map((item, sdIdx) => (
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
                          <div className="box-custom">
                            <div className="wrap clr-pri-1">{item.wrap}</div>
                           <svg
                              data-name="Hero Area"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width={112}
                              height={71}
                              viewBox="0 0 112 71"
                            >
                              <g>
                                 <image
                                  width={112}
                                  height={71}
                                  xlinkHref="data:img/png;base64,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"
                                /> 
                              </g>
                            </svg>
                          </div>
                          <ul>
                          {item.listItems.map((li, liIdx) => (
                            <li 
                            className={`st-${liIdx + 1} fx`}
                            key={liIdx}
                            >
                              <i className="fas fa-check" />
                              <p 
                              className="li-clr-pri-2"
                              >{li}</p>
                            </li>
                          ))}
                          </ul>
                          <div className="box-btn">
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
                            />
                          ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Slider;