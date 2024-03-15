import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import smmcLogo from "../assets/SMMC-Logo.png";
import loginImg from "../assets/login.png";
import registerImg from "../assets/register.png";
import { AuthType } from "../types";
import Button from "./Button";
import Input from "./Input";

type Props = {
  variant: "register" | "login";
  title: "inscription" | "connexion";
};

const Auth = ({ variant, title }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthType>();

  const onSubmit: SubmitHandler<AuthType> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-primary-200/50">
      <div
        className={`flex items-center justify-center bg-gray-200 border-gray-400 ${
          variant === "login" ? "order-1 border-l-2" : "order-0 border-r-2"
        }`}
      >
        <img
          src={variant === "login" ? loginImg : registerImg}
          alt="Authentication illustration"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 md:justify-start md:mb-7">
            <img src={smmcLogo} alt="Logo SMMC" className="w-52" />
          </div>
          <h1 className="text-3xl capitalize text-gray">{title}</h1>
          <form
            className="pt-5 pb-5 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {variant === "register" ? (
              <>
                <Input
                  type="text"
                  register={register}
                  id="name"
                  placeholder="Nom"
                  errors={errors}
                />
                <Input
                  type="text"
                  register={register}
                  id="firstName"
                  placeholder="Prenom"
                  errors={errors}
                />
              </>
            ) : null}
            <Input
              type="number"
              register={register}
              id="matricule"
              placeholder="Matricule"
              errors={errors}
            />
            <Input
              type="password"
              register={register}
              id="password"
              placeholder="Mot de passe"
              errors={errors}
            />
            <Button type="submit">{title}</Button>
          </form>
          {variant === "login" ? (
            <h2 className="text-caption4 text-primary">
              <Link
                className="flex justify-center"
                to="/connexion/mots-de-passe-perdu"
              >
                Mot de pass perdu ?
              </Link>
            </h2>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Auth;
