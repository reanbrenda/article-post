import React, { useState } from "react";
import MoreDetailsComponent from "../Components/MoreDetailsComponent";
import { BsSearch } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Stepper from "../Components/Stepper";
import StepperControl from "../Components/StepperControl";
import StepOne from "../Components/StepOne";
import StepTwo from "../Components/StepTwo";
import StepThree from "../Components/StepThree";
import { StepperContext } from "../Context/StepperContext";
import HeaderComponent from "../Components/HeaderComponent";
import data from "../assets/data/data";
import Swal from "sweetalert2";
import Footer from "../Components/Footer";

export default function LandingPage() {
  const [lgShow, setLgShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const steps = ["Article Details", "Steps Involved", "Confirm Details"];
  const [submitted, setSubmitted] = useState(false);

  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Article details has been saved successfully",
      showConfirmButton: true,
      timer: 1500,
    });
  };

  const handleFormSubmit = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setSubmitted(true);
    setTimeout(() => {
      showAlert();
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    console.log(userData);
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return (
          <StepThree
            handleFormSubmit={handleFormSubmit}
            submitted={submitted}
          />
        );
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? (newStep += 1) : (newStep -= 1);
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <HeaderComponent />
      <div className="flex flex-col md:flex-row items-center mt-10 w-full mx-auto md:w-2/3 lg:w-1/2">
  <div className="search-bar flex items-center border border-gray-300 rounded-md p-2 bg-white w-full sm:w-3/4 md:w-3/4 md:mr-4">
    <BsSearch className="text-gray-600 text-xl" />
    <input
      type="text"
      onChange={(e) => handleSearchChange(e.target.value)}
      className="search-input flex-1 ml-2 text-base text-gray-800 outline-none"
      placeholder="Search..."
    />
  </div>
  <button
    className="btn btn-outline-primary md:w-auto mt-1 sm-mt-4 md:mt-0"
    onClick={() => setLgShow(true)}
  >
    Post Article
  </button>
</div>


      {/* Search Bar */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <div style={{ width: "100%", fontSize: "18px" }}>
            <center>Post Article</center>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            id="modalContent"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <div
              className="container horizontal"
              style={{ width: "100%", paddingLeft: "18%" }}
            >
              <center>
                <Stepper steps={steps} currentStep={currentStep} />
              </center>
            </div>

            <div className="my-2 p-2">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  finalData,
                  setFinalData,
                }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          </div>
        </Modal.Body>
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          handleFormSubmit={handleFormSubmit}
          submitted={submitted}
          steps={steps}
        />
      </Modal>
      <MoreDetailsComponent data={data} searchQuery={searchQuery} />
      <Footer />
    </>
  );
}
