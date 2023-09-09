import React from "react";

export default function AuthorInfo({ name, role, profile, email }) {
  return (
    <div className="bg-white">
      <div className="flex items-center">
        <img
          className="w-28 h-28 rounded-full"
          src={profile}
          alt="Author"
        />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700">
        {name} is a passionate software developer with experience in D365
        Finance and Operations. He loves to share his knowledge and experiences
        with the community through articles and tutorials.
      </p>
      <span className="text-sm text-gray-700">Contact Information: </span>
      <span/>
      <span className="text-sm text-gray-700 text-blue-500 underline" style={{color: "#037fff"}}> {email}</span>
    </div>
  );
}
