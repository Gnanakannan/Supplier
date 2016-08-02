(function(root,factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else if(typeof exports==="object"){module.exports=factory(require("jquery"))}else{root.sortable=factory(root.jQuery)}})(this,function($){"use strict";var dragging;var draggingHeight;var placeholders=$();var sortables=[];var _removeItemEvents=function(items){items.off("dragstart.h5s");items.off("dragend.h5s");items.off("selectstart.h5s");items.off("dragover.h5s");items.off("dragenter.h5s");items.off("drop.h5s")};var _removeSortableEvents=function(sortable){sortable.off("dragover.h5s");sortable.off("dragenter.h5s");sortable.off("drop.h5s")};var _attachGhost=function(event,ghost){event.dataTransfer.effectAllowed="move";event.dataTransfer.setData("text","");if(event.dataTransfer.setDragImage){event.dataTransfer.setDragImage(ghost.item,ghost.x,ghost.y)}};var _addGhostPos=function(e,ghost){if(!ghost.x){ghost.x=parseInt(e.pageX-ghost.draggedItem.offset().left)}if(!ghost.y){ghost.y=parseInt(e.pageY-ghost.draggedItem.offset().top)}return ghost};var _makeGhost=function($draggedItem){return{item:$draggedItem[0],draggedItem:$draggedItem}};var _getGhost=function(event,$draggedItem){var ghost=_makeGhost($draggedItem);ghost=_addGhostPos(event,ghost);_attachGhost(event,ghost)};var _getOptions=function(soptions,options){if(typeof soptions==="undefined"){return options}return soptions};var _removeSortableData=function(sortable){sortable.removeData("opts");sortable.removeData("connectWith");sortable.removeData("items");sortable.removeAttr("aria-dropeffect")};var _removeItemData=function(items){items.removeAttr("aria-grabbed");items.removeAttr("draggable");items.removeAttr("role")};var _listsConnected=function(curList,destList){if(curList[0]===destList[0]){return true}if(curList.data("connectWith")!==undefined){return curList.data("connectWith")===destList.data("connectWith")}return false};var _destroySortable=function(sortable){var opts=sortable.data("opts")||{};var items=sortable.children(opts.items);var handles=opts.handle?items.find(opts.handle):items;_removeSortableEvents(sortable);_removeSortableData(sortable);handles.off("mousedown.h5s");_removeItemEvents(items);_removeItemData(items)};var _enableSortable=function(sortable){var opts=sortable.data("opts");var items=sortable.children(opts.items);var handles=opts.handle?items.find(opts.handle):items;sortable.attr("aria-dropeffect","move");handles.attr("draggable","true");var spanEl=(document||window.document).createElement("span");if(typeof spanEl.dragDrop==="function"&&!opts.disableIEFix){handles.on("mousedown.h5s",function(){if(items.index(this)!==-1){this.dragDrop()}else{$(this).parents(opts.items)[0].dragDrop()}})}};var _disableSortable=function(sortable){var opts=sortable.data("opts");var items=sortable.children(opts.items);var handles=opts.handle?items.find(opts.handle):items;sortable.attr("aria-dropeffect","none");handles.attr("draggable",false);handles.off("mousedown.h5s")};var _reloadSortable=function(sortable){var opts=sortable.data("opts");var items=sortable.children(opts.items);var handles=opts.handle?items.find(opts.handle):items;_removeItemEvents(items);handles.off("mousedown.h5s");_removeSortableEvents(sortable)};var sortable=function(selector,options){var $sortables=$(selector);var method=String(options);options=$.extend({connectWith:false,placeholder:null,dragImage:null,disableIEFix:false,placeholderClass:"sortable-placeholder",draggingClass:"sortable-dragging",hoverClass:false},options);return $sortables.each(function(){var $sortable=$(this);if(/enable|disable|destroy/.test(method)){sortable[method]($sortable);return}options=_getOptions($sortable.data("opts"),options);$sortable.data("opts",options);_reloadSortable($sortable);var items=$sortable.children(options.items);var index;var startParent;var newParent;var placeholder=options.placeholder===null?$("<"+(/^ul|ol$/i.test(this.tagName)?"li":"div")+' class="'+options.placeholderClass+'"/>'):$(options.placeholder).addClass(options.placeholderClass);if(!$sortable.attr("data-sortable-id")){var id=sortables.length;sortables[id]=$sortable;$sortable.attr("data-sortable-id",id);items.attr("data-item-sortable-id",id)}$sortable.data("items",options.items);placeholders=placeholders.add(placeholder);if(options.connectWith){$sortable.data("connectWith",options.connectWith)}_enableSortable($sortable);items.attr("role","option");items.attr("aria-grabbed","false");if(options.hoverClass){var hoverClass="sortable-over";if(typeof options.hoverClass==="string"){hoverClass=options.hoverClass}items.hover(function(){$(this).addClass(hoverClass)},function(){$(this).removeClass(hoverClass)})}items.on("dragstart.h5s",function(e){e.stopImmediatePropagation();if(options.dragImage){_attachGhost(e.originalEvent,{item:options.dragImage,x:0,y:0});console.log("WARNING: dragImage option is deprecated"+" and will be removed in the future!")}else{_getGhost(e.originalEvent,$(this),options.dragImage)}dragging=$(this);dragging.addClass(options.draggingClass);dragging.attr("aria-grabbed","true");index=dragging.index();draggingHeight=dragging.height();startParent=$(this).parent();dragging.parent().triggerHandler("sortstart",{item:dragging,placeholder:placeholder,startparent:startParent})});items.on("dragend.h5s",function(){if(!dragging){return}dragging.removeClass(options.draggingClass);dragging.attr("aria-grabbed","false");dragging.show();placeholders.detach();newParent=$(this).parent();dragging.parent().triggerHandler("sortstop",{item:dragging,startparent:startParent});if(index!==dragging.index()||startParent.get(0)!==newParent.get(0)){dragging.parent().triggerHandler("sortupdate",{item:dragging,index:newParent.children(newParent.data("items")).index(dragging),oldindex:items.index(dragging),elementIndex:dragging.index(),oldElementIndex:index,startparent:startParent,endparent:newParent})}dragging=null;draggingHeight=null});$(this).add([placeholder]).on("drop.h5s",function(e){if(!_listsConnected($sortable,$(dragging).parent())){return}e.stopPropagation();placeholders.filter(":visible").after(dragging);dragging.trigger("dragend.h5s");return false});items.add([this]).on("dragover.h5s dragenter.h5s",function(e){if(!_listsConnected($sortable,$(dragging).parent())){return}e.preventDefault();e.originalEvent.dataTransfer.dropEffect="move";if(items.is(this)){var thisHeight=$(this).height();if(options.forcePlaceholderSize){placeholder.height(draggingHeight)}if(thisHeight>draggingHeight){var deadZone=thisHeight-draggingHeight;var offsetTop=$(this).offset().top;if(placeholder.index()<$(this).index()&&e.originalEvent.pageY<offsetTop+deadZone){return false}if(placeholder.index()>$(this).index()&&e.originalEvent.pageY>offsetTop+thisHeight-deadZone){return false}}dragging.hide();if(placeholder.index()<$(this).index()){$(this).after(placeholder)}else{$(this).before(placeholder)}placeholders.not(placeholder).detach()}else{if(!placeholders.is(this)&&!$(this).children(options.items).length){placeholders.detach();$(this).append(placeholder)}}return false})})};sortable.destroy=function(sortable){_destroySortable(sortable)};sortable.enable=function(sortable){_enableSortable(sortable)};sortable.disable=function(sortable){_disableSortable(sortable)};$.fn.sortable=function(options){return sortable(this,options)};return sortable});