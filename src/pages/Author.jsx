import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useLocation } from "react-router-dom";

const Author = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [followers, setFollowers] = useState(0);
  const [following, setFolloinwg] = useState(false);

  async function fetch() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(response.data);
      setFollowers(response.data.followers);
      setLoading(false);
    } catch (error) {
      alert("An error occurred while trying to fetch user data.");
      console.error(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch();
  }, []);

  // useEffect(() => {
  //   setFollowers(author.followers);
  // }, [followers])

  function follow() {
    if (!following) {
      setFollowers(author.followers + 1);
      setFolloinwg(true);
    } else {
      setFollowers(author.followers);
      setFolloinwg(false);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {!loading ? (
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    ) : (
                      <div className="profile_avatar">
                        <div className="avatar-loading" />
                        <div className="profile_name avatar-loading-col">
                          <h4 className="avatar-text-loading"></h4>
                          <h4 className="avatar-text-loading-2"></h4>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {!loading ? (
                        <>
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={follow}>
                            {following ? "Unfollow" : "Follow"}
                          </Link>
                        </>
                      ) : (
                        <h4 className="avatar-follow-loading"></h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nfts={author.nftCollection} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
