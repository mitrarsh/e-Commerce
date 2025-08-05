import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const UserAccount = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [error, setError] = useState([]);
  const [submited, setSubmited] = useState(false);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, []);

  const {
    data: userData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["user", currentUser?.id], // use id to cache user-specific data
    queryFn: async () => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.id === currentUser?.id); // find current user
      return user;
    },
    enabled: !!currentUser, // only run if user is available
  });

  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: (updatedUser) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const index = users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const updateUserInLocalStorage = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
    }
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("✅ Form submitted");
    console.log("userData", userData);
    console.log(currentUser);

    if (!userData) return;

    const formData = new FormData(e.target);
    const errors = [];
    const currentPass = formData.get("currentPass");
    const newPass = formData.get("newPass");
    const confirmPass = formData.get("confirmPass");

    if (currentPass && currentPass !== userData?.password) {
      errors.push("Incorrect password!");
    }

    if (newPass && newPass !== confirmPass) {
      errors.push("Confirm password correctly");
    }

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    const updatedUser = {
      ...userData,
      firstName: formData.get("firstName") || userData.firstName || "",
      lastName: formData.get("lastName") || userData.lastName || "",
      email: formData.get("emailOrPhone") || userData?.emailorPhone,
      address: formData.get("address") || userData?.address,
      password: newPass || userData?.password,
    };

    setError([]);
    setCurrentUser(updatedUser);
    updateUserInLocalStorage(updatedUser);
    updateUser.mutate(updatedUser);
    console.log("submitted");
    setSubmited(true);
  }

  return (
    <div className="account">
      <header className="account-header">
        <div className="path">
          <Link>account</Link>
        </div>
        <div className="welcome">
          <span>
           Welcome! 
          </span>
          <span style={{ color: "red" }}>
           {userData?.name || currentUser?.firstName || "Guest"}
          </span>
        </div>
      </header>
      <div className="account-content">
        <div className="account-sidebar">
          <div className="account-sidebar-option">
            <h3>Manage My Account</h3>
            <ul>
              <li>My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </div>
          <div className="account-sidebar-option">
            <h3>My Order</h3>
            <ul>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>
          <div className="account-sidebar-option">
            <h3>My WishList</h3>
          </div>
        </div>
        <Form className="account-form" onSubmit={handleSubmit}>
          <h2>Edit Your Profile</h2>
          <div className="account-user">
            <div className="account-input">
              <h3>First Name</h3>
              <div className="search-bar account-input-bar">
                <input
                  className="search-input"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  defaultValue={userData?.firstName}
                />
              </div>
            </div>
            <div className="account-input">
              <h3>Last Name</h3>
              <div className="search-bar account-input-bar">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  defaultValue={userData?.lastName}
                />
              </div>
            </div>
          </div>
          <div className="account-user">
            <div className="account-input">
              <h3>Email</h3>
              <div className="search-bar account-input-bar">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Email"
                  defaultValue={currentUser?.emailOrPhone}
                  name="emailOrPhone"
                />
              </div>
            </div>
            <div className="account-input">
              <h3>Address</h3>
              <div className="search-bar account-input-bar">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Address"
                  name="address"
                  defaultValue={userData?.address}
                />
              </div>
            </div>
          </div>

          <div className="account-password">
            <div className="account-input">
              <h3>Password Changes</h3>
              <div className="search-bar account-input-bar">
                <input
                  className="search-input"
                  type="password"
                  placeholder="Current Passwod"
                  name="currentPass"
                />
              </div>
              <div className="search-bar account-input-password account-input-bar">
                <input
                  className="search-input"
                  type="password"
                  placeholder="New Passwod"
                  name="newPass"
                />
              </div>
              <div className="search-bar account-input-password account-input-bar">
                <input
                  className="search-input"
                  type="password"
                  placeholder="Confirm New Passwod"
                  name="confirmPass"
                />
              </div>
            </div>
          </div>
          <ul>
            {error.length === 0
              ? null
              : error.map((e, index) => (
                  <li key={index} style={{ color: "red" }}>
                    {e}
                  </li>
                ))}
          </ul>
          {submited && error.length === 0 ? (
            <p style={{ color: "green" }}>Your changes have been submited.</p>
          ) : null}
          <div className="account-form-btns">
            <button className="cancel">Cancel</button>
            <button className="save" type="submit">
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserAccount;
