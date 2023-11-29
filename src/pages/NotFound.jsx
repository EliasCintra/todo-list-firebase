import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <img
          src="/images/not-found.jpg"
          alt="not found"
          className="w-[500px]"
        />
        <h1 className="font-bold text-3xl">Hmmm, pagina acessada não existe.</h1>
        <p className="text-xl font-medium">
          Voltar para pagina de Login.
        </p>
        <Link
          className="px-6 py-2 my-3 text-lg bg-red-500 text-white font-medium rounded-lg"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
