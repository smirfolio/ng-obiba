'use strict';

angular.module('obiba.form')

  // http://codetunes.com/2013/server-form-validation-with-angular
  .directive('formServerError', [function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ctrl) {
        return element.on('change', function () {
          return scope.$apply(function () {
            return ctrl.$setValidity('server', true);
          });
        });
      }
    };
  }])

  .directive('formInput', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        name: '@',
        model: '=',
        disabled: '=',
        type: '@',
        label: '@',
        required: '@',
        min: '@',
        max: '@',
        help: '@'
      },
      templateUrl: 'form/form-input-template.tpl.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = '';
        }
        $scope.form = ctrl;
      },
      compile: function(elem, attrs) {
        if (!attrs.type) { attrs.type = 'text'; }
      }
    };
  }])

  .directive('formTextarea', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        name: '@',
        model: '=',
        disabled: '=',
        label: '@',
        required: '@',
        help: '@'
      },
      templateUrl: 'form/form-textarea-template.tpl.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = '';
        }
        $scope.form = ctrl;
      },
      compile: function(elem, attrs) {
        if (!attrs.type) { attrs.type = 'text'; }
      }
    };
  }])

  .directive('formLocalizedInput', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        locales: '=',
        name: '@',
        model: '=',
        label: '@',
        required: '@',
        help: '@'
      },
      templateUrl: 'form/form-localized-input-template.tpl.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = '';
        }
        $scope.form = ctrl;
      }
    };
  }])

  .directive('formCheckbox', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        name: '@',
        model: '=',
        label: '@',
        help: '@'
      },
      templateUrl: 'form/form-checkbox-template.tpl.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = false;
        }
        $scope.form = ctrl;
      }
    };
  }])

  .directive('formCheckboxGroup', [function() {
    return {
      restrict: 'A',
      scope: {
        options: '=',
        model: '='
      },
      template: '<div form-checkbox ng-repeat="item in items" name="{{item.name}}" model="item.value" label="{{item.label}}">',
      link: function ($scope, elem, attrs) {
        $scope.$watch('model', function(selected) {
          $scope.items = $scope.options.map(function(n) {
            var value = angular.isArray(selected) && (selected.indexOf(n) > -1 ||
              selected.indexOf(n.name) > -1);
            return {
              name: attrs.model + '.' + (n.name || n),
              label: n.label || n,
              value: value
            };
          });
        }, true);

        $scope.$watch('items', function(items) {
          if (angular.isArray(items)) {
            $scope.model = items.filter(function(e) { return e.value; })
              .map(function(e) { return e.name.replace(attrs.model + '.', ''); });
          }
        }, true);

        $scope.$watch('options', function(opts) {
          $scope.items = opts.map(function(n) {
            var value = angular.isArray($scope.model) && ($scope.model.indexOf(n) > -1 ||
              $scope.model.indexOf(n.name) > -1);
            return {
              name: attrs.model + '.' + (n.name || n),
              label: n.label || n,
              value: value
            };
          });
        }, true);
      }
    };
  }]);
