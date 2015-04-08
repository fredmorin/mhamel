/*globals $, ko, ResourcesDataService, resourcesViewModel*/

function ResourcesViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var that = this,
      resourceDataService = new ResourceDataService();

  // --- properties

  this.template = "resourcesView";
  this.resources = ko.observableArray();

  // --- public functions

  this.init = function () {
        this.resources.removeAll();
	this.load();
  };

  
  this.load = function () {

    resourceDataService.getResources(function (resources) {
      // push all of the received resources into our list in one atomic action
      if (resources.length > 0) {
        var temp = ko.utils.unwrapObservable(that.resources);
        $.each(resources, function (index, resource) {
          temp.push(resource);		  
        });
        that.resources(temp);
      }
    });
  };

  this.resourceClicked = function (resource) {
    // navigate to the resource
    resourceViewModel.init(resource.id);
    $.mobile.changePage("#" + resourceViewModel.template);
  };
  
  this.createResourceClicked = function () {
    // navigate to the resource
    createResourceViewModel.init();
    $.mobile.changePage("#" + createResourceViewModel.template);
  };

}