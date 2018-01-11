/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function () {

  /**
   * Directive primarily aimed to download a file via a POST but the submit method can be configured.
   * A URL with query params will be parsed and its params are added to the form params. Form params can be passed
   * as scope params to the directive as a JSON object.
   */
  angular.module('ngObiba')
    .directive('obibaFileDownload', function () {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          url: '<',
          formParams: '<',
          method: '@',
          encoding: '<'
        },
        link: function (scope, element) {

          function moveUrlParamsToFormParams() {
            var url = scope.url;

            if (url) {
              var index = url.indexOf('?');

              if (index > -1) {
                url.substring(index+1).split('&').forEach(function(param) {
                  var parts = param.split('=');
                  if (parts && !param.hasOwnProperty(parts[0])) {
                    scope.formParams[parts[0]] = parts[1];
                  }
                });

                scope.url = url.substring(0, index);
              }
            }
          }

          function onClick(/*event*/) {
            scope.formParams = scope.formParams || {};

            var form = document.createElement('form');
            form.className = 'hidden';
            form.method = scope.method || 'POST';

            if (form.method.match(/post/i)) {
              moveUrlParamsToFormParams();
            }

            form.action = scope.url;
            form.accept = scope.encoding || 'text/csv';

            Object.keys(scope.formParams).forEach(function(key){
              var input = document.createElement('input');
              var value = scope.formParams[key];

              if (Array.isArray(value)) {
                value.forEach(function(item){
                  var arrayInput = document.createElement('input');
                  arrayInput.name = key;
                  arrayInput.value = item;
                  form.appendChild(arrayInput);
                });
              } else {
                input.name = key;
                input.value = value;
                form.appendChild(input);
              }

            });

            document.body.appendChild(form);
            form.submit();
            form.remove();
          }

          element.on('click', onClick);
        }
      };
    });

})();
