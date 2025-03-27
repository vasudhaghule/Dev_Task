import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
   const [formData, setFormData] = useState({
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      companyName: "",
      isAgency: "yes",
   });

   const [showPassword, setShowPassword] = useState(false);
   const [passwordFocus, setPasswordFocus] = useState(false);
   const [passwordErrors, setPasswordErrors] = useState({
      length: true,
      number: true,
      special: true,
      capital: true,
   });

   const navigate = useNavigate();

   const validatePassword = (password) => {
      setPasswordErrors({
       length: password.length < 8,
       number: !/\d/.test(password),
       special: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
     capital: !/[A-Z]/.test(password),
      });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (name === 'password') {
         validatePassword(value);
      }
   };

   const isFormIncomplete = !formData.fullName || !formData.phoneNumber || !formData.email || !formData.password;
   const isPasswordValid = !Object.values(passwordErrors).some(error => error);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (isFormIncomplete) {
         alert("Please fill in all required fields");
         return;
      }
      if (!isPasswordValid) {
         alert("Please ensure your password meets all requirements");
         return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === formData.email)) {
         alert("email already registered. Please login.");
         return;
      }
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      
      alert("Signup successful!");
      navigate("/login");
   };

   return (
      <div className="min-h-screen max-w-[375px] mx-auto bg-white p-5">
         <h1 className="text-[28px] font-bold text-[#1D2939] mb-6"> Create your<br />PopX account
         </h1>

         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 relative">
               <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                  Full Name<span className="text-red-500">*</span>
               </label>
               <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1"/>
            </div>

            <div className="flex flex-col gap-1 relative">
               <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                  Phone number<span className="text-red-500">*</span>
               </label>
               <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1"
               />
            </div>

            <div className="flex flex-col gap-1 relative">
               <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                  Email address<span className="text-red-500">*</span>
               </label>
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1"
               />
            </div>

            <div className="flex flex-col gap-1 relative">
               <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                  Password<span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <input
                     type={showPassword ? "text" : "password"}
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     onFocus={() => setPasswordFocus(true)}
                   onBlur={() => setPasswordFocus(false)}
                     placeholder="Enter password"
                     required
                     className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1 pr-16"
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6C25FF] text-sm font-medium"
                  >
                     {showPassword ? "Hide" : "Show"}
                  </button>
               </div>
               {passwordFocus && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border border-[#DCDCDC]">
                     <p className="text-sm font-medium text-[#1D2939] mb-2">Password must contain:</p>
                     <ul className="space-y-1 text-sm">
                        <li className={`flex items-center gap-2 ${passwordErrors.length ? 'text-red-500' : 'text-green-500'}`}>
                           {passwordErrors.length ? '✕' : '✓'} At least 8 char
                        </li>
                        <li className={`flex items-center gap-2 ${passwordErrors.capital ? 'text-red-500' : 'text-green-500'}`}>
                           {passwordErrors.capital ? '✕' : '✓'} One uppercase letter
                        </li>
                        <li className={`flex items-center gap-2 ${passwordErrors.number ? 'text-red-500' : 'text-green-500'}`}>
                           {passwordErrors.number ? '✕' : '✓'} One number
                        </li>
                        <li className={`flex items-center gap-2 ${passwordErrors.special ? 'text-red-500' : 'text-green-500'}`}>
                           {passwordErrors.special ? '✕' : '✓'} One special char
                        </li>
                     </ul>
                  </div>
               )}
            </div>

            <div className="flex flex-col gap-1 relative">
               <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                  Company name
               </label>
               <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company name (optional)"
                  className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1"
               />
            </div>

            <div className="flex flex-col gap-2 mt-0">
               <label className="text-sm text-[#6C25FF]">
                  Are you an Agency ?<span className="text-red-500">*</span>
               </label>
               <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                     <input
                        type="radio"
                        name="isAgency"
                        value="yes"
                        checked={formData.isAgency === "yes"}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#6C25FF] border-[#DCDCDC]"
                     />
                     <span className="text-sm text-[#1D2939]">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                     <input
                        type="radio"
                        name="isAgency"
                        value="no"
                        checked={formData.isAgency === "no"}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#6C25FF] border-[#DCDCDC]"
                     />
                     <span className="text-sm text-[#1D2939]">No</span>
                  </label>
               </div>
            </div>

            <div className="md:mt-10 mt-6 mb-4">
                  <button
                     type="submit"
                     className="w-full py-3 mt-auto font-semibold text-center text-white transition bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                     Create Account
                  </button>
               </div>
         </form>
      </div>
   );
};

export default Signup;
