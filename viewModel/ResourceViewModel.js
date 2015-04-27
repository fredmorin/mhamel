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
  this.description = ko.observable();
  
  // --- public functions

  this.init = function (id) {    
    $.ajax({
      dataType: 'json',
      url: "service/?id=" + id,
      type: 'get',
      success: function(response) {  
        self.id(response.features[0].properties.id);
        self.number(response.features[0].properties.number);
        self.count(response.features[0].properties.count);
        self.paidPrice(response.features[0].properties.paidPrice);
        self.retailPrice(response.features[0].properties.retailPrice);
        self.salePrice(response.features[0].properties.salePrice);
        self.description(response.features[0].properties.description);
      },
      error: function(xhr, ajaxOptions, thrownError){ 
          if(xhr.status === 401){
              $.mobile.changePage("#" + loginViewModel.template); 
          }else{
            alert("error"); 
          }
      }
    });
  };
  
  this.disableEditNumber = ko.computed(function() {
    return (self.id() > 0);
  });
  
  this.submitClicked = function(r){
     var updateData = {
         id : r.id(),
         paidPrice: r.paidPrice(),
         retailPrice: r.retailPrice(),
         salePrice: r.salePrice(),
         description: r.description(),
         request:'update'
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
      error: function(xhr, ajaxOptions, thrownError){ 
          if(xhr.status === 401){
              $.mobile.changePage("#" + loginViewModel.template); 
          }else{
            alert("error"); }
          }
    });
      
  };

  this.addone = function(r){
     var updateData = {
         id : r.id(),
         request: 'add'
     };
      
    $.ajax({
      dataType: 'json',
      url: "service/",
      type: 'put',
      data: updateData,
      success: function(response) {           
          $( "#successpopupdiv" ).popup( "open" );
          self.init(self.id());
          setTimeout(function () {
                $( "#successpopupdiv" ).popup( "close" );
                resourcesViewModel.init();

                //$.mobile.changePage("#" + resourcesViewModel.template); 
            }, 500);
          
      },
      error: function(xhr, ajaxOptions, thrownError){ 
          if(xhr.status === 401){
              $.mobile.changePage("#" + loginViewModel.template); 
          }else{
            alert("error"); 
          }
      }
    });
      
  };
  
    this.removeone = function(r){
     var updateData = {
         id : r.id(),
         request: 'remove'
     };
      
    $.ajax({
      dataType: 'json',
      url: "service/",
      type: 'put',
      data: updateData,
      success: function(response) {           
          $( "#successpopupdiv" ).popup( "open" );
          self.init(self.id());
          setTimeout(function () {
                $( "#successpopupdiv" ).popup( "close" );
                resourcesViewModel.init();
                
                //$.mobile.changePage("#" + resourcesViewModel.template); 
            }, 500);
          
      },
      error: function(xhr, ajaxOptions, thrownError){ 
          if(xhr.status === 401){
              $.mobile.changePage("#" + loginViewModel.template); 
          }else{
            alert("error"); 
          }         
      }
    });
      
  };

}