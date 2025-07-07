import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import { use } from "react";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
  const [times, setTimes] = useState([100]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNfts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (loading) return;

    var timesTemp = [];
    nfts.map((nft, index) => {
      timesTemp[index] = nft.expiryDate
        ? Math.floor((nft.expiryDate - Date.now()) / 1000)
        : 0;
    });

    setTimes(timesTemp);

    let timer = setInterval(() => {
      setTimes((prev) => [...timesTemp]);
      timesTemp.map((time, index) => {
        if (timesTemp[index] > 0) timesTemp[index] = time - 1;
      });
    }, 1000);
  }, [loading]);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className={"next-arrow slick-arrow-custom"} onClick={onClick}>
        <i className="fa fa-chevron-right"></i>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={"prev-arrow slick-arrow-custom"} onClick={onClick}>
        <i className="fa fa-chevron-left"></i>
      </div>
    );
  }

  var settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "row slider-settings",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {!loading
              ? nfts.map((nft, index) => (
                  <div className="nft-col-custom" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${nft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          // title={`Creator: ${nft.author}`}
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {!times[index] || (
                        <div className="de_countdown">
                          {Math.floor(times[index] / 3600) == 0 ||
                            `${Math.floor(times[index] / 3600)}hr `}
                          {Math.floor(times[index] / 60) == 0 ||
                            `${Math.floor((times[index] / 60) % 60)}m `.padStart(
                              2,
                              0
                            )}
                          {times[index] % 60 == 0 || `${times[index] % 60}s`}
                        </div>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : new Array(4).fill(0).map((_, index) => (
                  <div className="nft-col-custom" key={index}>
                    <div className="nft_coll nft-loading"></div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
