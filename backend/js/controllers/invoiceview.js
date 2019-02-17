myApp
  .controller("InvoiceViewCtrl", function($scope,
    TemplateService,
    NavigationService,
    $timeout,
    $state){
        $scope.template = TemplateService.changecontent("invoice-view");
        $scope.menutitle = NavigationService.makeactive("Invoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        
  })