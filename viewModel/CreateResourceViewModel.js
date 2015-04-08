/*globals $, ko, ResourcesDataService, resourcesViewModel*/

function CreateResourceViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var self = this,
      resourceDataService = new ResourceDataService();

  // --- properties

  this.template = "createResourceView";  
  this.number = ko.observable();
  this.count = ko.observable();
  this.paidPrice = ko.observable();
  this.retailPrice = ko.observable();
  this.salePrice = ko.observable();
  this.description = ko.observable();
  
  // --- public functions

  this.init = function () {
    this.number(null);
    this.count(null);
    this.paidPrice(null);
    this.retailPrice(null);
    this.salePrice(null);
    this.description(null);
  };
  
  this.submitClicked = function(r){
     var createData = {
         number: r.number(),
         count: r.count(),
         paidPrice: r.paidPrice(),
         retailPrice: r.retailPrice(),
         salePrice: r.salePrice(),
         description: r.description()
     };      
      
    $.ajax({
      dataType: 'json',
      url: "service/",
      type: 'post',
      data: createData,
      success: function(response) {           
          $( "#successpopupdiv2" ).popup( "open" );
          setTimeout(function () {
                resourcesViewModel.init();
                $.mobile.changePage("#" + resourcesViewModel.template); 
            }, 500);
          
      },
      error: function(){ alert("error"); }
    });
  };


}