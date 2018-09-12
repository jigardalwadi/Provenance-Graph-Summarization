var indexednode = [];	
for(var x in allnodes){
	var indexed = {
		nodename: allnodes[x],
		nodenumber: x++ + 1,
	}
	indexednode.push(indexed);
}
var par_grp = [];		
var neighbour = [];
for(var x in indexednode){
	var nab = g.neighbors(indexednode[x].nodename);
	neighbour.push(nab);
}	
//	console.log(neighbour)	
var list =[];
	 
for(var x in neighbour){
	var list1 =[]// Array(neighbour[x].length);
	for(var y in neighbour[x]){
		for(var z in indexednode){
			if(neighbour[x][y] ==indexednode[z].nodename && y <= neighbour[x].length){
				var ind = indexednode[z].nodenumber;
				//console.log(ind);
				list1.push(ind);
				//console.log(list1);
			}
		}
	}
list.push(list1);
}

list.unshift(g.nodeCount() +" "+ g.edgeCount());
//console.log(list)		
		
		
function SaveAsFile(t,f,m) {
	stringfile = "";
	String.prototype.replaceAll = function(target, replacement) {
		return this.split(target).join(replacement);
	};
	for(var x in t) {
		if(x >= 0) {
			stringfile += t[x];
			array = new Array(stringfile)
			for (i = 0; i < array.length; ++i) {
				array[i] = array[i].replaceAll(","," ")
			}
			stringfile += " \n"
		} 
	}
		var b = new Blob([array],{type:m});
			saveAs(b, f);
		}
	SaveAsFile(list,"filename.graph","text/plain;charset=ASCII");
	
	 
var groped = [];
var new_grp = [];
$.getScript("C:\\Users\\jigar\\Koop\\project 1\\metis-pk\\graphs\\filename__.jsC:\\Users\\jigar\\Koop\\project 1\\metis-pk\\graphs\\filename__.js")
  .done(function() {
    	Array.prototype.unique = function() {
    var arr = [];
    for(var i	 = 0; i < this.length; i++) {
        if(!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
} 
	
var uniques = r.unique();
var leg = uniques.length;
for(var x=0; x < leg; x++){		
	g.setNode(x, {label:x});
}
for(var i in r){
	for(var x in allnodes){
		if(x == i){
			var newgrp = {
				node_name: allnodes[x],
				node_grp : r[i]
			}
		}
	}
	new_grp.push(newgrp);
}
console.log(new_grp);
for(var x in new_grp){
	var all_node = g.nodes();
	if(all_node.indexOf(new_grp[x].node_name) > 0){
		g.setParent(new_grp[x].node_name,new_grp[x].node_grp);
	}
}


// Metis to graph
for(var x in g.nodes()){ // find all the parent node
	if(g.parent(g.nodes()[x]) == undefined){
		par_grp.push((g.nodes()[x]));
	}
}
for(var x in par_grp){ 
	var child_grp = g.children(par_grp[x]); // find child nodes in each grp
	for(var y in child_grp){
		var succ = g.successors(child_grp[y]); // find successor of each child node
		for(var z in succ){ 
			var find_parent = g.parent(succ[z]);
			if(par_grp[x].indexOf(find_parent)){
				
			}
		}
	}
}


init(g);
});
  
