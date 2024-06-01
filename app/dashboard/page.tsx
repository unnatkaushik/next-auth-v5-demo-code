import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      page {session?.user.username}
      <br />
      {session?.user.accessToken}
      <br />
      {session?.user.userid}
      <br />
    </div>
  );
};

export default page;
