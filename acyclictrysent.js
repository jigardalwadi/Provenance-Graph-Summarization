//inding number of edgeCuts 
function edgexcut(allnodes){
	var edgecut1=0;
	for(var i in allnodes){
		var succ = g.successors(allnodes[i]);
		for(var j in succ){
			if(g.parent(succ[j]) != g.parent(allnodes[i])){
			edgecut1++;
		}
	}
}
 return edgecut1;

 }
 



// To daw graph based on geedy algo
function creategrACYCLIC(partitions,allnodes){
for(var par in partitions){
	g.setNode(par,{label: par});
	
	for(var gp in partitions[par]){
		var gp_node = partitions[par][gp];
		//console.log(allnodes[gp_node]);
		g.setParent(allnodes[gp_node],par);
	}
}
for(var i in allnodes){
	if(g.parent(allnodes[i]) == undefined){
		var succ = g.successors(allnodes[i]);
		if(succ.length == 0 || succ.length == undefined){
			var pred = g.predecessors(allnodes[i]);
			g.setParent(allnodes[i],g.parent(pred[0]))
		}
		else{
			g.setParent(allnodes[i],g.parent(succ[0]))
			
		}
		
	}
}

}

//Dawing based on refined values 
function createReinedGroup(partitionsReined,k){
console.log(partitionsReined)
	for(var i in allnodes){
		g.setParent(allnodes[i],partitionsReined[i]);
		
	}
	
	// for(var i=0;i<k;i++){
		// g.setNode(i,{label:i});
		// for(var j in allnodes){
			// var node = partitionsReined[j];
			// //console.log(node);
			// if(j == node){
				// g.setParent(allnodes[j],i);
				// console.log(allnodes[j]+'   '+g.parent(allnodes[j]));
			// }
			
		// }
		
		// for(var j in partitionsReined){
		// var pa = partitionsReined[j];
		// if(pa==i){
			// g.setParent(allnodes[j],i);
		// }
	// }
	//}
	
	
} 






function comp_gain(node,rev_part,i){
var gain = 0;
var u_pred = g.predecessors(allnodes[node]);
var u_succ = g.successors(allnodes[node]);

for(var a in u_succ){
	var succ_ind = allnodes.indexOf(u_succ[a]);
	if(rev_part.has(succ_ind)>=0 && rev_part.has(node) == rev_part.has(succ_ind)){
		gain = gain - 1;
	}
	else if(rev_part.has[succ_ind] == i){
		gain = gain + 1;
	}
}

for(var b in u_pred){
	var pred_ind = allnodes.indexOf(u_pred[b]);
	if(rev_part.has(pred_ind)>=0 && rev_part.has(node) == rev_part.has(pred_ind)){
		gain = gain - 1;
	}
	else if(rev_part.has(pred_ind)>=0 && rev_part.has(pred_ind) == i)
		gain = gain + 1;
	}
return gain;
}


var part = [];
var rev_part = new Set([]);

function Acyclic(V,E,k){
var lb = [0.9*V]/k;	
console.log(lb);

//var rev_part = new Set([]);
var free = [];
var occupied = [];
for(var i=0;i<V;i++){
	free[i] = true;
	occupied[i] = true;
}


for(var i=0; i<k  ; i++){
	part[i] = [];
}

var set = [];
for(var i=0; i< k; i++){
	for(var u in allnodes){
		var pred = g.predecessors(allnodes[u]);
		//console.log(pred)
		if(pred != undefined){
			if(pred.length == 0 && set.indexOf(u)== undefined){
				set.push(u);
			}
			else{
				for(var v in pred){
					var indx = allnodes.indexOf(pred[v]);
					if(free[indx] == true){
						free[indx] = false;
						set.push(indx);
					}
				}
			}
		}
	}
	//console.log(set)
	var gain = [];
	for(var u in set){
		u_gain = comp_gain(set[u],rev_part,i);
		//console.log(allnodes[set[u]]+"   "+u_gain)
		var gai = {
			number: set[u],
			gn: u_gain
		}		 
		if(gain.indexOf(gai)<0){
			 gain.push(gai);
		}
	}
	gain = gain.sort(function(a,b){return b.gn - a.gn});
	while(part[i].length < lb ){
		gain = gain.sort(function(a,b){return b.gn - a.gn});
		if(gain.length > 0){
		var maxgain = gain[0].number;
		gain.splice(gain[0],1);
		if(rev_part.has(maxgain)){
			var j = rev_part[maxgain]
			part[j].splice(maxgain,1);
			gain.splice(maxgain,1);
			rev_part.delete(maxgain);
		}
		if(occupied[maxgain] == true){
			occupied[maxgain] = false;
			part[i].push(maxgain);
		}
		rev_part[maxgain] = i;
		free[maxgain]= false;
		
		var succ_max = g.successors(allnodes[maxgain]);
		for(var y in succ_max){
			var ready = true;
			var pred_max = g.predecessors(succ_max[y])
			for(var z in pred_max){
				var pred_max_indx = allnodes.indexOf(pred_max[z])
				if(free[pred_max_indx] == true){
					ready = false;
					break;
				}
				if(ready = true){
					var y_gain = comp_gain(succ_max[y],rev_part,i)
					var indx_succ_maxx = allnodes.indexOf(succ_max[y])
					var gan_obj = {
						number: indx_succ_maxx,
						gn: y_gain
					}
					gain.push(gan_obj);
					var itemtest = gain.findIndex(x => x.number === gan_obj.number)
					if(itemtest<0){
						gain.push(gan_obj);
			
					}
				}
			}
		}

}
	}
}
console.log(rev_part)
return part

}
// greedy output will be based on this groups 
// 0,1,19,3
// 12,5,14,9
// 18,17,6,10
// 15,16,2,11
// 7,8,4,13




