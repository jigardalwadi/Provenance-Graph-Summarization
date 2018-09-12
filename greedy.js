// allnodes contains all the nodes from the graph
var allnodes = [];
allnodes = allnodes.concat(entityKeys, activityKeys, agentKeys, time, entdescrption);
//console.log(allnodes);
 
  
  
var V = g.nodeCount();
var E = g.edgeCount();
console.log(V +" " + E)
var k = 5;



//Directed graph Group = (V, E) and number of parts k 
Acyclic(V,E,k);

function Acyclic(V,E,k){
var lb = [0.9*V]/k;	
console.log(lb);

//2 ∀i ∈ {1, ..., k}, Vi ← ∅; ∀u ∈ V, free[u] ← true
var Group = [];
var gain = [];
var free = [];
for(var i= 0; i<k; i++){
	Group[i] = [];
	gain[i] = [];
}

for(var u in allnodes){
	free[u] = true;
}
//3 for i ∈ {1, ..., k − 1} do
for(var i=1; i< k; i++){
	//4 set ← {u ∈ V, such as Pred[u] = ∅ or ∀v ∈ Pred[u], free[v] = false}
	var set = [];
	for(var u in allnodes){
		var pred = g.predecessors(allnodes[u]);
		//  console.log(pred);
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
	//5 for u ∈ set do
	//6 gaini[u] ← CompGain(Group, u, part, i)
	for(var u in set){
		gain[i][u] = Compgain(V,E,set[u],Group[i],i);
	}
	//7 heap ← Max-heap associated to gaini
	var heap =[];
	var heap = gain[i];
	//8 while |Vi| < lb do
	while(Group[i].length < lb){
		var max = Math.max(...heap);
		//9 u ← Extract max from heap
		var indxx = heap.indexOf(max);
		//10 Vi ← Vi ∪ {u}
		
		Group[i].push(set[indxx]);
		
		//allnodes.splice(indxx,1)
		//11 free[u] ← false
		
		free[set[indxx]] = false;
		
		var v_succ = g.successors(allnodes[set[indxx]]);
		//12 for v ∈ Succ[u] do
		for(var v in v_succ){
			//13 ready ← true
			var ready = true;
			var vp = allnodes.indexOf(v_succ[v]);
			var v_pred = g.predecessors(allnodes[vp]);
			//14 for w ∈ Pred[v] do
			for(var w in v_pred){
				var wp = allnodes.indexOf(v_pred[w]);
				//15 if free[w] = true then ready ← f alse
				if(free[wp] == true){
					ready = false;
				}
			} 
			//16 if ready then
			if(ready == true){
				//17 gaini[v] ← CompGain(Group, v, part, i)
				gain[i][v] = Compgain(V,E,vp,Group[i],i);
				//18 Insert v in heap
				heap.push(gain[i][v]);
			}
		}
	}
}
return Group[i];
}
//Compgain(V,E,set[u],Group[i],i);
function Compgain(V,E,u,Group,i){
//1  gain ← 0
var gain = 0;
var u_pred = g.predecessors(allnodes[u]);
var u_succ = g.successors(allnodes[u]);
//2 for v ∈ Pred[u] do
for(var x in u_pred){
	if(Group.indexOf(u)>=0 && Group.indexOf([u_pred[x]])>=0){
		gain = gain + 1;
	}
	else if(Group.indexOf([u_pred[x]])>=0){
		gain = gain - 1;
	}
}
//7 for v ∈ Succ[u] do
for(var y in u_succ){
	if(Group.indexOf(u)>=0 && Group.indexOf([u_succ[y]])>=0){
		gain = gain - 1;
	}
	else if(Group.indexOf([u_succ[y]])>=0){
		gain = gain + 1;
	}
}
//12 return gain
return gain;
console.log(gain);
}

