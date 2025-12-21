import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Link } from "react-router";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  /**
   * useParams EXPLAINED:
   * The useParams hook from react-router allows us to access the dynamic segments of the URL
   * In our route definition in App.jsx, we defined the path as "tracking/:orderId/:productId"
   * Here, :orderId and :productId are URL parameters (placeholders)
   * When a user navigates to a URL like /tracking/123/456
   * useParams will return an object with the values of these parameters
   */
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  // const params = useParams();
  // console.log("URL Params:", params);
  // Expected output example:
  // If URL is /tracking/123/456
  // URL Params: { orderId: "123", productId: "456" }

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const selectedProduct = order.products.find((product) => {
    return product.productId === productId;
  });

  // Calculate progress bar
  const totalDeliveryTimeMs = selectedProduct.estimatedDeliveryTimeMs - order.orderTimeMs
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100

  if (deliveryPercent > 100){
    deliveryPercent = 100
  }

  return (
    <>
      <title>Tracking</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/tracking-favicon.png"
      />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(selectedProduct.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D"
            )}
          </div>

          <div className="product-info">{selectedProduct.product.name}</div>

          <div className="product-info">
            Quantity: {selectedProduct.quantity}
          </div>

          <img className="product-image" src={selectedProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