var gain = [];

// sorted input for toplogical refinment
// [7, 8, 4, 13]
// [12, 5, 14, 9]
// [0, 1, 19, 3]
// [15, 16, 2, 11]
// [18, 17, 6, 10]

 
function TopologicalRefinement(V,E,part,k,partitions){




var copy = [];	
var gain1 = [];
var moveto = [];
var moved = [];
var moves = [];
var part1 =[];
var part_parent = [];
var heap = [];
var heapsort = [];	
var ec = k;
var ecmin = ec;
var len = 0 ;



for(var i in partitions){
	for(var j in partitions[i]){
		part_parent[partitions[i][j]] = i; 
		console.log(part_parent[partitions[i][j]])
	
	}
}

for(var i in allnodes){
	if(g.parent(allnodes[i]) == undefined){
		var succ = g.successors(allnodes[i]);
		if(succ.length == 0){
			var pred = g.predecessors(allnodes[i]);
			part_parent[i] = g.parent(pred[0]);
			g.setParent(allnodes[i],part_parent[i]);	
		}
		else{
			part_parent[i] = g.parent(succ[0]),
			g.setParent(allnodes[i],part_parent[i]);	
		}
		
	}
}
console.log(part)


for(var i in part){
	for(var j in part[i]){ 
		var u = allnodes[part[i][j]];
		Update(heap,moveto,gain1,u,part_parent);
		//console.log(moveto)
		len = len+1;
		moved[part[i][j]] = false;
	}
}
console.log(part_parent)


for(var i in heap){
	var heap_sort={
			heap : heap[i],
			gain1 : gain1[i]
		}
	heapsort.push(heap_sort)	
	//console.log(heap_sort)
}
heapsort = heapsort.sort(function(a,b){return b.gain1 - a.gain1});
console.log(heapsort)

var heap1 = [];
for(var i in heapsort){
	heap1[i] = heapsort[i].heap;
}
//console.log(heap1)

var idx = 0;
var ecidx = 0;



while(heap1.length >0){	
		//len--; 
		var extract = heap1[0];
		var gain_extract = heapsort[0].gain1; 
		var heapsort_index = heapsort.map(x=>x.heap).indexOf(extract);
		if(heapsort_index >= 0){
			heapsort.splice(heapsort_index,1)
		}
		moved[allnodes.indexOf(extract)] = true;
		heap1.splice(heap1[0],1);
		moves[idx] = extract;
		idx = idx +1;
		part1[allnodes.indexOf(extract)] = moveto[allnodes.indexOf(extract)];
		
		part_parent[allnodes.indexOf(extract)] = moveto[allnodes.indexOf(extract)];
		ec = ec - gain_extract;
		if(ec < ecmin){
			ecmin = ec;
			ecidx = idx;
		}
		var Final1 =   g.successors(extract);
		var Final2 =   g.predecessors(extract);
		//console.log(Final1+"  ------- "+Final2);
		var allofu = Final1.concat(Final2);
		for(var v in allofu){
			var indx = allnodes.indexOf(allofu[v]);
			if(moved[indx] == false){
				//console.log(heap1);
				//moved[indx] = true;
				Update(heap1,moveto,gain1,allofu[v],part_parent);
				
				console.log(heap1);
				//console.log(heapsort)
				
				var lenh = heap1.length;
				var heap_sort={
					heap : heap1[lenh-1],
					gain1 : gain1[allnodes.indexOf(allofu[v])]
				}
				
				var index_heap = heapsort.map(x=>x.heap).indexOf(heap1[len-1])
				if(index_heap > 0){
					if(heapsort[index_heap].gain1 < heap_sort.gain1){
						heapsort[index_heap].gain1 = heap_sort.gain1;
					} 
					 
				}
				else{
					heapsort.push(heap_sort);
					 
				}
				// if(heapsort.length > allnodes.length){
					// heapsort.splice(-1,1)
				// }
				heapsort = heapsort.sort(function(a,b){return b.gain1 - a.gain1});
				var heap2 = [];
				for(var i in heapsort){
					heap2[i] = heapsort[i].heap;
				}
				heap1 = heap2;
				len = heap1.length;
				console.log(heap1);
				//console.log(len);
			}
		}
		
				
				
		//console.log(allofu);
	}
	//console.log(ecidx);
	for(var i = idx-1; i< ecidx; i++){
		 part1[moves[i]] = part_parent[allnodes.indexOf(moves[i])];
		 //console.log(part1);
	}
	console.log(moved)
	console.log(allnodes)
	return part1
	
} 


