{
    "metadata": {
        "version": 4.3,
        "type": "Object",
        "generator": "ObjectExporter"
    },
    "geometries": [
        {
            "uuid": "C3BF1E70-0BE7-4E6D-B184-C9F1E84A3423",
            "type": "Geometry",

	"metadata" :
	{
		"formatVersion" : 3.1,
		"generatedBy"   : "Blender 2.65 Exporter",
		"vertices"      : 8,
		"faces"         : 6,
		"normals"       : 0,
		"colors"        : 0,
		"uvs"           : [],
		"materials"     : 1,
		"morphTargets"  : 0,
		"bones"         : 0
	},

	"scale" : 1.000000,

	"materials" : [	{
		"DbgColor" : 15658734,
		"DbgIndex" : 0,
		"DbgName" : "Material",
		"blending" : "NormalBlending",
		"colorAmbient" : [0.6400000190734865, 0.10179081114814892, 0.126246120426746],
		"colorDiffuse" : [0.6400000190734865, 0.10179081114814892, 0.126246120426746],
		"colorSpecular" : [0.5, 0.5, 0.5],
		"depthTest" : true,
		"depthWrite" : true,
		"shading" : "Lambert",
		"specularCoef" : 50,
		"transparency" : 1.0,
		"transparent" : false,
		"vertexColors" : false
	}],

	"vertices" : [1,1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,0.999999,-1,1,-1,-1,1,-1,1,1],

	"morphTargets" : [],

	"normals" : [],

	"colors" : [],

	"uvs" : [],

	"faces" : [3,0,1,2,3,0,3,4,7,6,5,0,3,0,4,5,1,0,3,1,5,6,2,0,3,2,6,7,3,0,3,4,0,3,7,0],

	"bones" : [],

	"skinIndices" : [],

	"skinWeights" : [],

	"animation" : {}




}
],
"materials": [
{
"uuid": "87D95D6C-6BB4-4B8F-8166-A3A6945BA5E3",
"type": "MeshPhongMaterial",
"color": 16777215,
"ambient": 16777215,
"emissive": 0,
"specular": 1118481,
"shininess": 30,
"opacity": 1,
"transparent": false,
"wireframe": false
}
],
"object": {
"uuid": "89529CC6-CBAC-412F-AFD1-FEEAE785BA19",
"type": "Scene",
"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
"children": [
{
"uuid": "33FA38D9-0AAC-4657-9BBE-5E5780DDFB2F",
"name": "Box 1",
"type": "Mesh",
"geometry": "C3BF1E70-0BE7-4E6D-B184-C9F1E84A3423",
"material": "87D95D6C-6BB4-4B8F-8166-A3A6945BA5E3",
"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
},
{
"uuid": "16F2E381-2B73-44C4-A7BB-38D7E1CD2381",
"name": "PointLight 1",
"type": "PointLight",
"color": 16777215,
"intensity": 1,
"distance": 0,
"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,100,200,150,1]
}
]
}
}