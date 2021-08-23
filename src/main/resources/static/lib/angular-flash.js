/*! angular-flash - v2.5.0 - 2017-07-23
* https://github.com/sachinchoolur/angular-flash
* Copyright (c) 2017 Sachin; Licensed MIT 
// First argument (string) is the type of the flash alert.
    // Second argument (string) is the message displays in the flash alert (HTML is ok).
    // Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
    // Fourth argument (object, optional) is the custom class and id to be added for the flash message created.
    // Fifth argument (boolean, optional) is the visibility of close button for this flash.
    // Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.
  }
}]);

success
info
warning
danger

*/

'use strict';

var app = angular.module('ngFlash', []);

app.run(['$rootScope', function ($rootScope) {
    return $rootScope.flashes = [];
}]);

app.directive('dynamic', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, ele, attrs) {
            return scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                return $compile(ele.contents())(scope);
            });
        }
    };
}]);

app.directive('applytransclude', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function link(scope, ele, attrs) {
            scope._transclude(scope, function (clone, scope) {
                ele.empty().append(clone);
            });
        }
    };
}]);

app.directive('closeFlash', ['$compile', '$rootScope', 'Flash', function ($compile, $rootScope, Flash) {
    return {
        link: function link(scope, ele, attrs) {
            return ele.on('click', function () {
                var id = parseInt(attrs.closeFlash, 10);
                Flash.dismiss(id);
                $rootScope.$apply();
            });
        }
    };
}]);

app.directive('flashMessage', ['Flash', function (Flash) {
    return {
        restrict: 'E',
        scope: {
            duration: '=',
            showClose: '=',
            onDismiss: '&',
            name: '@'
        },
        link: function link(scope, ele, attrs, ctrl, transclude) {
            Flash.setTimeout(scope.duration);
            Flash.setShowClose(scope.showClose);
            function onDismiss(flash) {
                if (typeof scope.onDismiss !== 'function') return;
                scope.onDismiss({ flash: flash });
            }

            Flash.setOnDismiss(onDismiss);

            if (Flash.config.templateTransclude) {
                scope._transclude = transclude;
            }
        },
        transclude: Flash.config.templateTransclude,
        template: '\n                <div ng-repeat="flash in $root.flashes track by $index" ng-if="flash.config.container === name" class="alert-container">\n                    ' + Flash.config.template + '\n                </div>\n            '
    };
}]);

app.provider('Flash', function () {
    var defaultConfig = {};
    var templatePresets = {
        bootstrap: {
            html: '  <div class="alert {{flash.config.class}} alert-{{flash.type}} fade show" role="alert"> '+
                  '  <span dynamic="flash.text"></span>  ' +
                  '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="float: right;" ></button> '+
                  '  </div>   ',
            transclude: false
        },
        transclude: {
            html: '<div applytransclude></div>',
            transclude: true
        }
    };

    this.setTimeout = function (timeout) {
        if (typeof timeout !== 'number') return;
        defaultConfig.timeout = timeout;
    };
    this.setShowClose = function (value) {
        if (typeof value !== 'boolean') return;
        defaultConfig.showClose = value;
    };
    this.setTemplate = function (template) {
        if (typeof template !== 'string') return;
        defaultConfig.template = template;
    };
    this.setTemplatePreset = function (preset) {
        if (typeof preset !== 'string' || !(preset in templatePresets)) return;

        var template = templatePresets[preset];
        this.setTemplate(template.html);
        defaultConfig.templateTransclude = template.transclude;
    };
    this.setOnDismiss = function (callback) {
        if (typeof callback !== 'function') return;
        defaultConfig.onDismiss = callback;
    };

    this.setAutoDismiss = function (dismiss) {
        if (typeof dismiss !== 'boolean') return;
        defaultConfig.autoDismiss = dismiss;
    };

    this.setTimeout(5000);
    this.setShowClose(true);
    this.setTemplatePreset('bootstrap');
    this.setAutoDismiss(false);

    this.$get = ['$rootScope', '$interval', function ($rootScope, $interval) {
        var dataFactory = {};
        var counter = 0;

        dataFactory.setTimeout = this.setTimeout;
        dataFactory.setShowClose = this.setShowClose;
        dataFactory.setOnDismiss = this.setOnDismiss;
        dataFactory.config = defaultConfig;

        dataFactory.create = function (type, text, timeout, config, showClose) {
            if ($rootScope.flashes.length === 1 && defaultConfig.autoDismiss) {
                dataFactory.dismiss($rootScope.flashes[0].id);
            }
            if (!text) return false;
            var $this = void 0,
                flash = void 0;
            $this = this;
            flash = {
                type: type,
                text: text,
                config: config,
                id: counter++
            };
            flash.showClose = typeof showClose !== 'undefined' ? showClose : defaultConfig.showClose;
            if (defaultConfig.timeout && typeof timeout === 'undefined') {
                flash.timeout = defaultConfig.timeout;
            } else if (timeout) {
                flash.timeout = timeout;
            }
            $rootScope.flashes.push(flash);
            if (flash.timeout) {
                flash.timeoutObj = $interval(function () {
                    $this.dismiss(flash.id);
                }, flash.timeout, 1);
            }
            return flash.id;
        };
        dataFactory.pause = function (index) {
            if ($rootScope.flashes[index].timeoutObj) {
                $interval.cancel($rootScope.flashes[index].timeoutObj);
            }
        };
        dataFactory.dismiss = function (id) {
            var index = findIndexById(id);
            if (index !== -1) {
                var flash = $rootScope.flashes[index];
                dataFactory.pause(index);
                $rootScope.flashes.splice(index, 1);
                if (typeof defaultConfig.onDismiss === 'function') {
                    defaultConfig.onDismiss(flash);
                }
            }
        };
        dataFactory.clear = function () {
            while ($rootScope.flashes.length > 0) {
                dataFactory.dismiss($rootScope.flashes[0].id);
            }
        };
        dataFactory.reset = dataFactory.clear;
        function findIndexById(id) {
            return $rootScope.flashes.map(function (flash) {
                return flash.id;
            }).indexOf(id);
        }

        return dataFactory;
    }];
});
//# sourceMappingURL=angular-flash.js.map