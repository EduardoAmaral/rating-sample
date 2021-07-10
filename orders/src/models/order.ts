import mongoose from 'mongoose';

interface OrderAttrs {
  customerId: string;
  restaurantId: string;
}

interface OrderDoc extends mongoose.Document {
  customerId: string;
  restaurantId: string;
}

interface OrderModel extends mongoose.Model<any> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.version;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
