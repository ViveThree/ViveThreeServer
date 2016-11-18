// Confirmation script that runs on Celery to track conversions

declare var App: any;

interface CeleryItem {
  product_id: string;
  product_name: string;
  sku: string;
  quantity: number;
}

interface CeleryOrder {
  orderNumber: string;
  buyerEmail: string;
  buyerFirstName: string;
  buyerLastName: string;
  subtotal: number;
  discount: number;
  shipping: number;
  taxes: number;
  total: number;
  discountCode: string;
  currency: string;
  lineItems: CeleryItem[];
}

const order = App.getOrder({version: 'v1'});

const orderData: CeleryOrder = {
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

const url = "https://www.vivethree.com/confirm";
let request = new XMLHttpRequest();
request.open('POST', url, true);
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
request.send(JSON.stringify({ orderData: orderData }));
