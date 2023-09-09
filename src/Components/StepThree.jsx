import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

export default function StepThree({ handleFormSubmit, submitted }) {
  const { userData } = useSelector((state) => state.stepper);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center mr-2">
          1
        </div>
        <span className="text-xl font-semibold">Article Details</span>
      </div>

      <div className="border rounded-md p-4 mb-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title:</label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded-md"
            value={userData.title}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Description:</label>
          <textarea
            className="w-full px-2 py-1 border rounded-md"
            rows="4"
            value={userData.description}
            disabled
          />
        </div>
        {userData.image?.length === 0 ? (
          <div />
        ) : (
          <img
            src={userData.image}
            alt="Article Banner"
            className="h-32 w-32 object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex items-center mb-4">
        <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center mr-2">
          2
        </div>
        <h4 className="text-xl font-semibold">Steps Involved</h4>
      </div>

      {userData.steps.map((step, index) => (
        <div key={index} className="border rounded-md p-4 mb-6">
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Step {index + 1} - Title:
            </label>
            <input
              type="text"
              className="w-full px-2 py-1 border rounded-md"
              value={step[`title-${index}`]}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Step {index + 1} - Description:
            </label>
            <textarea
              className="w-full px-2 py-1 border rounded-md"
              rows="4"
              value={step[`description-${index}`]}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Step {index + 1} - Code:
            </label>
            <textarea
              className="w-full px-2 py-1 border rounded-md"
              rows="4"
              value={step[`code-${index}`]}
              disabled
            />
          </div>

          {step[`image-${index}`] && (
            <img
              src={step[`image-${index}`]}
              alt={`Step ${index + 1}`}
              className="h-32 w-32 object-cover rounded-md"
            />
          )}
        </div>
      ))}
    </div>
  );
}
