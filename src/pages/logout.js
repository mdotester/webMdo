import { userService } from "../services";
import Router from "next/router";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    userService.logout();
    Router.push("/login").catch(console.error);
  }, []);

  return <div>Logout</div>;
};

export default Logout;
