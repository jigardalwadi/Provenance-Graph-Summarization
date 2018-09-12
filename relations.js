flag2 = true;
var storeentity = [];
var storeactivity = [];
var lable1= [];
var lable2 = [];

function relations(){
for(var x in entityKeys){
	if(g.successors(entityKeys[x]) != undefined){ // if there is no succesor
		var edgelab = 	[];
		for(var y in g.successors(entityKeys[x])){//find succesor and edgelable
		edgelab.push(g.edge(entityKeys[x],g.successors(entityKeys[x])[y]));
		}
		var obj1 =  {
			entity: entityKeys[x],
			vals : edgelab
		};
		lable1.push(obj1)
	}
}
for(var x in activityKeys){
	if(g.successors(activityKeys[x]) != undefined){ // if there is no succesor
		var edgelab = 	[];
		for(var y in g.successors(activityKeys[x])){//find succesor and edgelable
		edgelab.push(g.edge(activityKeys[x],g.successors(activityKeys[x])[y]));
		}
		var obj2 =  {
			entity: activityKeys[x],
			vals : edgelab
		};
		lable2.push(obj2)
		console.log(lable2)
	}
}





for(x=0; x < lable1.length;x++){ 
	var store1 = {             
		entity1 : lable1[x].entity,
		entity2: []
	}
	for(y=x+1; y< lable1.length;y++){
		if(lable1[x].vals.length == lable1[y].vals.length){      
			for(var z in lable1[x].vals){     
				// if they are same
				if(lable1[x].vals[z].label && lable1[y].vals[z].label && 
				lable1[x].vals[z].label == lable1[y].vals[z].label){ 
					//console.log("z  " +z)
					//console.log("lab " +lable1[x].vals.length)
					if(z == lable1[x].vals.length-1){
						store1.entity2.push(lable1[y].entity);
						lable1.splice(y, 1);
						if(storeentity.indexOf(store1)<0){
							lable1.splice(y, 1);
							storeentity.push(store1);
							//g.setNode(x,{label: x});
						}
					}
				}
				
			}
		}
	}
}



for(x=0; x < lable2.length;x++){ 
	var store1 = {             
		entity1 : lable2[x].entity,
		entity2: []
	}
	for(y=x+1; y< lable2.length;y++){
		if(lable2[x].vals.length == lable2[y].vals.length){      
			for(var z in lable2[x].vals){     
				if(lable2[x].vals[z].label && lable2[y].vals[z].label && lable2[x].vals[z].label == lable2[y].vals[z].label){      // if they are same
					//console.log("z  " +z)
					//console.log("lab " +lable2[x].vals.length)
					if(z == lable2[x].vals.length-1){
						store1.entity2.push(lable2[y].entity);
						lable2.splice(y, 1);
						if(storeactivity.indexOf(store1)<0){
							lable2.splice(y, 1);
							storeactivity.push(store1);
							//g.setNode(x,{label: x});
						}
					}
				}
				
			}
		}
	}
}



for(var x in storeentity){
	if(g.parent(storeentity[x].entity1) == undefined ){
		g.setNode(x,{label: "aaa"});
		g.setParent(storeentity[x].entity1,x);
		//console.log("adsad");
		for(var y in storeentity[x].entity2){
			g.setParent(storeentity[x].entity2[y],x);
			
		}
		
	}
}
for(var x in storeactivity){
	if(g.parent(storeactivity[x].entity1) == undefined ){
		var y = x+500;
		g.setNode(y,{label: "bbb"});
		g.setParent(storeactivity[x].entity1,y);
		for(var z in storeactivity[x].entity2){
			g.setParent(storeactivity[x].entity2[z],y);
		}
	}
}
init(g);
}