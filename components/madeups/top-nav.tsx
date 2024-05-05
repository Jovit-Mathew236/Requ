import React from "react";
import { ModeToggle } from "../theme-toggle";

type Props = {};

const TopNav = (props: Props) => {
  return (
    <div className="fixed top-10 left-0 z-50 w-full">
      <div className="m-auto flex justify-between items-stretch  w-11/12  print:hidden">
        <div className="w-[100%] flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
