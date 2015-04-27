/*globals $, ko, ResourcesDataService, resourcesViewModel*/

function LoginViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var that = this;

  this.username = ko.observable();
  this.password = ko.observable();
  // --- properties

  this.template = "loginView";

  // --- public functions

  this.init = function () {
  };

  
  this.load = function () {

  };

  this.loginClicked = function (resource) {
    var data = {"username":resource.username, "password":resource.password};

      
    $.ajax({
      data: data,
      url: "service/login.php",
      type: 'POST',
      success: function(response) {  
        resource.username("");
        resource.password("");          
        resourcesViewModel.init();
        $.mobile.changePage("#" + resourcesViewModel.template);

        
      },
      error: function(){ alert("error"); }
    });
      
      //$.mobile.changePage("#" + resourceViewModel.template);
  };
  
  this.createResourceClicked = function () {
      
  };

}