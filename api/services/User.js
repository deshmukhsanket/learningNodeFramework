var schema = new Schema({
  name: {
    type: String,
    required: true,
    excel: true
  },
  accessLevel: {
    type: String,
    default: "Employee",
    enum: ["Employee", "Owner"]
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  mobile: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  }
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

module.exports = mongoose.model("User", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(schema, "company", "company")
);
var model = {
  login: function (data, callback) {
    User.findOne({
      mobile: data.mobile,
      password: data.password
    }).exec(callback);
  }
};
module.exports = _.assign(module.exports, exports, model);