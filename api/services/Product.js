var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  },
  unit: {
    type: String
  },
  price: {
    type: Number
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  quantity: {
    type: Number
  },
  taxes: [
    {
      name: String,
      percentage: Number
    }
  ]
});

schema.plugin(deepPopulate, {
  populate: {
    company: {
      select: "name _id"
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Product", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(schema, "company", "company")
);
var model = {};
module.exports = _.assign(module.exports, exports, model);
