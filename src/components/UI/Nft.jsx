import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nft = ({ nft }) => {
  const [time, setTime] = useState(
    nft.expiryDate ? Math.floor((nft.expiryDate - Date.now()) / 1000 - 1) : 0
  );

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        {nft.authorId && (
          <div className="author_list_pp">
            <Link
              to={`/author/${nft.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <img className="lazy" src={nft.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
        )}

        {!time || (
          <div className="de_countdown">
            {Math.floor(time / 3600) == 0 || `${Math.floor(time / 3600)}hr `}
            {Math.floor(time / 60) == 0 ||
              `${Math.floor((time / 60) % 60)}m `.padStart(2, 0)}
            {time % 60 == 0 || `${time % 60}s`}
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
            <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
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
  );
};

export default Nft;
