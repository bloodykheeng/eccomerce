import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";

const AppTopbar = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const productsItems = [
    { label: "Sedans", icon: "pi pi-fw pi-car" },
    { label: "SUVs", icon: "pi pi-fw pi-car" },
    { label: "Trucks", icon: "pi pi-fw pi-car" }
    // ... more product types
  ];

  const profileItems = [
    { label: "John Doe", icon: "pi pi-fw pi-user" },
    { label: "Vendor", icon: "pi pi-fw pi-users" }
    // ... more user profile details
  ];

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        /* Navigate to home */
      }
    },
    {
      label: "Best Selling",
      icon: "pi pi-fw pi-star",
      command: () => {
        /* Navigate to best selling */
      }
    },
    {
      label: "Products",
      icon: "pi pi-fw pi-tags",
      items: productsItems
    },

    {
      label: "FAQ",
      icon: "pi pi-fw pi-question",
      command: () => {
        /* Navigate to FAQ */
      }
    },
    {
      label: "Cart",
      icon: "pi pi-fw pi-shopping-cart",
      command: () => setCartVisible(true)
    },
    // {
    //   label: "Login",
    //   icon: "pi pi-fw pi-sign-in",
    //   command: () => {
    //     /* Trigger login */
    //   }
    // },
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
      command: () => setProfileVisible(true)
    }
  ];

  const start = (
    <img
      alt="Logo"
      src={`${process.env.PUBLIC_URL}/assets/cars/mycarclassic.png`}
      onError={(e) => (e.target.src = "path_to_default_logo")}
      style={{ height: "50px", marginRight: "10px" }}
    />
  );

  const end = (
    <React.Fragment>
      <div className="p-inputgroup" style={{ flex: "1 1 300px" }}>
        <InputText placeholder="Search product..." style={{ width: "100%" }} />
        <Button icon="pi pi-search" style={{}} />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "100",
          width: "100%",
          backgroundColor: "#ffffff"
        }}
      >
        <Menubar model={items} start={start} end={end} />
      </div>
      <Sidebar
        visible={profileVisible}
        position="right"
        onHide={() => setProfileVisible(false)}
        style={{ width: "300px" }}
      >
        <h3>User Profile</h3>
        {/* User profile details */}
        <div>
          <div style={{ margin: "1em", textAlign: "center" }}>
            <div>
              <strong>Name:</strong> John Doe
            </div>
            <div>
              <strong>Email:</strong> john@example.com
            </div>
            {/* ... more user details */}
          </div>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            onClick={() => {
              /* Handle logout */
            }}
          />
        </div>
      </Sidebar>
      <Sidebar
        visible={cartVisible}
        position="right"
        onHide={() => setCartVisible(false)}
        style={{ width: "300px" }}
      >
        <h3>Shopping Cart</h3>
        {/* Dummy shopping cart details */}
        <ul>
          <li>Product 1 - $100</li>
          <li>Product 2 - $150</li>
          {/* ... more products */}
        </ul>
        <Button
          label="Checkout"
          icon="pi pi-check"
          onClick={() => {
            /* Handle checkout */
          }}
        />
      </Sidebar>
    </React.Fragment>
  );
};

export default AppTopbar;
