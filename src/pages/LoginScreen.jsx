import React from "react";
import Swal from "sweetalert2";
import { auth } from "../auth/firebase";
import { useNavigate } from 'react-router-dom';
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import imagem from "../logo.png"

const LoginScreen = () => {
  const navigate = useNavigate()
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user.displayName)
      navigate('/home', { replace: true })
    } catch (error) {
      Swal.fire('Erro ao fazer login com o Google:', error.message, "info");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-primary dark:bg-dark-500 flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center">
        <img
          src={imagem}
          className="w-[150px]"
          alt="todoist icon"
        />
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="px-6 py-2 my-3 text-lg bg-gray-200 dark:bg-dark-100 hover:bg-gray-300 hover:scale-110 transition-all py-2 px-4 flex items-center gap-2 rounded-lg font-medium"
        >
          <GoogleIcon />
          Login pelo Google
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
