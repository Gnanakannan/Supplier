(function(angular){"use strict";angular.module("htmlSortable",[]).directive("htmlSortable",["$timeout","$parse",function($timeout,$parse){return{require:"?ngModel",link:function(scope,element,attrs,ngModel){var opts;var model;var scallback=angular.noop;if(attrs.htmlSortableCallback){scallback=$parse(attrs.htmlSortableCallback)}opts=angular.extend({},scope.$eval(attrs.htmlSortable));element.sortable(opts);if(ngModel){model=$parse(attrs.ngModel);ngModel.$render=function(){$timeout(function(){element.sortable("reload")},50)};scope.$watch(model,function(){$timeout(function(){element.sortable("reload")},50)},true);element.sortable().bind("sortupdate",function(e,data){var $source=data.startparent.attr("ng-model");var $dest=data.endparent.attr("ng-model");var $sourceModel=$parse($source);var $destModel=$parse($dest);var $start=data.oldindex;var $end=data.item.index();scope.$apply(function(){if($sourceModel(data.startparent.scope())===$destModel(data.endparent.scope())){var $items=$sourceModel(data.startparent.scope());$items.splice($end,0,$items.splice($start,1)[0]);$sourceModel.assign(scope,$items)}else{var $item=$sourceModel(data.startparent.scope())[$start];var $sourceItems=$sourceModel(data.startparent.scope());var $destItems=$destModel(data.endparent.scope())||[];$sourceItems.splice($start,1);$destItems.splice($end,0,$item);$sourceModel.assign(scope,$sourceItems);$destModel.assign(scope,$destItems)}});scallback(scope,{startModel:$sourceModel(data.startparent.scope()),destModel:$destModel(data.endparent.scope()),start:$start,end:$end})})}}}}])})(angular);