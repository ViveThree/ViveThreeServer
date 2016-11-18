// Confirmation script that runs on Celery to track conversions
var order = App.getOrder({ version: 'v1' });
var orderData = {
    orderNumber: order.number,
    buyerEmail: order.buyer.email,
    buyerFirstName: order.buyer.first_name,
    buyerLastName: order.buyer.last_name,
    subtotal: order.subtotal / 100,
    discount: order.discount / 100,
    shipping: order.shipping / 100,
    taxes: order.taxes / 100,
    total: order.total / 100,
    discountCode: order.discount_code,
    currency: order.currency,
    lineItems: order.line_items
};
var url = "http://www.vivethree.com/confirm";
var request = new XMLHttpRequest();
request.open('POST', url, true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.send({ orderData: orderData });
