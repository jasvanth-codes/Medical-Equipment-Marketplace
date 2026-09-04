import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaSync,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

import "./AdminUsers.css";

function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/admin/users");

      console.log("ADMIN USERS RESPONSE:", response.data);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(
        "FETCH ADMIN USERS ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch users"
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <main className="admin-users-page">
        <div className="admin-users-container">

          <button
            type="button"
            className="admin-users-back"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          <div className="admin-users-header">

            <div>
              <span>ADMIN PANEL</span>

              <h1>Manage Users</h1>

              <p>
                View and manage registered customers.
              </p>
            </div>

            <div className="admin-users-header-right">

              <button
                type="button"
                className="admin-users-refresh"
                onClick={fetchUsers}
                disabled={loading}
              >
                <FaSync />
                Refresh
              </button>

              <div className="admin-users-count">
                <FaUsers />

                <div>
                  <strong>{users.length}</strong>
                  <span>Total Users</span>
                </div>
              </div>

            </div>

          </div>

          {loading ? (
            <div className="admin-users-empty">
              <FaSync className="loading-icon" />
              <h2>Loading Users...</h2>
              <p>
                Please wait while we fetch customer data.
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="admin-users-empty">
              <FaUsers />
              <h2>No Users Found</h2>
              <p>
                Registered customers will appear here.
              </p>
            </div>
          ) : (
            <div className="admin-users-list">

              {users.map((user, index) => (

                <article
                  className="admin-user-card"
                  key={user._id || index}
                >

                  <div className="admin-user-avatar">
                    <FaUser />
                  </div>

                  <div className="admin-user-main">

                    <div className="admin-user-name-row">

                      <div>
                        <span className="admin-user-label">
                          CUSTOMER
                        </span>

                        <h2>
                          {user.name || "Unknown User"}
                        </h2>
                      </div>

                      <span
                        className={`admin-user-role ${
                          user.role === "admin"
                            ? "role-admin"
                            : "role-user"
                        }`}
                      >
                        {user.role || "user"}
                      </span>

                    </div>

                    <div className="admin-user-details">

                      <div>
                        <FaEnvelope />

                        <div>
                          <span>Email</span>
                          <strong>
                            {user.email || "Not available"}
                          </strong>
                        </div>
                      </div>

                      <div>
                        <FaCalendarAlt />

                        <div>
                          <span>Registered On</span>
                          <strong>
                            {formatDate(
                              user.createdAt
                            )}
                          </strong>
                        </div>
                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminUsers;
