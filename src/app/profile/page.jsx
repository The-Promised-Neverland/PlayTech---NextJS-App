import React from "react";
import { Row } from "@/components/ReactBootStrap";
import ShowOrders from "@/components/ShowOrders";
import UpdateUser from "@/components/UpdateUser";

const ProfileScreen = () => {
  return (
    <Row>
      <UpdateUser />
      <ShowOrders />
    </Row>
  );
};

export default ProfileScreen;
