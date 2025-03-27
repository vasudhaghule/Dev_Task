import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
   const navigate = useNavigate();
   const [selectedImg, setSelectedImg] = useState("");
   const [user, setUser] = useState(null);

   useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
         navigate('/login');
         return;
      }
      setUser(currentUser);
      setSelectedImg(currentUser.profilePic || "");
   }, [navigate]);

   const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setSelectedImg(reader.result);
            const updatedUser = {
               ...user,
               profilePic: reader.result
            };


            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);
         };
         reader.readAsDataURL(file);
      }
   };

   if (!user) return null;
   return (
      <div className="flex flex-col items-center justify-end min-h-screen px-6 text-center bg-white">
       <div className="flex flex-col w-full max-w-md min-h-screen bg-[#fbfbfb] shadow-md">
      <div className="flex justify-between items-center p-4 bg-white">
         <h1 className="text-2xl font-bold text-left">Account Settings</h1>
       </div>

      <div className="flex items-start gap-4 p-4">
       <div className="relative">
          <label htmlFor="upload" className="cursor-pointer">
             <div className="relative">
                <img
                    src={selectedImg || "https://via.placeholder.com/100"}
                      alt="User Avatar"
                      className="md:w-24 md:h-24 w-[76px] h-[76px] rounded-full object-cover"
                      />
                     <div className="absolute bottom-0 right-0 bg-[#6C25FF] rounded-full p-1">
                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3337 4.66667V11.3333C13.3337 13 12.3337 14.3333 10.3337 14.3333H5.66699C3.66699 14.3333 2.66699 13 2.66699 11.3333V4.66667C2.66699 3 3.66699 1.66667 5.66699 1.66667H10.3337C12.3337 1.66667 13.3337 3 13.3337 4.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                           <path d="M8.66699 11.3333H5.33366" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                           <path d="M10.667 8.66667H5.33366" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                           <path d="M10.667 6H5.33366" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                     </div>
                  </label>
                  <input type="file"id="upload" className="hidden" onChange={handleImageChange} accept="image/*"/>
               </div>

               <div className="flex flex-col text-left">
                  <h3 className="text-[#1D2939] text-lg font-bold"> {user.fullName}</h3>
                  <p className="text-[#475467] text-sm">{user.email}
                  </p>
               </div>
            </div>

            <div className="p-4 mt-6 text-left">
               <p className="text-[#475467] text-sm leading-[20px]">
                  Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
               </p>
               <div className="mt-4 border-t border-dashed border-[#EAECF0]"/>
            </div>
         </div>
      </div>
   );
};

export default Profile;
