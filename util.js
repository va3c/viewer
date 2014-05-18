function getLoader(filename) {
	var extension = filename.split('.').pop().toLowerCase();
	var loader;
	switch(extension) {
	case "dae":
		loader = new THREE.ColladaLoader();
		break;
	case "js":
		loader = new THREE.JSONLoader();
		break;
	default:
		loader = new THREE.ObjectLoader();
	} 
	return loader;
}

//<script src=util.js ></script>
//sample use
// loader = getLoader(fname);
