import React from "react";
import UserTable from "./Components/UserTable.js";
import Popup from "./Components/Popup.js";

function UserManagement() {
  return (
    <div>
      <UserTable />;
      <Popup />;
    </div>
  );
}

export default UserManagement;
