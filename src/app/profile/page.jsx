import React from "react";
import { Row } from "@/components/ReactBootStrap";
import ShowOrders from "@/components/ShowOrders";
import UpdateUser from "@/components/UpdateUser";

export const metadata = {
  title: "Profile Dashboard",
  icons: {
    icon: "/dashboard.ico"
  }
}

const ProfileScreen = () => {
  return (
    <Row>
      <UpdateUser />
      <ShowOrders />
    </Row>
  );
};

export default ProfileScreen;
