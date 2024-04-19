import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";

//
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllCarTypes } from "./services/cars/car-types-service";

const AppTopbar = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [productsItems, setProductsItems] = useState([]);

  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product-types"],
    queryFn: getAllCarTypes
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      // Transform data into menu items
      const newProductsItems = data?.data?.map((carType) => ({
        label: carType.name, // Assuming 'name' is the field you want
        icon: "pi pi-fw pi-car" // Assuming all use the same icon
      }));
      setProductsItems(newProductsItems);
    }
  }, [data, isLoading, isError]);

  if (isError) {
    console.log("Error fetching getAllCarTypes:", error);
    toast.error(
      error?.response?.data?.message || "An Error Occurred Please Contact Admin"
    );
    return null;
  }

  const profileItems = [
    { label: "John Doe", icon: "pi pi-fw pi-user" },
    { label: "Vendor", icon: "pi pi-fw pi-users" }
    // ... more user profile details
  ];

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      style: { color: "blue" }, // Example color
      command: () => {
        /* Navigate to home */
      }
    },
    // {
    //   label: "Best Selling",
    //   icon: "pi pi-fw pi-star",
    //   style: { color: "gold" },
    //   command: () => {
    //     /* Navigate to best selling */
    //   }
    // },
    {
      label: "Products",
      icon: "pi pi-fw pi-tags",
      style: { color: "green" },
      items: productsItems
    },
    {
      label: "Spare Parts",
      icon: "pi pi-fw pi-cog",
      style: { color: "red" },
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-circle-on",
          style: { color: "green" }
        },
        {
          label: "Used",
          icon: "pi pi-fw pi-circle-off",
          style: { color: "orange" }
        }
      ]
    },
    {
      label: "FAQ",
      icon: "pi pi-fw pi-question",
      style: { color: "violet" },
      command: () => {
        /* Navigate to FAQ */
      }
    },
    {
      label: "Cart",
      icon: "pi pi-fw pi-shopping-cart",
      style: { color: "purple" },
      command: () => setCartVisible(true)
    },
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
      style: { color: "black" },
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

  const handleLoginClick = () => {
    navigate("/login"); // Assuming '/login' is your path to the login page
  };
  const end = (
    <React.Fragment>
      <Button label="Login" icon="pi pi-user" onClick={handleLoginClick} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div>
        <Menubar className="app-topbar" model={items} start={start} end={end} />
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
