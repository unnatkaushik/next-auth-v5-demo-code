"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  username: string;
  password: string;
};
export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  //   username :- afpadmin
  // pass :-afp@1213
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const signinData = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (signinData?.error) {
      console.log(signinData);
    } else {
      // router.push("/dashboard");
    }
    console.log(signinData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="afpadmin" {...register("username")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("password")} defaultValue="afp@1213" />
      {/* errors will return when field validation fails  */}

      <input type="submit" />
    </form>
  );
}
