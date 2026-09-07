import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await API.get(`/orders/id/${id}`);

        if (!response.data?.order) {
          throw new Error("Order not found");
        }

        setOrder(response.data.order);
      } catch (err) {
        console.error("Order details error:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const getStatusClass = (status) => {
    const value = String(status || "Confirmed")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `order-status ${value}`;
  };

  const getProductName = (item) =>
    item.productName ||
    item.name ||
    item.product?.name ||
    "Medical Equipment";

  const getProductImage = (item) =>
    item.image ||
    item.productImage ||
    item.product?.image ||
    "https://via.placeholder.com/100x100?text=Product";

  const getProductPrice = (item) =>
    Number(
      item.price ??
        item.productPrice ??
        item.product?.price ??
        0
    );

  const getQuantity = (item) => Number(item.quantity || 1);

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="order-loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading order details</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-error-card">
          <div className="error-circle">!</div>
          <h2>Order Not Found</h2>
          <p>{error || "This order could not be found."}</p>

          <button
            className="back-primary-btn"
            onClick={() => navigate("/orders")}
          >
            ← Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const items = order.items || order.orderItems || [];

  const subtotal =
    order.subtotal ??
    items.reduce(
      (sum, item) =>
        sum +
        getProductPrice(item) * getQuantity(item),
      0
    );

  const shipping = Number(
    order.shippingCost ??
      order.shipping ??
      0
  );

  const total =
    order.totalAmount ??
    order.total ??
    subtotal + shipping;

  const customerName =
    order.customerName ||
    order.user?.name ||
    order.name ||
    "Customer";

  const customerEmail =
    order.customerEmail ||
    order.user?.email ||
    order.email ||
    "—";

  const customerPhone =
    order.phone ||
    order.customerPhone ||
    order.shippingAddress?.phone ||
    "—";

  const address =
    order.shippingAddress ||
    order.deliveryAddress ||
    {};

  const addressText =
    typeof address === "string"
      ? address
      : [
          address.address,
          address.street,
          address.addressLine,
          address.line1,
        ]
          .filter(Boolean)
          .join(", ");

  const city =
    typeof address === "string"
      ? order.city
      : address.city || order.city;

  const state =
    typeof address === "string"
      ? order.state
      : address.state || order.state;

  const pincode =
    typeof address === "string"
      ? order.pincode || order.pinCode
      : address.pincode ||
        address.pinCode ||
        address.postalCode ||
        order.pincode ||
        order.pinCode;

  const paymentMethod =
    order.paymentMethod ||
    order.payment ||
    "Cash on Delivery";

  const status =
    order.status || "Confirmed";

  return (
    <div className="order-details-page">
      <div className="order-details-container">

        {/* Back */}
        <button
          className="back-orders-link"
          onClick={() => navigate("/orders")}
        >
          ← Back to Orders
        </button>

        {/* Header */}
        <div className="order-details-header">
          <div>
            <span className="order-label">
              ORDER DETAILS
            </span>

            <h1>
              {order.orderId || order._id}
            </h1>

            <div className="order-header-info">
              <span>
                Ordered on{" "}
                <strong>
                  {formatDate(
                    order.createdAt ||
                      order.orderDate
                  )}
                </strong>
              </span>

              <span className="header-separator">
                •
              </span>

              <span>
                {items.length}{" "}
                {items.length === 1
                  ? "Item"
                  : "Items"}
              </span>
            </div>
          </div>

          <span className={getStatusClass(status)}>
            <span className="status-dot"></span>
            {status}
          </span>
        </div>

        {/* Main layout */}
        <div className="order-details-grid">

          {/* LEFT */}
          <div className="order-details-left">

            {/* Customer */}
            <section className="order-card">
              <div className="card-heading">
                <div className="card-heading-icon">
                  👤
                </div>

                <div>
                  <span className="card-label">
                    CUSTOMER
                  </span>
                  <h2>Customer Information</h2>
                </div>
              </div>

              <div className="customer-grid">

                <div className="customer-info-box">
                  <span>Full Name</span>
                  <strong>{customerName}</strong>
                </div>

                <div className="customer-info-box">
                  <span>Email Address</span>
                  <strong>{customerEmail}</strong>
                </div>

                <div className="customer-info-box">
                  <span>Phone Number</span>
                  <strong>{customerPhone}</strong>
                </div>

              </div>
            </section>

            {/* Address */}
            <section className="order-card">
              <div className="card-heading">
                <div className="card-heading-icon address">
                  📍
                </div>

                <div>
                  <span className="card-label">
                    DELIVERY
                  </span>
                  <h2>Delivery Address</h2>
                </div>
              </div>

              <div className="address-container">
                <strong>{customerName}</strong>

                <p>
                  {addressText ||
                    "Address not available"}
                </p>

                {(city || state || pincode) && (
                  <p>
                    {[city, state]
                      .filter(Boolean)
                      .join(", ")}
                    {pincode
                      ? ` - ${pincode}`
                      : ""}
                  </p>
                )}

                <div className="address-phone">
                  ☎ {customerPhone}
                </div>
              </div>
            </section>

            {/* Products */}
            <section className="order-card">
              <div className="card-heading">
                <div className="card-heading-icon product">
                  🛒
                </div>

                <div>
                  <span className="card-label">
                    PRODUCTS
                  </span>
                  <h2>Order Items</h2>
                </div>
              </div>

              <div className="order-items">

                {items.length === 0 ? (
                  <div className="no-items">
                    No products found.
                  </div>
                ) : (
                  items.map((item, index) => {
                    const price =
                      getProductPrice(item);

                    const quantity =
                      getQuantity(item);

                    return (
                      <div
                        className="order-product"
                        key={
                          item._id || index
                        }
                      >
                        <div className="product-image-box">
                          <img
                            src={getProductImage(item)}
                            alt={getProductName(item)}
                            onError={(event) => {
                              event.currentTarget.src =
                                "https://via.placeholder.com/100x100?text=Product";
                            }}
                          />
                        </div>

                        <div className="order-product-info">
                          <h3>
                            {getProductName(item)}
                          </h3>

                          <p>
                            Quantity:{" "}
                            <strong>
                              {quantity}
                            </strong>
                          </p>

                          <p>
                            Unit Price:{" "}
                            <strong>
                              {formatPrice(price)}
                            </strong>
                          </p>
                        </div>

                        <div className="order-product-total">
                          {formatPrice(
                            price * quantity
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="order-details-right">

            {/* Summary */}
            <section className="summary-card">
              <span className="card-label">
                ORDER SUMMARY
              </span>

              <h2>Payment Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <strong>
                  {shipping === 0
                    ? "FREE"
                    : formatPrice(shipping)}
                </strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  {formatPrice(total)}
                </strong>
              </div>
            </section>

            {/* Payment */}
            <section className="payment-card">
              <span className="card-label">
                PAYMENT
              </span>

              <h2>Payment Information</h2>

              <div className="payment-method-box">
                <div className="payment-method-icon">
                  💳
                </div>

                <div>
                  <span>Payment Method</span>
                  <strong>
                    {paymentMethod}
                  </strong>
                </div>
              </div>

              <div className="payment-recorded">
                <span>✓</span>
                <p>
                  {String(status).toLowerCase() ===
                  "cancelled"
                    ? "Order has been cancelled"
                    : "Payment information recorded"}
                </p>
              </div>
            </section>

            {/* Actions */}
            <section className="order-actions-card">

              {String(status).toLowerCase() !==
                "cancelled" && (
                <button
                  className="track-order-btn"
                  onClick={() =>
                    navigate(
                      `/orders/${order._id}/track`
                    )
                  }
                >
                  📦
                  <span>Track Order</span>
                  <b>→</b>
                </button>
              )}

              <button
                className="view-orders-btn"
                onClick={() =>
                  navigate("/orders")
                }
              >
                ← View All Orders
              </button>

            </section>

            {/* Reference */}
            <div className="order-reference-box">
              <span>ORDER REFERENCE</span>
              <strong>
                {order.orderId || order._id}
              </strong>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;