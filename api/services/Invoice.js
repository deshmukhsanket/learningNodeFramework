var schema = new Schema({
  name: {
    type: String
  },
  invoiceNumber: {
    type: Number
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isGST: {
    type: Boolean
  },
  productitem: []
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Invoice", schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
