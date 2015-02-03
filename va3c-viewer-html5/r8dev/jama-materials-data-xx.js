	JAMA.materials = JAMA.materials || {};


// materials

	JAMA.initMaterials = function() {

/*
		var r = "../textures/cube/skybox/";
		var urls = [ r + "px.jpg", r + "nx.jpg", r + "py.jpg", r + "ny.jpg", r + "pz.jpg", r + "nz.jpg" ];
console.log( THREE );
		var textureCube = THREE.ImageUtils.loadTextureCube( urls );
		textureCube.format = THREE.RGBFormat;

		color =  Math.random() * 0xffffff;
*/

		JAMA.materials = {

			'<Standard': '<div><h3 style=display:inline; >Car Colors</h3> <a href=http://mrdoob.github.io/three.js/examples/#webgl_materials_cars target="_blank" ><i>source</i></a></div>',
// http://mrdoob.github.io/three.js/examples/#webgl_materials_cars
			"Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
			"Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x001133, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
			"Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, ambient: 0x330000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
			"Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
			"White":	new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0x666666, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),

			"Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ),
			"Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: textureCube, combine: THREE.MultiplyOperation } ),
			"Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
			"Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ),

			'<metal' : '<br>',
			"Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, envMap: textureCube, combine: THREE.MultiplyOperation } ),
			"Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x002266, envMap: textureCube, combine: THREE.MultiplyOperation } ),
			"Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation } ),
			"Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, envMap: textureCube, combine: THREE.MultiplyOperation } ),
			"Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),

			'<chrome>' : '<br>',
			"Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube } ),
			"Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444, envMap: textureCube } ),
			"Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } ),

			'<glass>' : '<br>',
			"Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, envMap: textureCube, opacity: 0.975, transparent: true } ),
			"Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } ),
			"Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, envMap: textureCube, opacity: 0.75, transparent: true } ),
			"Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, envMap: textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

			"Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
			"Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
			"Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

			"Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
			"Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

			'<rough>' : '<br>',
			"Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
			"Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
			"Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
			"Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

			'<shiny' : '<br>',
			"Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
			"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } ),

//		};



//		matLib2 = {
			'<specials' : '<h3>Specials</h3>',
			'Normal':			new THREE.MeshNormalMaterial(),
			'Liquid': 			new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.85 } ),
			'Plastic':			new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x888888, ambient: 0x000000, shininess: 250, side: THREE.DoubleSide } ),
			"Normal Smooth":	new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading, side: 2 }),
			"Normal Flat":		new THREE.MeshNormalMaterial( { shading: THREE.FlatShading, side: 2 } ),
			"Normal Wireframe":	new THREE.MeshNormalMaterial( { shading: THREE.FlatShading, side: 2, wireframe: true } ),
			"Basic Flat Red":	new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.FlatShading, side: 2 }),
			"Lambert Smooth Random": new THREE.MeshLambertMaterial( { ambient: color, color: color, emissive: color, shading: THREE.SmoothShading, side: 2 }),

			'<phong' : '<br>',
			"Phong Default":	new THREE.MeshPhongMaterial(),
			"Phong Random Smooth": new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				emissive: 0x333333 * Math.random(),
				metal: Math.floor( 2 * Math.random() ),
				opacity: 0.2 + 0.8 * Math.random().toFixed(2),
				shading: THREE.SmoothShading,
				shininess: ( 200 * Math.random() ).toFixed(0),
				specular: 0x888888 * Math.random(),
				transparent: true,
				wireframe: Math.floor( 1.1 * Math.random() )
			} ),
			"Phong Red Plastic": new THREE.MeshPhongMaterial( {
				ambient: 0xff0000,
				color: 0xff0000,
				emissive: 0x330000,
				metal: true,
				opacity: 1,
				shading: THREE.SmoothShading,
				shininess: 250,
				specular: 0xff5555,
				transparent: false,
				wireframe: false
			} ),
			"Phong Blue Flat": new THREE.MeshPhongMaterial( {
				ambient: 0x0000ff,
				color: 0x0000ff,
				emissive: 0x000055,
				shading: THREE.FlatShading,
				shininess: 10,
				specular: 0x550000
			} ),
			"Phong Purple Flat": new THREE.MeshPhongMaterial( {
				ambient: 0x888800,
				color: 0xdd00ff,
				emissive: 0x220033,
				shading: THREE.FlatShading,
				shininess: 10,
				specular: 0x009900
			}),
			"Phong Green Smooth": new THREE.MeshPhongMaterial( {
				ambient: 0x03aa03,
				color: 0xddffdd,
				emissive: 0x005500,
				reflectivity: 1,
				shading: THREE.SmoothShading,
				shininess: 10,
				specular: 0x009900
			}),
			"PhongDefaultTextureLavatile": new THREE.MeshPhongMaterial( { map: new THREE.ImageUtils.loadTexture( '../textures/lavatile.jpg' ) } ),
			"PhongWhiteTextureWhite": new THREE.MeshPhongMaterial( { color: 0xffffff, map: new THREE.ImageUtils.loadTexture( '../textures/pure-white.png' ) } ),
			"PhongDefaultTextureSquare": new THREE.MeshPhongMaterial( { map: new THREE.ImageUtils.loadTexture( '../textures/square.png' ), opacity: 0.5, transparent: true } ),
			"PhongDefaultTextureUVgrid": new THREE.MeshPhongMaterial( { map: new THREE.ImageUtils.loadTexture( '../textures/ash_uvgrid01.jpg' ) } ),
			"PhongWhiteTextureDisturb": new THREE.MeshPhongMaterial( { map: new THREE.ImageUtils.loadTexture( '../textures/disturb.jpg' ) } ),
			"PhongWhiteTextureCar": new THREE.MeshPhongMaterial( { map: new THREE.ImageUtils.loadTexture( '../textures/im5.jpg' ) } ),

			'<envmap' : '<br>',
			"Phong Default Reflect White": new THREE.MeshPhongMaterial( { envMap: new THREE.ImageUtils.loadTextureCube( [ '../textures/pure-white.png', '../textures/pure-white.png', '../textures/pure-white.png', '../textures/pure-white.png', '../textures/pure-white.png', '../textures/pure-white.png' ] )   } ),

			"Phong Random Reflect Lava": new THREE.MeshPhongMaterial( { 
				envMap: new THREE.ImageUtils.loadTextureCube( [ '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg' ] ),
				ambient: 0xffffff * Math.random(),
				color: 0xff0000, //0xffffff * Math.random(),
//				combine: THREE.MixOperation,
				emissive: 0x222222,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 1,
				shininess: 50,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} ),

			"Phong Reflect Disturb": new THREE.MeshPhongMaterial( { envMap: new THREE.ImageUtils.loadTextureCube( [ '../textures/disturb.jpg', '../textures/disturb.jpg', '../textures/disturb.jpg', '../textures/disturb.jpg', '../textures/disturb.jpg', '../textures/disturb.jpg' ] )   } )

