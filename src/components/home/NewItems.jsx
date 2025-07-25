import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import NftCarousel from "../UI/NftCarousel";
import NftCarouselLoading from "../UI/NftCarouselLoading";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
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
      <div className="container" data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-offset="70">
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
                  <NftCarousel
                    nft={nft}
                    loading={loading}
                    key={index}
                  ></NftCarousel>
                ))
              : new Array(4)
                  .fill(0)
                  .map((_, index) => <NftCarouselLoading key={index}></NftCarouselLoading>)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
