(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","./effect","./effect-size"],factory)}else{factory(jQuery)}})(function($){return $.effects.effect.scale=function(o,done){var el=$(this),options=$.extend(true,{},o),mode=$.effects.setMode(el,o.mode||"effect"),percent=parseInt(o.percent,10)||(parseInt(o.percent,10)===0?0:mode==="hide"?0:100),direction=o.direction||"both",origin=o.origin,original={height:el.height(),width:el.width(),outerHeight:el.outerHeight(),outerWidth:el.outerWidth()},factor={y:direction!=="horizontal"?percent/100:1,x:direction!=="vertical"?percent/100:1};options.effect="size";options.queue=false;options.complete=done;if(mode!=="effect"){options.origin=origin||["middle","center"];options.restore=true}options.from=o.from||(mode==="show"?{height:0,width:0,outerHeight:0,outerWidth:0}:original);options.to={height:original.height*factor.y,width:original.width*factor.x,outerHeight:original.outerHeight*factor.y,outerWidth:original.outerWidth*factor.x};if(options.fade){if(mode==="show"){options.from.opacity=0;options.to.opacity=1}if(mode==="hide"){options.from.opacity=1;options.to.opacity=0}}el.effect(options)}});