// 			"": new THREE.MeshPhongMaterial( { envMap: new THREE.ImageUtils.loadTextureCube( [ '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg', '../textures/lavatile.jpg' ] )   } )

		};

	};


/*
// type - color - surface

	JAMA.materials.NormalSmooth = {
		title: "Normal Smooth",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading, side: 2 });
			material.type = 0;
			return material;
		}
	};

	JAMA.materials.NormalFlat = {
		title: "Normal Flat",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshNormalMaterial( { shading: THREE.FlatShading, side: 2 } );
			material.type = 0;
			return material;
		}
	};

	JAMA.materials.NormalWireframe = {
		title: "Normal Wireframe",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshNormalMaterial( { shading: THREE.FlatShading, side: 2, wireframe: true } );
			material.type = 0;
			return material;
		}
	};

	JAMA.materials.BasicRedFlat = {
		title: "Basic Flat Red",
		category: "Basic",
		set: function() {
			material = new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.FlatShading, side: 2 });
			material.type = 1;
			return material;
		}
	};

	JAMA.materials.LambertRandomSmooth = {
		title: "Lambert Smooth Random",
		category: "Basic",
		set: function() {
			var color =  Math.random() * 0xffffff;
			material = new THREE.MeshLambertMaterial( { ambient: color, color: color, emissive: color, shading: THREE.SmoothShading, side: 2 });
			material.type = 2;
			return material;
		}
	};
*/

