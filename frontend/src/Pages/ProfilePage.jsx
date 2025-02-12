import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";


import { Camera, Mail, User } from "lucide-react"; // Camera icon from Lucide React

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (authUser) {
      setProfilePic(authUser.profilePic || "");
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({profilePic : base64Image });
    };

    reader.readAsDataURL(file);
  };
  

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Profile Image with Camera Icon for Upload */}
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={
                selectedImage||profilePic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhZoYRs8VQ0z37A4XkWKuYEvrTJmCcg8xLg&s"
              }
              alt="Profile"
              className={`w-full h-full rounded-full object-cover ${
                isUpdatingProfile ? "opacity-50" : ""
              }`}
            />
            <label
              htmlFor="profileImageUpload"
              className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer"
            >
              <Camera className="text-white" />
              <input
                type="file"
                id="profileImageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-base text-gray-500 flex justify-center">
            {isUpdatingProfile
              ? "uploading..."
              : "Click the camera icon to update your photo"}
          </p>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <p className="px-4 py-2.5 bg-white rounded-lg border pl-10">
                  {authUser?.fullName}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <p className="px-4 py-2.5 bg-white rounded-lg border pl-10">
                    {authUser?.email}
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-base-300 rounded-xl p-6">
               <h2 className="text-lg font-medium mb-4">Account Information</h2>
               <div className="space-y-3 text-sm"> 
                 <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser?.createdAt?.split("T")[0]}</span>
                 </div>
                 <div className="flex items-center justify-between py-2 ">
                  <span>Account Status</span>
                  <span className="text-green-600">Active</span>
                 </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default ProfilePage;
