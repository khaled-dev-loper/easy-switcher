window.onload = function(){
	var x = document.getElementsByTagName("switcher");
	var i;
	for (i = 0; i < x.length; i++) {
		// get attributes 
		var sw = x[i].getElementsByTagName("switch");
		var attrs = sw[0].attributes;
		var output = "";
		if (x[i].getElementsByTagName("switch")[0].hasAttributes()){
			for(var li = attrs.length - 1; li >= 0; li--) {
				output += " " + attrs[li].name + "='" + attrs[li].value + "'";
			}
		}
		var code_sw = sw[0].innerHTML;
		//end get attributes
		var n_mber = eval(x[i].getAttribute("length"));
		if(n_mber == 2){
			x[i].innerHTML = "<switch " + output + "><div>" + code_sw + "</div></switch>"
			//run function 
			x[i].onclick = (function(elemt){
							return function(){
								switcher_click2(elemt);
							}
						})(x[i]);
		}

		if(x[i].hasAttribute("if_changed")){
			x[i].removeAttribute("if_changed");
		}
		if(x[i].hasAttribute("value")){
			if(eval(x[i].getAttribute("value")) < 0 ){
				x[i].setAttribute("value","0")
			}
		}else{
			x[i].setAttribute("value","0")
		}
	}
	var dir = document.body.getAttribute("dir");
	when_loaded2(dir);
};
function when_loaded2(dir){	
	var swit_her = document.getElementsByTagName("switcher");
	var ls = 0;
	var li = 0;
	while (li < swit_her.length){
		var swit_h = swit_her[li].getElementsByTagName("switch");
		if(dir == 'rtl'){
			swit_h[ls].classList.add('switcher-right');
		}else{
			swit_h[ls].classList.add('switcher-left');
		}
		ls = 0;
		li = li + 1;
	}
}
function switcher_click2(elem){
	var dir = document.body.getAttribute("dir");
	var switch_ = elem.getElementsByTagName("switch")[0]
	var value = eval(elem.getAttribute("value"));
	var length = eval(elem.getAttribute("length"));
	if(dir == 'rtl'){
		if(length == 2){
			if(value == 0){
				switch_.classList.remove('cls-back-to-right-L2-V1');
				switch_.classList.add('cls-right-L2-V1');
				value = set_switcher_value(elem,value + 1)
			}else{
				switch_.classList.add('cls-back-to-right-L2-V1');
				wait(1);
				switch_.classList.remove('cls-right-L2-V1');
				switch_.classList.remove('cls-back-to-right-L2-V1');
				switch_.classList.add('cls-back-to-right-L2-V1');
				value = set_switcher_value(elem,value - 1)
			}
		}
	}else{
		if(value == 0){
			switch_.classList.add('cls-left-L2-V1');
			value = set_switcher_value(elem,value + 1);
		}
	}
	//run function when value changed
	if(elem.hasAttribute("function")){
		var func_ion =  elem.getAttribute("function");
		window[func_ion](elem);
	}
}
function set_switcher_value(elem,new_val){
		if(elem.hasAttribute("value")){
			if(eval(elem.getAttribute("value")) < 0 ){
				elem.setAttribute("value","0")
			}
		}else{
			elem.setAttribute("value","0")
		}
	var value = eval(elem.getAttribute("value"));
	elem.setAttribute("value",new_val);
	return new_val;
}
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}