/*
http://mrdoob.github.io/three.js/docs/#Reference/Materials/MeshPhongMaterial
materials.push( new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) );
*/

/*
	JAMA.materials.PhongDefault = {
		title: "Phong Default",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshPhongMaterial( {
				side: 2
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandom = {
		title: "Phong Random Smooth",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				emissive: 0x333333 * Math.random(),
				metal: Math.floor( 2 * Math.random() ),
				opacity: 0.2 + 0.8 * Math.random().toFixed(2),
				shading: THREE.SmoothShading,
				shininess: ( 200 * Math.random() ).toFixed(0),
				side: 2,
				specular: 0x888888 * Math.random(),
				transparent: true,
				wireframe: Math.floor( 1.1 * Math.random() )
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRedPlastic = {
		title: "Phong Red Plastic",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshPhongMaterial( {
				ambient: 0xff0000,
				color: 0xff0000,
				emissive: 0x330000,
				metal: true,
				opacity: 1,
				shading: THREE.SmoothShading,
				shininess: 250,
				side: 2,
				specular: 0xff5555,
				transparent: false,
				wireframe: false
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongBlueFlat = {
		title: "Phong Blue Flat",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshPhongMaterial( {
				ambient: 0x0000ff,
				color: 0x0000ff,
				emissive: 0x000055,
				shading: THREE.FlatShading,
				shininess: 10,
				side: 2,
				specular: 0x550000
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongPurpleFlat = {
		title: "Phong Purple Flat",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshPhongMaterial( {
				ambient: 0x888800,
				color: 0xdd00ff,
				emissive: 0x220033,
				shading: THREE.FlatShading,
				shininess: 10,
				side: 2,
				specular: 0x009900
			});
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongGreenSmooth = {
		title: "Phong Green Smooth",
		category: "Basic",
		set: function() {
			var material = new THREE.MeshPhongMaterial( {
				ambient: 0x03aa03,
				color: 0xddffdd,
				emissive: 0x005500,
				reflectivity: 1,
				shading: THREE.SmoothShading,
				shininess: 10,
				side: 2,
				specular: 0x009900
			});
			material.type = 3;
			return material;
		}
	};

// textures

	JAMA.materials.PhongPureWhite = {
		title: "Phong White Texture",
		category: "Basic",
		set: function() {
			var texture = new THREE.ImageUtils.loadTexture( '../textures/pure-white.png' );
			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff, map: texture, opacity: 1, transparent: true 
			} );
			material.type = 3;
			return material;
		}
	};
*/

/*
	JAMA.materials.PhongGridded =  {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/square.png' );
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 30, 30 );


		material = new THREE.MeshPhongMaterial( { map: texture, opacity: 0.5, transparent: true } );
		material.type = 3;
		return material;
	};
*/

