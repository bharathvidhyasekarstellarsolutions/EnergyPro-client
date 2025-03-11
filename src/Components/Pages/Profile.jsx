import React, { useState, useEffect } from "react";

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user || { name: "", email: "", avatar: "" });

  // Load user from localStorage on page load
  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [user, setUser]);

  if (!user) return <p className="text-center text-red-500">Not Signed In</p>;

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdatedUser({ ...updatedUser, avatar: imageUrl });
    }
  };

  return (
    <div className="p-6 border h-screen text-center">
      <img
        src={updatedUser.avatar || "https://via.placeholder.com/100"}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
      />
      {isEditing ? (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
          <input
            type="text"
            name="name"
            value={updatedUser.Fullname}
            onChange={handleChange}
            className="border w-full p-2 mb-3 rounded"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            className="border w-full p-2 mb-3 rounded"
            placeholder="Email"
          />
          <input
            type="file"
            accept="image/*"
            className="border w-full p-2 mb-3 rounded"
            onChange={handleAvatarUpload}
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold">{user.Fullname}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
