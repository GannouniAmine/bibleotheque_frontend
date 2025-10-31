'use client'

import { useEffect, useState } from "react";
import { changePassword } from "../../api/authenticationApi";
import { getProfile, updateProfile } from "../../api/userApi";
import { Profile } from "@/model/Profile.entity";
import { ChangePassword } from "@/model/ChangePassword.entity";
import Input from "@/sharedComponent/Input";


export default function Profil() {
  const [modifier, setModifier] = useState(false);
  const [modifierPass, setModifierPass] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    email: '',
    nom: '',
  });

  const [passwordChange, setPasswordChange] = useState<ChangePassword>({
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    getProfile(setProfile);
  }, []);

  function handleClick() {
    setModifier(!modifier);
    setModifierPass(false);
  }

  function handleClickPass() {
    setModifier(false);
    setModifierPass(!modifierPass);
    setPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' });
  }

  function handleChangeProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }

  function handleChangePass(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPasswordChange({ ...passwordChange, [name]: value });
  }

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateProfile(profile);
  }

  async function handleSubmitPass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await changePassword(passwordChange, setPasswordChange, setModifierPass, modifierPass);
  }

  async function handleLogoutClick() {
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      
     
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold dark:text-white">General Information</h3>
          <button onClick={handleClick} className="btn-edit"> {modifier ? "Cancel" : "Edit"} </button>
        </div>

        <form className="grid grid-cols-6 gap-6" onSubmit={handleProfileSubmit}>
          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Email"
              name="email"
              type="text"
              value={profile.email}
              onChange={handleChangeProfile}
              placeholder="email ..."
              required
              disabled={!modifier}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Full Name"
              name="nom"
              type="text"
              value={profile.nom}
              onChange={handleChangeProfile}
              placeholder="Full Name ..."
              required
              disabled={!modifier}
            />
          </div>

          {modifier && (
            <div className="col-span-6">
              <button type="submit" className="btn-save">Save</button>
            </div>
          )}
        </form>
      </div>

      
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold dark:text-white">Password update</h3>
          <button onClick={handleClickPass} className="btn-edit">{modifierPass ? "Cancel" : "Edit"}</button>
        </div>

        <form onSubmit={handleSubmitPass} className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Current Password"
              name="password"
              type="password"
              value={passwordChange.password}
              onChange={handleChangePass}
              placeholder="Old Password"
              required
              disabled={!modifierPass}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordChange.newPassword}
              onChange={handleChangePass}
              placeholder="New Password"
              required
              disabled={!modifierPass}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Repeat Password"
              name="confirmNewPassword"
              type="password"
              value={passwordChange.confirmNewPassword}
              onChange={handleChangePass}
              placeholder="Repeat Password"
              required
              disabled={!modifierPass}
            />
          </div>

          {modifierPass && (
            <div className="col-span-6">
              <button type="submit" className="btn-save">Save</button>
            </div>
          )}
        </form>
      </div>

      <button onClick={handleLogoutClick} className="btn-logout">Logout</button>
    </div>
  );
}
