import React from "react";
import Header from "./Header";

function Layout(props) {
  // console.log(props);
  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
