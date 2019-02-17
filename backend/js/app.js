// JavaScript Document
var myApp = angular.module("myApp", [
  "ui.router",
  "pascalprecht.translate",
  "angulartics",
  "angulartics.google.analytics",
  "imageupload",
  "ngMap",
  "internationalPhoneNumber",
  "ui.bootstrap",
  "ui.select",
  "ngAnimate",
  "toastr",
  "textAngular",
  "ngSanitize",
  "ngMap",
  "toggle-switch",
  "cfp.hotkeys",
  "ui.sortable"
]);

myApp.config(function(
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  $locationProvider
) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider

    .state("dashboard", {
      url: "/dashboard",
      templateUrl: "views/template.html",
      controller: "DashboardCtrl"
    })

    .state("login", {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginCtrl"
    })
    .state("invoice-view", {
      url: "/invoice-view",
      templateUrl: "views/template.html",
      controller: "InvoiceViewCtrl"
    })
    .state("page", {
      url: "/page/:id/{page:.*}/{keyword:.*}",
      templateUrl: "views/template.html",
      controller: "PageJsonCtrl"
    })

    .state("loginapp", {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginCtrl"
    })

    .state("country-list", {
      url: "/country-list/{page:.*}/{keyword:.*}",
      templateUrl: "views/template.html",
      controller: "CountryCtrl",
      params: {
        page: "1",
        keyword: ""
      }
    })

    .state("createcountry", {
      url: "/country-create",
      templateUrl: "views/template.html",
      controller: "CreateCountryCtrl"
    })
    .state("customState", {
      url: "/custom-state",
      templateUrl: "views/template.html",
      controller: "customStateCtrl"
    })

    .state("editcountry", {
      url: "/country-edit/:id",
      templateUrl: "views/template.html",
      controller: "EditCountryCtrl"
    })

    .state("schema-creator", {
      url: "/schema-creator",
      templateUrl: "views/template.html",
      controller: "SchemaCreatorCtrl"
    })

    .state("excel-upload", {
      url: "/excel-upload/:model",
      templateUrl: "views/template.html",
      controller: "ExcelUploadCtrl"
    })

    .state("jagz", {
      url: "/jagz",
      templateUrl: "views/jagz.html",
      controller: "JagzCtrl"
    });

  $urlRouterProvider.otherwise("/login");
  $locationProvider.html5Mode(isproduction);
});

myApp.config(function($translateProvider) {
  $translateProvider.translations("en", LanguageEnglish);
  $translateProvider.translations("hi", LanguageHindi);
  $translateProvider.preferredLanguage("en");
});
