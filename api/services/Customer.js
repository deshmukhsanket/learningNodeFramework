var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  password: {
    type: String
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  gst: {
    type: String
  },
  state: {
    type: String
  }
});

schema.plugin(deepPopulate, {
  populate: {
    company: {
      select: "name _id state"
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Customer", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(schema, "company", "company")
);
var model = {};
module.exports = _.assign(module.exports, exports, model);
