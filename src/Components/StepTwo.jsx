import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStep, updateUserData } from "./feature/stepperSlice";

// Reusable form input component
const FormInput = ({ label, name, type, value, onChange }) => (
  <div className="form-group col-md-12">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      className="form-control"
      name={name}
      id={name}
      placeholder={label}
      onChange={onChange}
      value={value || ""}
    />
  </div>
);

export default function StepTwo() {
  const userData = useSelector((state) => state.stepper.userData);
  const dispatch = useDispatch();

  const handleChange = (index, e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        const base64Data = reader.result;
        dispatch(
          updateUserData({
            ...userData,
            steps: userData.steps.map((step, i) =>
              i === index ? { ...step, [name]: base64Data } : step
            ),
          })
        );
      };
    } else {
      dispatch(
        updateUserData({
          ...userData,
          steps: userData.steps.map((step, i) =>
            i === index ? { ...step, [name]: value } : step
          ),
        })
      );
    }
  };

  const addStepHandler = () => {
    dispatch(addStep());
  };

  return (
    <>
      <form>
        {/* Steps */}
        {userData.steps.map((step, index) => (
          <div key={index}>
            <center>
              <h6 className="blue-600 bold pt-2"> Step: {index + 1}</h6>
            </center>
            <div className="form-group col-md-12">
              <label htmlFor={`title-${index}`}>Title</label>
              <input
                className="form-control"
                required
                name={`title-${index}`}
                type="text"
                value={step[`title-${index}`]}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <br />
            <div className="form-group col-md-12">
              <label htmlFor={`description-${index}`}>Description</label>
              <textarea
                className="form-control"
                required
                id={`description-${index}`}
                rows="3"
                name={`description-${index}`}
                onChange={(e) => handleChange(index, e)}
                value={step[`description-${index}`] || ""}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor={`code-${index}`}>Enter Code</label>
              <textarea
                className="form-control"
                id={`code-${index}`}
                name={`code-${index}`}
                rows="4"
                onChange={(e) => handleChange(index, e)}
                value={step[`code-${index}`] || ""}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor={`image-${index}`}>Select Image</label>
              <input
                type="file"
                name={`image-${index}`}
                className="form-control"
                onChange={(e) => handleChange(index, e)}
              />
              {step[`image-${index}`] && (
                <img
                  src={step[`image-${index}`]}
                  alt={`Step ${index + 1}`}
                  style={{ height: "120px", width: "120px" }}
                />
              )}
            </div>
            <br />
          </div>
        ))}
        <br />
        <center>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addStepHandler}
          >
            Add Step
          </button>
        </center>
      </form>
    </>
  );
}
