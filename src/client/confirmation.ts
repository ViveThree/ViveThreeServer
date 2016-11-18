// Confirmation script that runs on Celery to track conversions

declare var App: any;

const order = App.getOrder({version: 'v1'});

const orderData = {
  orderNumber: order.number,
  buyerEmail: order.buyer.email,
  buyerFirstName: order.buyer.first_name,
  buyerLastName: order.buyer.last_name,
  subtotal: order.subtotal / 100, // convert to dollar
  discount: order.discount / 100, // convert to dollar
  shipping: order.shipping / 100, // convert to dollar
  taxes: order.taxes / 100, // convert to dollar
  total: order.total / 100, // convert to dollar
  discountCode: order.discount_code,
  currency: order.currency,
  lineItems: order.line_items
};

const url = "http://www.vivethree.com/confirm";
let request = new XMLHttpRequest();
request.open('POST', url, true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.send({ orderData: orderData });
