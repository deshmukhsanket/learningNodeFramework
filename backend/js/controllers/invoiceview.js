myApp
  .controller("InvoiceViewCtrl", function ($scope,
    TemplateService,
    NavigationService,
    $timeout,
    $state,
    $stateParams) {
    $scope.template = TemplateService.changecontent("invoice-view");
    $scope.menutitle = NavigationService.makeactive("Invoice");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    // 
    var i = 0;
    if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
      $scope.currentPage = $stateParams.page;
    } else {
      $scope.currentPage = 1;
    }

    $scope.search = {
      keyword: ""
    };
    if ($stateParams.keyword) {
      $scope.search.keyword = $stateParams.keyword;
    }
    $scope.changePage = function (page) {
      var goTo = "invoice-view";
      if ($scope.search.keyword) {
        goTo = "invoice-view";
      }
      $state.go(goTo, {
        id: $stateParams.id,
        page: page,
        keyword: $scope.search.keyword
      });
    };

    $scope.getAllItems = function (keywordChange) {
      $scope.totalItems = undefined;
      if (keywordChange) {
        $scope.currentPage = 1;
      }
      NavigationService.search(
        "invoice/search", {
          page: $scope.currentPage,
          keyword: $scope.search.keyword
        },
        ++i,
        function (data, ini) {
          if (ini == i) {
            $scope.items = data.data.results;
            $scope.totalItems = data.data.total;
            $scope.maxRow = data.data.options.count;
            console.log("$scope.items", $scope.items, "$scope.totalItems", $scope.totalItems, "$scope.maxRow", $scope.maxRow)
          }
        }
      );
    };
    $scope.getAllItems();
    // 
  })