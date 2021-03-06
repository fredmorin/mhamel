/*globals $, ko, document, SearchResultsViewModel, TweetViewModel, TwitterSearchViewModel */

ko.virtualElements.allowedBindings.updateListviewOnChange = true;
ko.bindingHandlers.updateListviewOnChange = {
  update: function (element, valueAccessor) {
    ko.utils.unwrapObservable(valueAccessor());  //grab dependency

    var listview = $(element).parents()
                             .andSelf()
                             .filter("[data-role='listview']");

    if (listview) {
      try {
        $(listview).listview('refresh');
      } catch (e) {
        // if the listview is not initialised, the above call with throw an exception
        // there doe snot appear to be any way to easily test for this state, so
        // we just swallow the exception here.
      }
    }
  }
};

// create the various view models
var resourcesViewModel = new ResourcesViewModel();
var resourceViewModel = new ResourceViewModel();
var createResourceViewModel = new CreateResourceViewModel();
var loginViewModel = new LoginViewModel();

$.mobile.defaultPageTransition = "none";


$(document).ready(function () {
  ko.applyBindings(loginViewModel, document.getElementById("loginView"));
  ko.applyBindings(resourcesViewModel, document.getElementById("resourcesView"));
  ko.applyBindings(resourceViewModel, document.getElementById("resourceView"));
  ko.applyBindings(createResourceViewModel, document.getElementById("createResourceView"));
  //resourcesViewModel.init();
    $.ajax({
      url: "service/",
      type: 'GET',
      success: function(response) {  
        resourcesViewModel.init();
        $.mobile.changePage("#" + resourcesViewModel.template)
      },
      error: function(){ 
        $.mobile.changePage("#" + loginViewModel.template)
      }
    });
  
  

});

















