import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nft from "../UI/Nft";
import NftLoading from "../UI/NftLoading";

const ExploreItems = () => {
  const [allNfts, setAllNfts] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slice, setSlice] = useState(8);
  const [filter, setFilter] = useState("");

  async function fetch() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter}`
      );
      setNfts(response.data.slice(0, slice));
      setAllNfts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetch();
  }, [filter]);

  async function loadMore() {
    setNfts(allNfts.slice(0, slice + 4));
    setSlice(slice + 4);
  }

  async function filterChange(event) {
    const filterValue = event.target.value;
    setFilter(`?filter=${filterValue}`)
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterChange(event)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading
        ? nfts.map((nft) => (
            <Nft nft={nft} loading={loading} key={nft.nftId}></Nft>
          ))
        : new Array(8)
            .fill(0)
            .map((_, index) => <NftLoading key={index}></NftLoading>)}
      {slice >= allNfts.length || (
        <div className="col-md-12 text-center">
          <Link
            to=""
            onClick={loadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
