import React, { useState } from "react";
import Container from "./Container";

const Header = () => {
  return (
    <div className="bg-primary">
      <Container>
        <div className="flex items-center justify-between">
          <div className="w-2/6 font-mono text-xl font-bold text-secondary">
            Task Mart
          </div>
          <div className="w-4/6 justify-self-start text-dark">
            <ul className="flex items-center justify-end gap-x-5">
              <li className="font-mons text-base font-normal text-flat">
                profile
              </li>
              <li className="font-mons text-base font-normal text-flat">
                logout
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