/*
	JAMA.materials.PhongUVGrid = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/ash_uvgrid01.jpg' );
		var material = new THREE.MeshPhongMaterial( { map: texture } );
		material.type = 3;
		return material;
	};

	JAMA.materials.PhongTextureLavatile = {
		title: "Phong texture LaveTile",
		category: "Basic",
		set: function() {
			var texture = new THREE.ImageUtils.loadTexture( '../textures/lavatile.jpg' );
			var material = new THREE.MeshPhongMaterial( { map: texture, side: 2 } );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongDisturb = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/disturb.jpg' );
		var material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
		material.type = 3;
		return material;
	};

	JAMA.materials.PhongCar = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/im5.jpg' );
		var material = new THREE.MeshPhongMaterial( { map: texture } );
		material.type = 3;
		return material;
	};


// envMap Reflections

	JAMA.materials.PhongDefaultReflectWhite = {
		title: "Phong Default Reflect White",
		set: function() {
			var p = JAMA.basePath + 'textures/pure-white.png';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			material = new THREE.MeshPhongMaterial( {
				envMap: reflectionCube,
				side: THREE.DoubleSide,
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectWhite = {
		title: "Phong Random Reflect White",
		set: function() {
			var p = JAMA.basePath + 'textures/pure-white.png';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				reflectivity: Math.random(),
				shading: THREE.SmoothShading,
				shininess: ( 200 * Math.random() ).toFixed(0),
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongWhiteReflectWhite = {
		title: "Phong White Reflect White",
		set: function() {
			var p = JAMA.basePath + 'textures/pure-white.png';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff,
				color: 0xffffff,
				combine: THREE.MixOperation,
				emissive: 0x555555,
				envMap: reflectionCube,
				metal: true,
				opacity: 1,
				reflectivity: 0.7,
				shading: THREE.SmoothShading,
				shininess: 30,
				specular: 0xffffff,
				side: THREE.DoubleSide,
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongGoldRefLectWhite = {
		title: "Phong Gold Reflect White",
		set: function() {
			var p = JAMA.basePath + 'textures/pure-white.png';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( {
				ambient: 'gold',
				color: 'gold',
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 1,
				reflectivity: 0.3,
				shading: THREE.SmoothShading,
				shininess: 30,
				side: 2,
				specular: 0xffffff,
				transparent: true
			});
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectGrid = {
		title: "Phong Random Reflect Grid",
		set: function() {
			var p = JAMA.basePath + 'textures/square.png';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 0.3,
				shininess: 30,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectUVGrid = {
		title: "Phong Random Reflect UVGrid ",
		set: function() {
			var p = JAMA.basePath + 'textures/';
			var urls = [ p + 'ash_uvgrid01.jpg', p + 'ash_uvgrid01.jpg', p + 'ash_uvgrid01.jpg', p + 'ash_uvgrid01.jpg', p + 'ash_uvgrid01.jpg', p + 'ash_uvgrid01.jpg' ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 0.9,
				shininess: 30,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectLavatile = {
		title: "Phong Random Reflect Lava",
		set: function() {
			var p = JAMA.basePath + 'textures/lavatile.jpg';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 1,
				shininess: 50,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectWire = {
		title: "Phong Random Reflect Wire",
		set: function() {
			var p = JAMA.basePath + 'textures/wire.jpg';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 0.3,
				shininess: 50,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectDisturb = {

		title: "Phong Random Reflect Disturb",
		set: function() {
			var p = JAMA.basePath + 'textures/disturb.jpg';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 0.5,
				shininess: 50,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectDenim = {
		title: "Phong Random Reflect Denim",
		set: function() {
			var p = JAMA.basePath + 'textures/denim.jpg';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 0.5,
				shininess: 50,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material
		}
	};

	JAMA.materials.PhongDefaultReflectDenim = {
		title: "Phong Default Reflect Denim",
		category: "Evironment Map",
		set: function() {
			var p = JAMA.basePath + 'textures/denim.jpg';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			var material = new THREE.MeshBasicMaterial( { 
				envMap: reflectionCube, 
				side: 2 } );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongDefaultRefractDenim = {
		title: "Phong Default Refract Denim",
		category: "Evironment Map",
		set: function() {
			var p = JAMA.basePath + 'textures/denim.jpg';
			var urls = [ p, p, p, p, p, p ];
			var refractionCube = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
			var material = new THREE.MeshBasicMaterial( { 
				envMap: refractionCube, 
				side: 2 
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongRandomReflectCadillac = {
		title: "Phong Random Reflect Caddy",
		category: "Evironment Map",
		set: function() {
			var p = JAMA.basePath + 'textures/im5.jpg';
			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			material = new THREE.MeshPhongMaterial( {
				ambient: 0xffffff * Math.random(),
				color: 0xffffff * Math.random(),
				combine: THREE.MixOperation,
				emissive: 0x222222,
				envMap: reflectionCube,
				metal: true,
				opacity: 0.9,
				shading: THREE.SmoothShading,
				reflectivity: 0.5,
				shininess: 50,
				side: THREE.DoubleSide,
				specular: 0xffffff * Math.random(),
				transparent: true
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongWhiteRelectPalace = {
		title: "Phong Whitee Reflect Palace",
		category: "Evironment Map",
		set: function() {
			var path = JAMA.basePath + 'textures/cube/SwedishRoyalCastle/';
			var f = '.jpg';
			var urls = [ path + 'px' + f, path + 'nx' + f, path + 'py' + f, path + 'ny' + f, path + 'pz' + f, path + 'nz' + f ];
			var texture = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
			material = new THREE.MeshPhongMaterial( { 
				ambient: 0xffffff, 
				color: 0xffffff, 
				emissive: 0xffffff, 
				envMap: texture, 
				refractionRatio: 0.98, 
				reflectivity: 0.9, 
				side: 2 
			} );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongBlueRefractPisa = {
		title: "Phong Blue Refract Pisa",
		category: "Evironment Map",
		set: function() {
			var path = JAMA.basePath + 'textures/cube/pisa/';
			var f = '.png';
			var urls = [ path + 'px' + f, path + 'nx' + f, path + 'py' + f, path + 'ny' + f, path + 'pz' + f, path + 'nz' + f ];
			var refraction = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
			material = new THREE.MeshBasicMaterial( { color: 0xccccff, envMap: refraction, refractionRatio: 0.85, eflectivity: 0.9, side: 2 } );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.PhongWhiteReflectPisa = {
		title: "Phong White Reflect Pisa",
		category: "Evironment Map",
		set: function() {
			var path = JAMA.basePath + 'textures/cube/pisa/';
			var f = '.png';
			var urls = [ path + 'px' + f, path + 'nx' + f, path + 'py' + f, path + 'ny' + f, path + 'pz' + f, path + 'nz' + f ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: reflectionCube, side: 2 } );
			material.type = 3;
			return material;
		}
	};

	JAMA.materials.BasicPatternReflectionBasic = {
		title: "Basic Pattern Reflect Basic",
		category: "Evironment Map",
		set: function() {
//			var p = JAMA.basePath + 'textures/svg_48427/icon_48427_64.png';
			var p = JAMA.basePath + 'textures/cube/check-2x.jpg';
//			var p = JAMA.basePath + 'textures/cube/sm.png';

			var urls = [ p, p, p, p, p, p ];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			var material = new THREE.MeshPhongMaterial( {
				envMap: reflectionCube,
				side: 2
			} );
			material.type = 3;
			return material;
		}
	};
*/

