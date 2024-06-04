import React from "react";

function Frame({}) {
  //console.log(import.meta.env.VITE_PAGE_LOAD);
  return (
    <iframe
      className="aplication"
      src={`/api/${import.meta.env.VITE_PAGE_LOAD}`}
      width="100%"
      height="100%"
      frameBorder="0"
    ></iframe>
  );
}

export default Frame;