function Update(heap,moveto,gain1,u,part_parent){
	var max,min;
	var p = g.predecessors(u).length;
	if(p == 0){
		var max1 = part_parent[allnodes.indexOf(u)];
		max1 = max1 - 1;
		if(max1 > 1 ){
			max = max1;
		}
		else{
			max = 1;
		}
	}
	else{
		var predd = g.predecessors(u);
		var max1 =[];
		for(var v in predd){
			var indx = allnodes.indexOf(predd[v]);
			max1[v] = part_parent[indx];
		}
		max1.sort(function(a,b){return b-a});
		max = max1[0];
	}
	var q = g.successors(u).length;
	if(q == 0){
		var min1 =  part_parent[allnodes.indexOf(u)];
		min1 = min1 - 1;
		if(min1 > k){
			min = min1;
		}
		else{
			min = k;
		}
	 }
	else{
		var succ = g.successors(u);
		var min1 =[];
		for(var v in succ){
			 var indx = allnodes.indexOf(succ[v]); 
			 min1[v] = part_parent[indx];
		}
		min1.sort(function(a,b){return a-b})
		min = min1[0];
	}
	
	var part_indx = part_parent[allnodes.indexOf(u)];
	
	if(max != part_indx && min == part_indx){
		heap.push(u);
		var ind = heap.indexOf(u)
		moveto[allnodes.indexOf(u)] = min; 
		var gainiu = compgain_update(u,part_parent,max);
		//gain1[allnodes.indexOf(u)] = gainiu;
		gain1[ind]= gainiu;
		//console.log(gainiu);
	
	}
	if(min != part_indx && max == part_indx){
		heap.push(u);
		var ind = heap.indexOf(u)
		
		moveto[allnodes.indexOf(u)]  = max;
		//console.log(u)
		var gainiu = compgain_update(u,part_parent,min);
		//gain1[allnodes.indexOf(u)] = gainiu;
		gain1[ind]= gainiu;
		//console.log(moveto[u]);
	}
	 
	if(min != part_indx  && max != part_indx){
		heap.push(u);
		var ind = heap.indexOf(u)
		
		var gain_1, gain_2;
		gain_1 = compgain_update(u,part_parent,min);
		gain_2 = compgain_update(u,part_parent,max)
		if(gain_1 > gain_2){
			moveto[allnodes.indexOf(u)]  = min;
			//gain1[allnodes.indexOf(u)]  = gain_1;
				gain1[ind]= gain_1;
			
		}
		else{
			moveto[allnodes.indexOf(u)]  = max;
			//gain1[allnodes.indexOf(u)]  = gain_2; 
			gain1[ind]= gain_2;
		}
		//console.log(moveto[u]);
	}
	
	if(max == part_indx && min == part_indx){
		heap.push(u);
		var ind = heap.indexOf(u)
		moveto[allnodes.indexOf(u)] = part_indx; 
		var gainiu = compgain_update(u,part_parent,max);
		//gain1[allnodes.indexOf(u)] = gainiu;
		gain1[ind]= gainiu;
	}
	
	console.log("max="+max + "  min=" +min + "   pat_indx="+ part_indx + "  gain1="+ gain1[ind]  +"   moveto="+moveto[allnodes.indexOf(u)]+ "  node="+ u );
	 
}



function compgain_update(node,part_parent,i){
var gain = 0;
var u_pred = g.predecessors(node);
var u_succ = g.successors(node);
var node_index = allnodes.indexOf(node);
//console.log(node)
for(var a in u_succ){
	var succ_ind = allnodes.indexOf(u_succ[a]);
	
	//console.log(rev_part.size);
	 
	if(part_parent[succ_ind] == part_parent[node_index]){
		gain = gain - 1;
	} 
	else if(part_parent[succ_ind] == i){
		gain = gain + 1;
		
	} 
	
}

for(var b in u_pred){
	var pred_ind = allnodes.indexOf(u_pred[b]);
	
	if(part_parent[pred_ind] == part_parent[node_index]){
		gain = gain -1 ;
	}
	else if(part_parent[pred_ind] == i){
		gain = gain + 1;
	}
	}
return gain;
}

