/*globals $, ResourceViewModel */

function ResourceDataService() {
  /// <summary>
  /// A service that provide a very simple twitter search function, returing a simplified
  /// version of the response provided by the Twitter APIs
  /// </summary>

  var baseUrl = "service/";

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
                                id: item.properties.id,
                                number: item.properties.number,
                                count: item.properties.count,
                                paidPrice: item.properties.paidPrice,
                                retailPrice: item.properties.retailPrice,
                                salePrice: item.properties.salePrice
          });
        });

        callback(resourceViewModels);
      }
    });
  };
}
