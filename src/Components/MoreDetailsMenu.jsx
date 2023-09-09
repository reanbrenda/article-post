import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/styles/MoreDetailsMenu.scss";
import "../assets/styles/skeleton.scss";

const MoreDetailsMenu = ({ menuItem }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 4000);
  }, []);

  MoreDetailsMenu.propTypes = {
    menuItem: PropTypes.array.isRequired,
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  const truncateDescription = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="item">
      {menuItem.map((item) => (
        <div className="item-con" key={item.id}>
          {loading ? (
            <div className="item-container">
              <img src={item.image} alt="" onContextMenu={handleContextMenu} />
              <div className="flex items-center justify-between">
                <h2 className="articleTitle">{item.title}</h2>
                <p className="articleDate">{item.dateOfCreation}</p>
              </div>
              <p className="articleDescription">
                {truncateDescription(item.description, 165)}
              </p>
              <a
                href={`dashboard/d365f&o/${item.id}`}
                className="btn btn-outline-primary"
              >
                Read More
              </a>
            </div>
          ) : (
            <div className="item-container">
              <div className="skeleton title animate-pulse h-240" />
              <div className="flex items-center justify-between">
                <h2 className="skeleton title animate-pulse width-50"></h2>
                <p className="skeleton title animate-pulse width-50"></p>
              </div>
              <p className="skeleton title animate-pulse"></p>
              <div className="skeleton title animate-pulse w-1/2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoreDetailsMenu;
