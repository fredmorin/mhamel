/*globals $, ko, ResourcesDataService, resourcesViewModel*/

function ResourceViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var self = this,
      resourceDataService = new ResourceDataService();

  // --- properties

  this.template = "resourceView";
  this.id = ko.observable(0);
  this.number = ko.observable();
  this.count = ko.observable();
  this.paidPrice = ko.observable();
  this.retailPrice = ko.observable();
  this.salePrice = ko.observable();
  
  // --- public functions

  this.init = function (r) {
    this.id(r.id);
    this.number(r.number);
    this.count(r.count);
    this.paidPrice(r.paidPrice);
    this.retailPrice(r.retailPrice);
    this.salePrice(r.salePrice);
  };
  
  this.disableEditNumber = ko.computed(function() {
    return (self.id() > 0);
  });
  
  this.submitClicked = function(r){
     var updateData = {
         id : r.id(),
         count: r.count(),
         paidPrice: r.paidPrice(),
         retailPrice: r.retailPrice(),
         salePrice: r.salePrice()         
     };
      
    $.ajax({
      dataType: 'json',
      url: "service/",
      type: 'put',
      data: updateData,
      success: function(response) {           
          $( "#successpopupdiv" ).popup( "open" );
          setTimeout(function () {
                resourcesViewModel.init();
                $.mobile.changePage("#" + resourcesViewModel.template); 
            }, 500);
          
      },
      error: function(){ alert("error"); }
    });
      
  };


}