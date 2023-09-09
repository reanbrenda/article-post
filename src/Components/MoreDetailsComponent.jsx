import React, { useState } from "react";
import MoreDetailsMenu from "./MoreDetailsMenu.jsx";
import "../assets/styles/MoreDetailsMenu.scss";

export default function MoreDetailsComponent({ data, searchQuery }) {
  const [menuItem, setMenuItem] = useState(data);

  // Function to filter data based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ListofArticles">
      <MoreDetailsMenu menuItem={filteredData} />
    </div>
  );
}
