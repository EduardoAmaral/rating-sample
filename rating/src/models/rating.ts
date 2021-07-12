import mongoose from 'mongoose';

interface RatingAttrs {
  orderId: string;
  customerId: string;
  restaurantId: string;
  rating: number;
}

interface RatingDoc extends mongoose.Document {
  orderId: string;
  customerId: string;
  restaurantId: string;
  rating: number;
}

interface RatingModel extends mongoose.Model<any> {
  build(attrs: RatingAttrs): RatingDoc;
}

const ratingSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
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

ratingSchema.statics.build = (attrs: RatingAttrs) => {
  return new Rating(attrs);
};

const Rating = mongoose.model<RatingDoc, RatingModel>('Rating', ratingSchema);

export { Rating };
