// SharePopup.js
import React from "react";
import { Modal } from "react-bootstrap";
import twitters from "../../Assets/image/x-twitt.svg";
const SharePopup = ({ product, show, onHide }) => {
  const [copied, setCopied] = React.useState(false);

  const { name, id, slug } = product;
  const url = `https://atozbay.com/web/product/${id}`;
  const title = name;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${url}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Share Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup">
          <div className="content">
            <p>Share this link via</p>
            <ul className="icons">
              <a href={shareLinks.facebook} className="fbstyle">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={shareLinks.twitter} className="twitterstyle">
                <img src={twitters} />
              </a>
              <a href={shareLinks.linkedin} className="linkedinstyle">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </ul>
            <p>Or copy link</p>
            <div className="field">
              <i className="url-icon uil uil-link"></i>
              <input
                type="text"
                readOnly
                value={url}
                style={{ color: "gray" }}
              />
              <button className="copy-btns" onClick={() => handleCopy()}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SharePopup;
