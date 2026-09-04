import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaEdit,
  FaChevronRight,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { AuthContext } from "../context/AuthContext";
import { getUserOrders } from "../services/orderService";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const { user: authUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    _id: "",
    name: "User",
    email: "",
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOAD PROFILE
  // =========================================

  useEffect(() => {
    loadProfile();
  }, [authUser]);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const savedUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const currentUser = authUser || savedUser;

      const userId =
        currentUser._id ||
        currentUser.id ||
        "";

      const userName =
        currentUser.name ||
        currentUser.fullName ||
        "User";

      const userEmail =
        currentUser.email || "";

      setUser({
        _id: userId,
        name: userName,
        email: userEmail,
      });

      // =====================================
      // LOAD USER ORDERS
      // =====================================

      if (userId) {
        try {
          const userOrders =
            await getUserOrders(userId);

          setOrders(
            Array.isArray(userOrders)
              ? userOrders
              : []
          );
        } catch (error) {
          console.error(
            "Failed to load user orders:",
            error
          );

          setOrders([]);
        }
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // PROFILE DATA
  // =========================================

  const firstLetter =
    user.name?.charAt(0)?.toUpperCase() || "U";

  const totalProducts = orders.reduce(
    (total, order) => {
      const items = Array.isArray(order.items)
        ? order.items
        : [];

      return (
        total +
        items.reduce(
          (sum, item) =>
            sum + Number(item.quantity || 1),
          0
        )
      );
    },
    0
  );

  const totalSpent = orders.reduce(
    (total, order) => {
      const amount =
        order.total ||
        order.totalPrice ||
        0;

      return total + Number(amount);
    },
    0
  );

  // =========================================
  // NAVIGATION
  // =========================================

  const openOrders = () => {
    navigate("/orders");
  };

  const openWishlist = () => {
    navigate("/wishlist");
  };

  const openAddresses = () => {
    navigate("/addresses");
  };

  const openEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <Navbar />

      <main className="profile-page">

        <div className="profile-container">

          {/* =================================
              BACK BUTTON
          ================================= */}

          <button
            className="profile-back-btn"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>


          {/* =================================
              PROFILE HEADER
          ================================= */}

          <section className="profile-header">

            <div className="profile-avatar">
              {firstLetter}
            </div>

            <div className="profile-header-info">

              <h1>{user.name}</h1>

              <p>
                {user.email ||
                  "No email available"}
              </p>

              <span className="profile-member">
                Medical Equipment Marketplace Member
              </span>

            </div>


            <button
              className="profile-edit-btn"
              onClick={openEditProfile}
            >
              <FaEdit />
              <span>Edit Profile</span>
            </button>

          </section>


          {/* =================================
              PROFILE STATS
          ================================= */}

          <section className="profile-stats">

            {/* ORDERS */}

            <div className="profile-stat">

              <div className="profile-stat-icon">
                <FaShoppingBag />
              </div>

              <strong>
                {loading
                  ? "..."
                  : orders.length}
              </strong>

              <span>Orders</span>

            </div>


            {/* PRODUCTS BOUGHT */}

            <div className="profile-stat">

              <div className="profile-stat-icon">
                <FaClipboardList />
              </div>

              <strong>
                {loading
                  ? "..."
                  : totalProducts}
              </strong>

              <span>Products Bought</span>

            </div>


            {/* TOTAL SPENT */}

            <div className="profile-stat">

              <div className="profile-stat-icon">
                <FaRupeeSign />
              </div>

              <strong>
                {loading
                  ? "..."
                  : `₹${totalSpent.toLocaleString(
                      "en-IN"
                    )}`}
              </strong>

              <span>Total Spent</span>

            </div>

          </section>


          {/* =================================
              PROFILE CONTENT
          ================================= */}

          <section className="profile-content">

            {/* =================================
                PERSONAL INFORMATION
            ================================= */}

            <div className="profile-card">

              <div className="profile-card-header">

                <div className="profile-card-icon">
                  <FaUser />
                </div>

                <div>
                  <h2>
                    Personal Information
                  </h2>

                  <p>
                    Manage your account information
                  </p>
                </div>

              </div>


              {/* FULL NAME */}

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  <FaUser />
                </div>

                <div className="profile-info-content">

                  <span className="profile-info-label">
                    Full Name
                  </span>

                  <span className="profile-info-value">
                    {user.name}
                  </span>

                </div>

              </div>


              {/* EMAIL */}

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  <FaEnvelope />
                </div>

                <div className="profile-info-content">

                  <span className="profile-info-label">
                    Email Address
                  </span>

                  <span className="profile-info-value">
                    {user.email ||
                      "Not available"}
                  </span>

                </div>

              </div>

            </div>


            {/* =================================
                MY ACCOUNT
            ================================= */}

            <div className="profile-card">

              <div className="profile-card-header">

                <div className="profile-card-icon">
                  <FaShoppingBag />
                </div>

                <div>
                  <h2>My Account</h2>

                  <p>
                    Manage your shopping activity
                  </p>
                </div>

              </div>


              <div className="profile-actions">

                {/* MY ORDERS */}

                <button
                  className="profile-action"
                  onClick={openOrders}
                >

                  <div className="profile-action-icon">
                    <FaShoppingBag />
                  </div>

                  <div className="profile-action-content">

                    <strong>
                      My Orders
                    </strong>

                    <span>
                      View your purchase history
                      and order status
                    </span>

                  </div>

                  <FaChevronRight className="profile-action-arrow" />

                </button>


                {/* WISHLIST */}

                <button
                  className="profile-action"
                  onClick={openWishlist}
                >

                  <div className="profile-action-icon">
                    <FaHeart />
                  </div>

                  <div className="profile-action-content">

                    <strong>
                      Wishlist
                    </strong>

                    <span>
                      View products you saved
                      for later
                    </span>

                  </div>

                  <FaChevronRight className="profile-action-arrow" />

                </button>


                {/* ADDRESSES */}

                <button
                  className="profile-action"
                  onClick={openAddresses}
                >

                  <div className="profile-action-icon">
                    <FaMapMarkerAlt />
                  </div>

                  <div className="profile-action-content">

                    <strong>
                      My Addresses
                    </strong>

                    <span>
                      Manage your delivery
                      addresses
                    </span>

                  </div>

                  <FaChevronRight className="profile-action-arrow" />

                </button>

              </div>

            </div>

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Profile;