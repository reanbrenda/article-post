import React from "react";

export default function StepperControl({
  handleClick,
  currentStep,
  steps,
  handleFormSubmit,
  submitted,
}) {
  const scrollToTop = () => {
    const modalContent = document.getElementById("modalContent");
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  };
  return (
    <div className="container flex justify-around mt-1 mb-3">
      <button
       onClick={() => {
        handleClick("back");
        scrollToTop();
      }}
        
        className={`btn btn-outline-primary ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>
      {currentStep === steps.length ? (
        <button
          onClick={handleFormSubmit}
          className={`btn btn-primary ${
            submitted ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitted}
        >
          Submit
        </button>
      ) : (
        <button onClick={() => {
          handleClick("next");
          scrollToTop();
        }} className="btn btn-primary">
          Next
        </button>
      )}
    </div>
  );
}
