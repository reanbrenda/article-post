import React from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="mt-16">
  <footer className="text-white py-4 text-center" style={{ backgroundColor: "#24262b" }}>
    <div className="container mx-auto">
      <br/>
      <div className="flex items-center justify-center mb-6">
        <RiDoubleQuotesL className="text-blue-500 text-4xl mr-2" />
        <p className="text-sm text-gray-400">Knowledge shared is knowledge squared</p>
        <RiDoubleQuotesR className="text-blue-500 text-4xl ml-2" />
      </div>
      <hr className="w-3/4 mx-auto mb-6 h-0.5 bg-gray-500" />
      <div className="flex w-3/4 m-auto flex-col sm:flex-row justify-between">
        <p className="text-sm text-gray-400 mb-2 sm:mb-0">
          © {new Date().getFullYear()} Copyright D365F&O Devs
        </p>
        <p className="text-sm text-gray-400">All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</div>

  );
}
