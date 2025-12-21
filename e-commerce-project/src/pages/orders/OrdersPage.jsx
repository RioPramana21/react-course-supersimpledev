import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header.jsx";
import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid.jsx";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("api/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/orders-favicon.png"
      />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
