module.exports = {
	
	nextId : function (struct) {
		
		var max = -1;
		
		for(var i=0, len = struct.length; i<len; i++) {
			if(struct[i].id > max) {
				max = struct[i].id
			}
		}
		
		return max+1
	}
}