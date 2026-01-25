import dayjs from "dayjs";

export function DeliveryDate({cartItem, deliveryOptions}) {
  /**
   * Delivery date displayed is based on the selected delivery option
   * So, we create a variable to find the selected delivery option for this cart item
   * We can do so by using .find() on the deliveryOptions array
   * .find() works by looping through each element in the array
   * and checking if the condition is true
   * It returns the first element that matches the condition
   * It will return the entire object that matches the condition so we'll have access to
   * all the properties of the delivery option
   * e.g. { id: '2', priceCents: 499, estimatedDeliveryTimeMs: 1655942400000 }
   *
   * That's why we can't just use cartItem.deliveryOptionId since
   * we need the whole object to access the estimate
   */
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        "dddd, MMMM D"
      )}
    </div>
  );
}
