/*globals $, ko, ResourcesDataService, resourcesViewModel*/

function ResourceViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var that = this,
      resourceDataService = new ResourceDataService();

  // --- properties

  this.template = "resourcesView";
  this.resource = ko.observableArray();

  // --- public functions

  this.init = function (r) {
      this.resource(r);
  };


}