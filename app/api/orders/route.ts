/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Types - Updated to match new form structure
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes?: string;
}

interface OrderData {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerInfo: CustomerInfo;
  paymentMethod: 'stripe' | 'paypal';
  paymentId: string;
  status: string;
}

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();
    
    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create order object
    const order = {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'paid'
    };

    // Send confirmation email to customer
    await sendOrderConfirmationEmail(order);
    
    // Send notification to bakery owner
    await sendOrderNotificationToBakery(order);

    return NextResponse.json({ 
      success: true, 
      orderId: order.id 
    });
  } catch (error: any) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

async function sendOrderConfirmationEmail(order: any) {
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-details { background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .item-list { list-style: none; padding: 0; }
        .item-list li { padding: 5px 0; border-bottom: 1px solid #eee; }
        .total { font-weight: bold; font-size: 1.2em; color: #2c5aa0; }
        .delivery-info { background-color: #e3f2fd; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🥖 Order Confirmation</h1>
      </div>
      
      <div class="content">
        <p>Dear ${order.customerInfo.name},</p>
        <p>Thank you for your order! We've received your payment and are preparing your delicious baked goods for delivery.</p>
        
        <div class="order-details">
          <h3>Order #${order.id}</h3>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          
          <h4>Items Ordered:</h4>
          <ul class="item-list">
            ${order.items.map((item: CartItem) => 
              `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
            ).join('')}
          </ul>
          
          <hr>
          <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
          <p><strong>Delivery Fee:</strong> $${order.deliveryFee.toFixed(2)}</p>
          <p class="total">Total Paid: $${order.total.toFixed(2)}</p>
        </div>
        
        <div class="delivery-info">
          <h4>🚚 Delivery Information</h4>
          <p><strong>Delivery Address:</strong><br>
             ${order.customerInfo.address}<br>
             ${order.customerInfo.city}, CT ${order.customerInfo.zipCode}
          </p>
          <p><strong>Contact Phone:</strong> ${order.customerInfo.phone}</p>
          ${order.customerInfo.notes ? `<p><strong>Special Instructions:</strong> ${order.customerInfo.notes}</p>` : ''}
        </div>
        
        <div style="background-color: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #4caf50;">
          <h4>📋 What's Next?</h4>
          <p>• We'll contact you within <strong>1-2 hours</strong> to confirm your delivery time</p>
          <p>• Our typical preparation time is <strong>2-4 hours</strong> for fresh baked goods</p>
          <p>• Delivery to ${order.customerInfo.city} typically takes <strong>30-60 minutes</strong> from our bakery</p>
          <p>• We'll send you updates via text/call as your order progresses</p>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <h4>🍞 Fresh Baked Promise</h4>
          <p>All our baked goods are made fresh to order. We start preparing your items only after payment confirmation to ensure maximum freshness and quality.</p>
        </div>
        
        <p>If you have any questions or need to make changes to your order, please contact us immediately at <strong>${process.env.BAKERY_PHONE || 'your-phone-number'}</strong>.</p>
        
        <p>Thank you for choosing our bakery! We can't wait to deliver these fresh, delicious treats to your door.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666; text-align: center;">
          <p><strong>Your Neighborhood Bakery Team</strong><br>
             Serving fresh baked goods across Connecticut<br>
             📍 Based in Danbury, CT
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: order.customerInfo.email,
    subject: `🍞 Order Confirmation #${order.id} - Fresh Delivery to ${order.customerInfo.city}!`,
    html: emailHTML,
  });
}

async function sendOrderNotificationToBakery(order: any) {
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #4caf50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .customer-info, .order-details { 
          background-color: #f8f9fa; 
          padding: 15px; 
          margin: 15px 0; 
          border-radius: 5px; 
          border-left: 4px solid #4caf50;
        }
        .urgent { background-color: #fff3cd; border-left-color: #ffc107; }
        .delivery-urgent { background-color: #ffebee; border-left-color: #f44336; }
        .item-list { list-style: none; padding: 0; }
        .item-list li { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .total { font-weight: bold; font-size: 1.3em; color: #4caf50; }
        .city-tag { 
          background-color: #2196f3; 
          color: white; 
          padding: 4px 8px; 
          border-radius: 12px; 
          font-size: 0.9em;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚨 NEW DELIVERY ORDER!</h1>
        <p style="margin: 0; font-size: 1.1em;">Fresh baked goods needed for ${order.customerInfo.city}, CT</p>
      </div>
      
      <div class="content">
        <div class="customer-info">
          <h3>👤 Customer Information</h3>
          <p><strong>Name:</strong> ${order.customerInfo.name}</p>
          <p><strong>Email:</strong> ${order.customerInfo.email}</p>
          <p><strong>Phone:</strong> <a href="tel:${order.customerInfo.phone}" style="color: #4caf50; font-weight: bold;">${order.customerInfo.phone}</a></p>
          
          <div style="margin-top: 15px; padding: 10px; background-color: white; border-radius: 5px;">
            <h4 style="margin: 0 0 10px 0;">🚚 Delivery Address:</h4>
            <p style="margin: 0; font-size: 1.1em; line-height: 1.4;">
              <strong>${order.customerInfo.address}</strong><br>
              ${order.customerInfo.city}, CT ${order.customerInfo.zipCode}
              <span class="city-tag">${order.customerInfo.city.toUpperCase()}</span>
            </p>
          </div>
        </div>
        
        <div class="order-details">
          <h3>📋 Order Details - #${order.id}</h3>
          <p><strong>Order Time:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          
          <h4>🍞 Items to Prepare:</h4>
          <ul class="item-list">
            ${order.items.map((item: CartItem) => 
              `<li>
                <div>
                  <strong style="font-size: 1.1em;">${item.name}</strong><br>
                  <span style="background-color: #e91e63; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.9em;">
                    QTY: ${item.quantity}
                  </span>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: bold; font-size: 1.1em;">$${(item.price * item.quantity).toFixed(2)}</div>
                  <div style="font-size: 0.9em; color: #666;">$${item.price.toFixed(2)} each</div>
                </div>
              </li>`
            ).join('')}
          </ul>
          
          <hr>
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
            <span><strong>Subtotal:</strong></span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
            <span><strong>Delivery Fee (${order.customerInfo.city}):</strong></span>
            <span>${order.deliveryFee.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0; padding-top: 10px; border-top: 2px solid #4caf50;">
            <span class="total">TOTAL ORDER VALUE:</span>
            <span class="total">${order.total.toFixed(2)}</span>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0;">
            <p style="margin: 0;"><strong>💳 Payment Status:</strong> ✅ PAID via ${order.paymentMethod.toUpperCase()}</p>
            <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;"><strong>Payment ID:</strong> ${order.paymentId}</p>
          </div>
        </div>
        
        ${order.customerInfo.notes ? `
          <div class="customer-info urgent">
            <h4>🎯 Special Instructions from Customer:</h4>
            <div style="background-color: white; padding: 10px; border-radius: 5px; border-left: 3px solid #ffc107;">
              <p style="font-style: italic; font-size: 1.1em; margin: 0; font-weight: 500;">"${order.customerInfo.notes}"</p>
            </div>
          </div>
        ` : ''}
        
        <div class="delivery-urgent">
          <h3>⏰ IMMEDIATE ACTION REQUIRED</h3>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <h4 style="margin: 0 0 10px 0; color: #f44336;">📞 Contact Customer:</h4>
            <p style="margin: 0 0 5px 0;">Call <strong>${order.customerInfo.phone}</strong> within <strong>1-2 hours</strong></p>
            <p style="margin: 0 0 10px 0;">Confirm delivery time window for ${order.customerInfo.city}</p>
            
            <h4 style="margin: 15px 0 10px 0; color: #f44336;">🕒 Timeline:</h4>
            <p style="margin: 0 0 5px 0;">• Preparation time: <strong>2-4 hours</strong></p>
            <p style="margin: 0 0 5px 0;">• Delivery to ${order.customerInfo.city}: <strong>30-60 minutes</strong></p>
            <p style="margin: 0; color: #666;">• Total estimated time: <strong>3-5 hours from now</strong></p>
          </div>
        </div>
        
        <div style="background-color: #e3f2fd; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center;">
          <h4 style="margin: 0 0 10px 0;">🗺️ Delivery Zone Info</h4>
          <p style="margin: 0; font-size: 1.1em;">
            <strong>${order.customerInfo.city}, CT</strong> - 
            Delivery Fee: <span style="color: #4caf50; font-weight: bold;">$${order.deliveryFee.toFixed(2)}</span>
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
          <p><strong>📧 Automated Order Notification</strong></p>
          <p>Order received: ${new Date(order.createdAt).toLocaleString()}</p>
          <p>Customer will receive confirmation email automatically.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.BAKERY_EMAIL,
    subject: `🚨 NEW DELIVERY - ${order.customerInfo.name} - $${order.total.toFixed(2)} - ${order.customerInfo.city.toUpperCase()}, CT`,
    html: emailHTML,
  });
}