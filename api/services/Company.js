var schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  employee: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  invoicePrefix: {
    type: String,
    // required: true,
    // unique: true
  },
  gst: {
    type: String
  },
  state: {
    type: String
  },
  stateCode: {
    type: Number
  }
});

schema.plugin(deepPopulate, {
  populate: {
    employee: {
      select: "name _id state"
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Company", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(schema, "employee", "employee")
);
var model = {};
module.exports = _.assign(module.exports, exports, model);