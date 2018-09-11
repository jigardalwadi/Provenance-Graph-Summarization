function createentity(val) {
	for(var x in val["entity"])  {
		g.setNode(x,{label: x , shape: "rect" })
		entityKeys.push(x)	
	} 
	for(var x in val["entity"])  {
		var voe = 	val["entity"][x]
		for(var y in voe) {
			g.setNode(y ,{label: y+""+voe[y],   })
			g.setEdge(x, y , {})
			if(entdescrption.indexOf(y)<0){
			entdescrption.push(y);
			}
		}
		
	}	
}

function activity(val) {
	for(var x in val["activity"])  {
		g.setNode(x ,{label: x , shape: "ellipse" })
		activityKeys.push(x)			
	}
	
	for(var x in val["activity"])  {
		var voa = 	val["activity"][x]
		
		for(var y in voa) {
			g.setNode(y ,{label: y+""+voa[y],   })
			g.setEdge(x, y , {})
			time.push(y)
			//console.log(y);
		}
	}
}

function agent(val) {
	for(var x in val["agent"])  {
		g.setNode(x ,{label: x , shape: "diamond" })
		agentKeys.push(x)			
	}
}




function wasAttributedTo() {
	var wasAttributedTo = val["wasAttributedTo"]
	for(var entity in entityKeys) {
		for(var derived in wasAttributedTo) {
			if(entityKeys[entity] == wasAttributedTo[derived]["prov:entity"]) {
				g.setEdge(wasAttributedTo[derived]["prov:entity"], wasAttributedTo[derived]["prov:agent"], { label: "wasAttributedTo"  })
				
			}
		}		
	}
}




function wasDerivedFrom() {
	var wasDerivedFrom = val["wasDerivedFrom"]
	for(var entity in entityKeys) {
		for(var derived in wasDerivedFrom) {
			if(entityKeys[entity] == wasDerivedFrom[derived]["prov:generatedEntity"]) {
				g.setEdge(wasDerivedFrom[derived]["prov:generatedEntity"], wasDerivedFrom[derived]["prov:usedEntity"], { label: "was Derivedfrom" })
			}
			else if(entityKeys[entity] == wasDerivedFrom[derived]["prov:type"]) {
				for(var x in val["prov:type"])  {
					g.setEdge(wasDerivedFrom[derived]["prov:type"], wasDerivedFrom[derived]["prov:usedEntity"], { label: "was derivedfrom" })
					g.setNode(x ,{label: x , shape: "rect" })
					type.push(x)
				}
			}
		}		
	}
}




function alternateOf() {
	var alternateOf = val["alternateOf"]
	for(var entity in entityKeys) {
		for(var derived in alternateOf) {
			if(entityKeys[entity] == alternateOf[derived]["prov:alternate2"]) {
				g.setEdge(alternateOf[derived]["prov:alternate2"], alternateOf[derived]["prov:alternate1"], { label: "alternateOf" })
			}
		}		
	}
}


function specializationOf() {
	var specializationOf = val["specializationOf"]
	for(var entity in entityKeys) {
		for(var derived in specializationOf) {
			if(entityKeys[entity] == specializationOf[derived]["prov:specificEntity"]) {
				g.setEdge(specializationOf[derived]["prov:specificEntity"], specializationOf[derived]["prov:generalEntity"], { label: "specializationOf" })
			}
		}		
	}
}

function wasAssociatedWith() {
	var wasAssociatedWith = val["wasAssociatedWith"]
	for(var activity in activityKeys) {
		for(var derived in wasAssociatedWith) {	
			if(activityKeys[activity] == wasAssociatedWith[derived]["prov:activity"]) {
				g.setEdge(wasAssociatedWith[derived]["prov:activity"], wasAssociatedWith[derived]["prov:agent"], { label: "wasAssociatedWith" })
			}
		}		
	}	
}


function wasGeneratedBy() {
	var wasGeneratedBy = val["wasGeneratedBy"]
	for(var entity in entityKeys) {
		for(var derived in wasGeneratedBy) {
			if(entityKeys[entity] == wasGeneratedBy[derived]["prov:entity"]) {
				g.setEdge(wasGeneratedBy[derived]["prov:entity"], wasGeneratedBy[derived]["prov:activity"], { label: "wasGeneratedBy" })
			}
		}		
	}
}


function used(){
	var used = val["used"]
	for(var entity in entityKeys){
		for(var derived in used){
			if(entityKeys[entity] == used[derived]["prov:entity"]){
				g.setEdge(used[derived]["prov:activity"],used[derived]["prov:entity"], { label: "used" })
			}
		}
	
	}

}


function actedOnBehalfOf(){
	var actedOnBehalfOf = val["actedOnBehalfOf"]
	for(var agent in agentKeys){
		for(var derived in actedOnBehalfOf){
			if(agentKeys[agent] == actedOnBehalfOf[derived]["prov:responsible"]){
				g.setEdge(actedOnBehalfOf[derived]["prov:delegate"],actedOnBehalfOf[derived]["prov:responsible"], { label: "actedOnBehalfOf" })
			}
		}
	
	}

}






