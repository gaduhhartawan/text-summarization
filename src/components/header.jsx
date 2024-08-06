import React from "react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="mb-5 border-b-2 py-3 px-8 bg-inf">
      <nav className="flex items-center justify-between px-5">
        <h1 className="text-xl font-bold">Text Summarization</h1>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
