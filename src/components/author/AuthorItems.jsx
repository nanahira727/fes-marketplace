import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Nft from "../UI/Nft";
import NftLoading from "../UI/NftLoading";

const AuthorItems = ({ nfts, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!loading
            ? nfts.map((nft) => (
                <Nft nft={nft} loading={loading} key={nft.nftId}></Nft>
              ))
            : new Array(8)
                .fill(0)
                .map((_, index) => <NftLoading key={index}></NftLoading>)}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
