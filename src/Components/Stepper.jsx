import React, { useEffect, useState, useRef } from "react";

export default function Stepper({ steps, currentStep }) {
  const [newStep, setNewStep] = useState([]);

  const updateStep = (stepNumber, steps) => {
    const newSteps = steps.map((step, index) => {
      if (index === stepNumber) {
        return {
          ...step,
          highlighted: false,
          selected: true,
          completed: true,
        };
      } else if (index < stepNumber) {
        return {
          ...step,
          highlighted: false,
          selected: false,
          completed: false,
        };
      }
      return step;
    });
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));
    setNewStep(updateStep(currentStep - 1, stepsState));
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        style={{ width: "100%" }}
        className={
          index === newStep.length - 1
            ? "flex items-center"
            : "flex items-center"
        }
      >
        <div className={`relative flex flex-col items-center text-teal-600`}>
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 ${
              step.completed ? "border-blue-400" : "border-gray-300"
            } h-12 w-12 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-blue-400 text-white font-bold"
                : "bg-white text-teal-600"
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#x2713;</span>
            ) : (
              index + 1
            )}
          </div>
          <div className="absolute text-blue-400 top-0 text-center mt-16 w-32 text-xs font-medium">
            {step.description}
          </div>
        </div>

        {index < newStep.length - 1 && (
          <div className="flex-auto">
            <hr
              className={`border-t-4 transition duration-500 ease-in-out ${
                step.completed ? "border-blue-600" : "border-gray-300"
              }`}
            />
          </div>
        )}
      </div>
    );
  });

  return <div className="mx-4 p-4 flex flex-row">{displaySteps}</div>;
}