/*
// vertex colors

	JAMA.materials.PhongVertexColors = function( ) {
		var scale;
		var geom = JATH.selectedObject.geometry;
		//geom.computeBoundingBox();
		//yMin = geom.boundingBox.min.y;
		//yMax = geom.boundingBox.max.y;
		yRange = scale; // yMax - yMin;
		var color, point, face, numberOfSides, vertexIndex;

		for ( var i = 0; i < geom.vertices.length; i++ ) {
			point = geom.vertices[ i ];
			color = new THREE.Color( 0x0000ff );
			color.setHSL( 0.7 * (scale - point.y) / scale, 1, 0.5 );
			geom.colors[i] = color; // use this array for convenience
		}

		var faceIndices = [ 'a', 'b', 'c', 'd' ];
		for ( i = 0; i < geom.faces.length; i++ ) {
			face = geom.faces[ i ];
			numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
			for ( var j = 0; j < numberOfSides; j++ ) {
				vertexIndex = face[ faceIndices[ j ] ];
				face.vertexColors[ j ] = geom.colors[ vertexIndex ];
			}
		}

		var material = new THREE.MeshBasicMaterial( { color: 0xff0000, vertexColors: THREE.VertexColors  } );
		material.title = "xxx";
		material.type = 3;
		return material;
	};
*/