import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeSnippet from "../Components/CodeSnippet";
import HeaderComponent from "../Components/HeaderComponent";
import { BsSearch } from "react-icons/bs";
import { BiChevronsRight } from "react-icons/bi";
import AuthorInfo from "../Components/AutherInfo";
import data from "../assets/data/data";
import Footer from "../Components/Footer";

export default function MoreDetails() {
  const { id } = useParams();
  const articleData = data.find((item) => item.id === parseInt(id));
  const filteredData = data.filter((item) => item.id !== id);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };
  // Add state for the scrolling line
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the total document height
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate the scroll position relative to the total document height
      const scrollPercentage =
        (window.scrollY / (documentHeight - window.innerHeight)) * 100;
      const lineWidth = Math.min(scrollPercentage, 100);

      setScrolling(lineWidth);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className={`scroll-line`} style={{ width: `${scrolling}%` }} />
      <div className="pt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-8">
              <h2 className="text-3xl font-bold mb-4">{articleData.title}</h2>
              <p className="mb-6">{articleData.description}</p>
              {articleData.steps.map((step, index) => (
                <div key={index}>
                  <h4>
                    Step {index + 1}: {step.title}
                  </h4>
                  <p>{step.description}</p>
                  <br />
                  {step.codeSnippet === "NULL" ? (
                    <div />
                  ) : (
                    <CodeSnippet code={step.codeSnippet} language="x++" />
                  )}
                  <br />
                  {step.image === "NULL" ? (
                    <div />
                  ) : (
                    <div onClick={() => handleImageClick(step.image)}>
                      <img
                        src={step.image}
                        alt={`Step ${index + 1}`}
                        className="w-3/4 h-1/2 cursor-pointer"
                      />
                    </div>
                  )}
                  <br />
                </div>
              ))}
            </div>

            <div className="col-span-1 p-8 relative">
              <h3 className="text-2xl font-bold mb-4">Search</h3>
              {/* Search Bar */}
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white w-full">
                <BsSearch className="text-gray-600 text-xl ml-2" />
                <input
                  type="text"
                  className="search-input flex-1 ml-2 text-base text-gray-800 outline-none"
                  placeholder="Search..."
                />
              </div>
              <br />
              <hr className="border-gray-300 border-t my-6" />
              <h4 className="text-xl font-bold mb-2">Recent Posts</h4>
              <div>
                {filteredData.map((item) => (
                  <div key={item.id} className="flex items-center h-10">
                    <BiChevronsRight className="text-blue-600" />
                    <p className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500 pt-3">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <hr className="border-gray-300 border-t my-6" />
              <h4 className="text-xl font-bold mb-2">Learning Materials</h4>
              <div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-500
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-500
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-500
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-300
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-300
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-300
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                      MB-910
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                      MB-910
                  </a>
                </div>
                <div className="flex items-center h-10">
                  <BiChevronsRight className="text-blue-600" />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://learn.microsoft.com/en-us/training/paths/introduction-develop-finance-operations/"
                    className="ml-2 text-blue-600 cursor-pointer hover:text-orange-500"
                  >
                    MB-910
                  </a>
                </div>
              </div>
              <hr className="border-gray-300 border-t my-6" />
              <h4 className="text-xl font-bold mb-2">About</h4>
              <p>
                The platform is aimed at sharing knowledge among the ESS
                Developer on some of the errors we have encountered and how we
                were able to manage. In other words, this is a platform for
                sharing success stories related to debugging code.
              </p>
              <br />
              <hr className="border-gray-300 border-t my-6" />
              <h4 className="text-xl font-bold mb-2">About the author</h4>
              <AuthorInfo
                name={articleData.author.name}
                email={articleData.author.email}
                profile={articleData.author.profile}
                role={articleData.author.role}
              />
              <hr className="border-gray-300 border-t my-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Code for the modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <img src={modalImage} alt="Modal" className="max-w-screen-lg w-1/2" />
        </div>
      )}

      <Footer />
    </>
  );
}
