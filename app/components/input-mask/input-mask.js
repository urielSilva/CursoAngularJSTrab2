/**
 * Created by Uriel on 08/03/2015.
 */

angular.module('enejApp')

    .directive('mask', function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.mask(attrs.mask);
            }
        }
    });