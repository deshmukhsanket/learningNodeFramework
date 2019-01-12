var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

myApp.factory("NavigationService", function($http) {
  var navigation = [
    {
      name: "Users",
      classis: "active",
      sref: "#!/page/viewUser//",
      icon: "phone"
    },
    {
      name: "Custom",
      classis: "active",
      sref: "#!/custom-state",
      icon: "phone"
    }
  ];

  return {
    getnav: function() {
      return navigation;
    },
    login: function(data, callback) {
      console.log("Data", adminurl);
      $http.post(adminurl + "User/Login", data).success(function(data) {
        if (data.value === true) {
          console.log("Data", data.data);
          if (data.data.accesslevel == "Employee") {
            var temp = data.data;
            $http
              .post(adminurl + "Role/getRoleByName", temp)
              .success(rolesData => {
                console.log("rolesforcustomer", rolesData);
                if (rolesData.value == true) {
                  data.data.role = rolesData.data;
                  $.jStorage.set("getLoginEmployee", data.data);
                  var newRole = getRoleSingle(data.data.role);
                  $.jStorage.set("role", newRole);
                  callback(data);
                }
              });
          } else {
            $.jStorage.set("getLoginEmployee", data.data);
            var newRole = getRoleSingle(data.data.role);
            $.jStorage.set("role", newRole);
            callback(data);
          }
        }
      });
    },
    parseAccessToken: function(data, callback) {
      if (data) {
        $.jStorage.set("accessToken", data);
        callback();
      }
    },
    removeAccessToken: function(data, callback) {
      $.jStorage.flush();
    },
    profile: function(callback, errorCallback) {
      var data = {
        accessToken: $.jStorage.get("accessToken")
      };
      $http.post(adminurl + "user/profile", data).then(function(data) {
        data = data.data;
        if (data.value === true) {
          $.jStorage.set("profile", data.data);
          callback();
        } else {
          errorCallback(data.error);
        }
      });
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },

    search: function(url, formData, i, callback) {
      $http.post(adminurl + url, formData).then(function(data) {
        data = data.data;
        callback(data, i);
      });
    },
    delete: function(url, formData, callback) {
      $http.post(adminurl + url, formData).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    countrySave: function(formData, callback) {
      $http.post(adminurl + "country/save", formData).then(function(data) {
        data = data.data;
        callback(data);
      });
    },

    apiCall: function(url, formData, callback) {
      $http.post(adminurl + url, formData).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    searchCall: function(url, formData, i, callback) {
      $http.post(adminurl + url, formData).then(function(data) {
        data = data.data;
        callback(data, i);
      });
    },

    uploadExcel: function(form, callback) {
      $http
        .post(adminurl + form.model + "/import", {
          file: form.file
        })
        .then(function(data) {
          data = data.data;
          callback(data);
        });
    }
  };
});
