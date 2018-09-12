newgrpchild = [];
newgrpparent = [];
flag1 = true;
svg.selectAll("g.node").on("click", function(id) { 
z = 0;
nooutcluster = [];
noincluster = [];

if(flag1 == true){
	for(var x in grp){
	console.log("fla = "+flag)
		for(var y in g.successors(grp[x])){
			if(g.predecessors(g.successors(grp[x])[y]).length <2	 ){
				var s = g.predecessors(g.successors(grp[x])[y]);
				newgrpchild.push(s[0]);
				//console.log("newgrpchild "+ newgrpchild);
				//console.log(id);
				if(newgrpchild.indexOf(id) >= 0 ){
					console.log("setting parent of ");
					for(var xx in newgrpchild){
						if(g.parent(newgrpchild[xx]) == undefined){
						g.setNode(xx,{label: z+x});
						g.setParent(newgrpchild[xx],xx);
						}
						
					}
					z++;
					//console.log(z +"fla = "+flag1)
				}
			}
		//console.log("parent  "+g.predecessors(g.successors(grp[x])[y]).length)
		//console.log(grp)
		}
		
	
	}
	for(var a in allnodes){
		if(g.successors(allnodes[a]).length == 1 && g.predecessors(allnodes[a]).length < 1 ){
		newgrpparent.push(allnodes[a]);
		console.log('newgrpparent'+newgrpparent);
			if(newgrpparent.indexOf(id) >= 0 && g.parent(id)== undefined){
				g.setNode(a,{label: a});
				if(g.parent(newgrpparent[a])== undefined){
					g.setParent(newgrpparent[a],a);
					noincluster.push(a);
					a++;
				}
				console.log("aa")
			}
	
	console.log(newgrpparent);
		}

	}
	flag1 = false;
	init(g);
}
	//var _node = g.node(id); 
else{	
	 console.log("Clicked " + noout); 
	
	for(var x in newgrpchild){
		var succ = g.successors(newgrpchild[x]);
	//	console.log(succ)
		for(var y in succ){
			if(noout.indexOf(succ[y])>=0  && g.predecessors(succ[y]).length < 2){
				var par = g.parent(newgrpchild[x]);
				g.setParent(succ[y],par);
				console.log("a");
			}
		}
	
	}
	for(var z in newgrpparent){
		var chi = g.successors(newgrpparent[z]);
		g.setParent(chi,g.parent(newgrpparent[z]));
		console.log("b");
	}
	
	console.log("befoe"+flag1);
	init(g); 
	flag1 =true;
	console.log("after"+flag1);
}
}

);



	

svg.selectAll("g.node").on("click", function(id) {

console.log(g.nodeCount());
if(g.parent(id) == undefined){
		g.setNode(aa,{label: aa});
		g.setParent(id,aa);
		
		console.log(g.nodeCount());
		successor = g.successors(id);
		console.log(g.successors(id));
		for(var ab in successor){
			g.setParent(successor[ab], g.parent(id));
			console.log("aasfs");
		}
		
}
else{
successor = g.successors(id);
parent = g.parent(id);
	for(var ba in successor){
		if(g.parent(successor[id])==undefined){
		g.setParent(successor[ba],parent);
		console.log("aasfs");
		}
	}
}
aa++;
init(g);
});
