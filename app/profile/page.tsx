'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

export default function Profil() {
  useEffect(() => {
     getProfile();
  }, []);
  const [modifier, setModifier] = useState(false)
  const [modifierPass ,setModifierPass] = useState(false)
  const [profile, setProfile] = useState({
    email : '',
    nom : '',
  })

  const router = useRouter()

  const [PasswordChange,SetPasswordChange] = useState({
    password:'',
    newPassword:'',
    confirmNewPassword:''
  })
  function handleClick() {
    setModifier(!modifier)
    setModifierPass(false)
  }
  function handleClickPass() {
    setModifier(false)
    setModifierPass(!modifierPass)
    SetPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' });
  }



  async function handleChangePass(e : React.ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
    SetPasswordChange({...PasswordChange,[name]:value})
  }

  async function handleSubmitPass(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(PasswordChange.newPassword !== PasswordChange.confirmNewPassword){
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
      });
      return
    }

    const response = await fetch('http://localhost:5000/users/changePassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify(PasswordChange),
    })
    const data = await response.json()
    if (!response.ok) {
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
      SetPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' });
      return;
    }
     Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password changed successfully!',
      });
    setModifierPass(!modifierPass);
    SetPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' });
    return;
  }


  async function getProfile(){
    const response = await fetch('http://localhost:5000/users/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
    })
    const data = await response.json()
    if (!response.ok) {
      return
    }
    setProfile(data);
  }

  function handleChangeProfile(e: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = e.target;
  setProfile({ ...profile, [name]: value });
}
console.log(profile)
async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const response = await fetch('http://localhost:5000/users/updateProfile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
    body: JSON.stringify(profile),
  })
  const data = await response.json()
  if (!response.ok) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
    return;
  }
  Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile update with success !',
  });

}

async function handlelogoutClick(){
  localStorage.clear();
  window.location.href = '/login';
}


  

  return (
  <div className="container mx-auto px-4 py-8">
    <div className="p-6 xl:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h3 className="text-xl font-bold dark:text-white mb-2 sm:mb-0">General Information</h3>
        <button 
          onClick={handleClick}
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M16.5 3.5l4 4M12 11l6-6"/>
          </svg>
          {modifier ? "Cancel" : "Edit"}
        </button>
      </div>
      <form action="#" className="grid grid-cols-6 gap-6" onSubmit={handleProfileSubmit}>
        <div className="col-span-6 sm:col-span-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
          <input type="text" placeholder="email ..." required  name="email" value ={profile.email} onChange={handleChangeProfile} disabled={!modifier}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary-500" />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Full Name :</label>
          <input type="text" placeholder="Full Name ..." required name="nom" value ={profile.nom} onChange={handleChangeProfile} disabled={!modifier}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary-500" />
        </div>

        {modifier && 
          <div className="col-span-6">
            <button type="submit"
              className="w-full h-10 px-5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save 
            </button>
          </div>
        }
      </form>
    </div>
    <div className="p-6 xl:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h3 className="text-xl font-bold dark:text-white mb-2 sm:mb-0">Password update</h3>
        <button 
          onClick={handleClickPass}
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M16.5 3.5l4 4M12 11l6-6"/>
          </svg>
          {modifierPass ? "Cancel" : "Edit"}
        </button>
      </div>
      <br />
      <form action="#" onSubmit={handleSubmitPass} className="grid grid-cols-6 gap-6" >
        <div className="col-span-6 sm:col-span-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Current Password :</label> 
          <input type="password" placeholder="Old Password" required name ="password" value = {PasswordChange.password} onChange = {handleChangePass} disabled={!modifierPass}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary-500" />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New Password :</label>
          <input type="password" placeholder="New Password ..." required name = "newPassword" value = {PasswordChange.newPassword} onChange = {handleChangePass} disabled={!modifierPass}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary-500" />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repeat Password :</label>
          <input type="password" placeholder="Repeat Password ..." required name = "confirmNewPassword" value = {PasswordChange.confirmNewPassword} onChange = {handleChangePass} disabled={!modifierPass}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary-500" />
        </div>

        {modifierPass && 
          <div className="col-span-6">
            <button type="submit"
              className="w-full h-10 px-5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save 
            </button>
          </div>
        }
      </form>
    </div>
    <button onClick={handlelogoutClick} type="button" className="text-white bg-red-700  mt-6  hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
    </div>
  )
}
