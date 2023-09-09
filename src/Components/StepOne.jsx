import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "./feature/stepperSlice";

export default function StepOne() {
  const userData = useSelector((state) => state.stepper.userData);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(updateUserData({ ...userData, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      dispatch(updateUserData({ ...userData, [name]: value }));
    }
  };

  return (
    <>
      <form>
        <div className="form-group col-md-12">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            onChange={handleChange}
            value={userData["title"] || ""}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            rows="4"
            onChange={handleChange}
            value={userData["description"] || ""}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="image">Select Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
          {userData.image && (
            <img
              src={userData.image}
              alt="Selected Image Preview"
              style={{ width: "200px", height: "auto", marginTop: "10px" }}
            />
          )}
        </div>
        <br />
      </form>
    </>
  );
}
