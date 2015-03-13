/*globals $, ResourceViewModel */

function ResourceDataService() {
  /// <summary>
  /// A service that provide a very simple twitter search function, returing a simplified
  /// version of the response provided by the Twitter APIs
  /// </summary>

  var baseUrl = "service/resource.json";

  this.getResources = function (callback) {

    var url = baseUrl;
    $.ajax({
      dataType: "json",
      url: url,
      success: function (response) {
        // create an array to hold the features
        var resourceViewModels = [];

        // add the new items
        $.each(response.features, function (index, item) {
			resourceViewModels.push({
				name: item.properties.name,
                                number: item.properties.number,
                                count: item.properties.count
          });
        });

        callback(resourceViewModels);
      }
    });
  };
}
