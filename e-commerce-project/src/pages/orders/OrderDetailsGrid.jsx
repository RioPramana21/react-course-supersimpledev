import { Fragment } from "react";
import { Link } from "react-router";
import dayjs from "dayjs";

export function OrderDetailsGrid({order}) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return (
          /**
           * CSS GRID & REACT FRAGMENTS EXPLAINED:
           * * 1. The Context (CSS Grid):
           * The parent container `.order-details-grid` uses `display: grid`.
           * CSS Grid only controls its DIRECT children. It ignores "grandchildren" (nested elements).
           * * 2. The Problem with using a <div> wrapper:
           * If we return a <div> here, that <div> becomes the single direct child of the grid.
           * The Grid will squash the entire product (Image + Details + Actions) into ONE grid cell.
           * The individual parts become "grandchildren" and lose their alignment.
           * * 3. The Solution (<Fragment>):
           * Fragments satisfy React's "One Root Element" rule but are "invisible" in the actual DOM.
           * React strips the Fragment away during rendering.
           * Result: The Image, Details, and Actions remain as 3 separate elements in the DOM,
           * making them DIRECT children of the Grid so they flow into their correct columns.
           */
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img
                  className="buy-again-icon"
                  src="images/icons/buy-again.png"
                />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
