
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaSync,
} from "react-icons/fa";

import API from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./ManageUsers.css";

function ManageUsers() {
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
        "FETCH USERS ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch users."
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

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <>
      <Navbar />

      <main className="manage-users-page">
        <div className="manage-users-container">

          {/* BACK */}

          <button
            type="button"
            className="manage-users-back"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          {/* HEADER */}

          <section className="manage-users-header">
            <div>
              <span className="manage-users-label">
                ADMIN PANEL
              </span>

              <h1>Manage Users</h1>

              <p>
                View and manage registered customers.
              </p>
            </div>

            <button
              type="button"
              className="refresh-users-button"
              onClick={fetchUsers}
              disabled={loading}
            >
              <FaSync />
              Refresh
            </button>
          </section>

          {/* SUMMARY */}

          <section className="users-summary">
            <div className="users-summary-icon">
              <FaUsers />
            </div>

            <div>
              <span>Total Users</span>
              <strong>{users.length}</strong>
            </div>
          </section>

          {/* LOADING */}

          {loading && (
            <section className="users-empty-state">
              <FaSync className="users-loading-icon" />

              <h2>Loading Users...</h2>

              <p>
                Please wait while registered users are loading.
              </p>
            </section>
          )}

          {/* NO USERS */}

          {!loading && users.length === 0 && (
            <section className="users-empty-state">
              <FaUsers />

              <h2>No Users Found</h2>

              <p>
                There are currently no registered customers.
              </p>
            </section>
          )}

          {/* USERS */}

          {!loading && users.length > 0 && (
            <section className="users-grid">

              {users.map((user) => (
                <article
                  className="user-card"
                  key={user._id}
                >

                  <div className="user-card-top">

                    <div className="user-avatar">
                      {(user.fullName ||
                        user.name ||
                        "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="user-role">
                      {user.role || "CUSTOMER"}
                    </div>

                  </div>

                  <div className="user-card-content">

                    <h2>
                      {user.fullName ||
                        user.name ||
                        "Unknown User"}
                    </h2>

                    <div className="user-detail">
                      <FaUser />

                      <div>
                        <span>Account</span>
                        <strong>
                          {user.role || "Customer"}
                        </strong>
                      </div>
                    </div>

                    <div className="user-detail">
                      <FaEnvelope />

                      <div>
                        <span>Email</span>
                        <strong>
                          {user.email ||
                            "Email not available"}
                        </strong>
                      </div>
                    </div>

                    <div className="user-detail">
                      <FaUsers />

                      <div>
                        <span>Registered On</span>
                        <strong>
                          {formatDate(user.createdAt)}
                        </strong>
                      </div>
                    </div>

                  </div>

                </article>
              ))}

            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default ManageUsers;

