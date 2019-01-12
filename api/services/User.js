var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["Employee", "Owner","Customer"],
    required:true
  },
  company: [{
    type: Schema.Types.ObjectId,
    ref: "Company"
  }],
  roles:[{
    type:String,
    enum:["Employee","Invoice","Customer","Payment","Product"]
  }],
  mobile: {
    type: String
  },
  password: {
    type: String
  },
  address:{
    type:String
  },
  state:{
    type:String
  },
  logo:{
    type:String
  },
  GSTIN:{
    type:String
  },
  HSN:{
    type:String
  },
  active:{
    type:Boolean,
    default:true
  },
  creditLimit:{
    type:Number
  },
  pendingBalance:{
    type:Number,
    default:0
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
    data.password=md5(data.password);
    User.findOne({
      mobile: data.mobile,
      password: data.password
    }).exec(function(err,data2){
      if(err || _.isEmpty(data2)){
        callback("No Such User",null)
      }else{
        User.distinct("company",{
          mobile:data.mobile
        }).exec(callback)
      }
    });
  },
  searchType:function(data,callback){
    var skipData=0;
    if(data.page){
      skipData=(data.page-1)*10
    }
    User.find({
      company:data.company,
      type:data.type
    }).skip(skipData).limit(10).exec(callback)
  },
  // 
  createAllUser:function(data,callback){
    if(data.password){
      data.password=md5(data.password);
      User.saveData(data,callback);
    }else{
      callback("Provide Password",null)
    }
  }


};
module.exports = _.assign(module.exports, exports, model);