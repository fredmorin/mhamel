/*globals $, ko, ResourcesDataService, resourcesViewModel*/

function ResourceViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var that = this,
      resourceDataService = new ResourceDataService();

  // --- properties

  this.template = "resourceView";
  this.id = ko.observable();
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
  
  this.submitClicked = function(r){
      
      
  };


}