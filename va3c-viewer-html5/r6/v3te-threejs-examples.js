// data files are sourced from http://mrdoob.github.io/three.js/examples/

	var V3TM = {} || V3TM;
	var V3TB = {} || V3TB;
	var V3TO = {} || V3TO;

	if ( window.location.origin.substr(0,7) === 'http://' ) {
		V3TM.basepath = 'http://va3c.github.io/three.js/examples/models/';
		V3TB.basepath = 'http://va3c.github.io/three.js/examples/';
		V3TO.basepath = 'http://va3c.github.io/three.js/examples/obj/';
	} else {
		V3TM.basepath = '../../../../three.js/examples/models/';
		V3TB.basepath = '../../../../three.js/examples/';
		V3TO.basepath = '../../../../three.js/examples/obj/';
	}

	V3TM.addThreejsModelsTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabThreejsModels ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> Three.js Example Models...' +
			'</p></a>';
		tabThreejsModels.onclick = function() {JA.toggleDialogs(V3TM.threejsModelsTab); };

		V3TM.threejsModelsTab = tab.appendChild( document.createElement( 'div' ) );
		V3TM.threejsModelsTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, scale;
		for ( var i = 0, len = V3TM.files.length; i < len; i++ ) {
			file = V3TM.files[ i ][ 0 ];
			scale = V3TM.files[ i ][ 1 ];
			title = V3TM.files[ i ][ 2 ] ? V3TM.files[ i ][ 2 ] : '';
			fileList += 
				'<a href=JavaScript:JAFO.openUrl("' + V3TM.basepath + file + '",' + scale + '); >[O]</a> ' +
				'<a href=JavaScript:' +
				'JAFO.appendUrl("' + V3TM.basepath + file + '",' + scale + '); title="' + title + '" >' + file.split('/').pop() + '</a><br>';
		}

		V3TM.threejsModelsTab.innerHTML =
			'<p>' +
				'Sourced from <a href="http://mrdoob.github.io/three.js/examples/models" target="_blank">threejs.org</a><br><br>' +
				'Currently supports: .dae, .js, json, .obj, .stl ascii, .vtk, .wrl' +
			'</p>' +
			'<p><a href=JavaScript:JAFO.openUrl("template-basic.html"); >Open new drawing</a></p>' +
			'<p>.dae requires new drawing to load materials</p>' +
			'<p>' + fileList + '</p>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3TM.threejsModelsTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3TM.files = [
		['animated/elderlyWalk.js', 1, ''  ],
		['animated/flamingo.js', 1, ''  ],
		['animated/horse.js', 1, ''  ],
		['animated/parrot.js', 1, ''  ],
		['animated/sittingBox.js', 1, ''  ],
		['animated/stork.js', 1, ''  ],
		['animated/monster/monster.js', 0.05, ''  ],
		['animated/ogro/ogro-light.js', 1, ''  ],
		['animated/ogro/weapon-light.js', 1, ''  ],
		['animated/ratamahatta/ratamahatta.js', 1, ''  ],
		['animated/ratamahatta/weapon.js', 1, ''  ],
		['animated/ratamahatta/w_bfg.js', 1, ''  ],
		['animated/ratamahatta/w_blaster.js', 1, ''  ],
		['animated/ratamahatta/w_chaingun.js', 1, ''  ],
		['animated/ratamahatta/w_glauncher.js', 1, ''  ],
		['animated/ratamahatta/w_hyperblaster.js', 1, ''  ],
		['animated/ratamahatta/w_machinegun.js', 1, ''  ],
		['animated/ratamahatta/w_railgun.js', 1, ''  ],
		['animated/ratamahatta/w_rlauncher.js', 1, ''  ],
		['animated/ratamahatta/w_shotgun.js', 1, ''  ],
		['animated/ratamahatta/w_sshotgun.js', 1, ''  ],
		['animated/ratamahatta/src/ratamahatta.md2', 1, ''  ],
		['animated/ratamahatta/src/weapon.md2', 1, ''  ],
		['animated/ratamahatta/src/w_bfg.md2', 1, ''  ],
		['animated/ratamahatta/src/w_blaster.md2', 1, ''  ],
		['animated/ratamahatta/src/w_chaingun.MD2', 1, ''  ],
		['animated/ratamahatta/src/w_glauncher.md2', 1, ''  ],
		['animated/ratamahatta/src/w_hyperblaster.md2', 1, ''  ],
		['animated/ratamahatta/src/w_machinegun.md2', 1, ''  ],
		['animated/ratamahatta/src/w_railgun.md2', 1, ''  ],
		['animated/ratamahatta/src/w_rlauncher.md2', 1, ''  ],
		['animated/ratamahatta/src/w_shotgun.md2', 1, ''  ],
		['animated/ratamahatta/src/w_sshotgun.md2', 1, ''  ],
		['assimp/interior/interior.3ds', 1, ''  ],
		['assimp/interior/interior.3ds.json', 1, ''  ],
		['assimp/jeep/jeep1.ms3d', 1, ''  ],
		['assimp/jeep/jeep1.ms3d.json', 1, ''  ],
		['awd/simple/simple.awd', 1, ''  ],
		['collada/avatar.dae', 10 ],
		['collada/multimaterial.dae', 1, ''  ],
		['collada/monster/monster.dae', 0.25, '' ],
		['collada/pump/pump.dae', 1, ''  ],
		['ctm/ben.ctm', 1, ''  ],
		['ctm/hand.ctm', 1, ''  ],
		['ctm/LeePerry.ctm', 1, ''  ],
		['ctm/WaltHead.ctm', 1, ''  ],
		['ctm/camaro/camaro.ctm', 1, ''  ],
		['ctm/camaro/camaro.js', 1, ''  ],
		['gltf/duck/duck.dae', 1, ''  ],
		['gltf/duck/duck.json', 1, ''  ],
		['gltf/duck/duck0FS.glsl', 1, ''  ],
		['gltf/duck/duck0VS.glsl', 1, ''  ],
		['gltf/monster/monster.dae', 1, ''  ],
		['gltf/monster/monster.json', 1, ''  ],
		['gltf/monster/monster0FS.glsl', 1, ''  ],
		['gltf/monster/monster0VS.glsl', 1, ''  ],
		['molecules/Al2O3.pdb', 1, ''  ],
		['molecules/aspirin.pdb', 1, ''  ],
		['molecules/buckyball.pdb', 1, ''  ],
		['molecules/caf2.pdb', 1, ''  ],
		['molecules/caffeine.pdb', 1, ''  ],
		['molecules/cholesterol.pdb', 1, ''  ],
		['molecules/cocaine.pdb', 1, ''  ],
		['molecules/cu.pdb', 1, ''  ],
		['molecules/cubane.pdb', 1, ''  ],
		['molecules/diamond.pdb', 1, ''  ],
		['molecules/ethanol.pdb', 1, ''  ],
		['molecules/glucose.pdb', 1, ''  ],
		['molecules/graphite.pdb', 1, ''  ],
		['molecules/lsd.pdb', 1, ''  ],
		['molecules/lycopene.pdb', 1, ''  ],
		['molecules/nacl.pdb', 1, ''  ],
		['molecules/nicotine.pdb', 1, ''  ],
		['molecules/ybco.pdb', 1, ''  ],
		['ply/ascii/dolphins.ply', 1, ''  ],
		['ply/ascii/dolphins_colored.ply', 1, ''  ],
		['ply/binary/dolphins_be.ply', 1, ''  ],
		['ply/binary/dolphins_le.ply', 1, ''  ],
		['skinned/human_walk_0_female.js', 1, ''  ],
		['skinned/knight.js', 1, ''  ],
		['skinned/UCS_config.json', 1, ''  ],
		['skinned/marine/m4.js', 1, ''  ],
		['skinned/marine/marine.js', 1, ''  ],
		['skinned/marine/marine_anims.js', 1, ''  ],
		['skinned/marine/marine_ikrig.js', 1, ''  ],
		['skinned/UCS/umich_ucs.js', 1, ''  ],
		['stl/ascii/pr2_head\_pan.stl', 200, '' ],
		['stl/ascii/pr2_head\_tilt.stl', 200, '' ],
		['stl/ascii/slotted_\disk.stl', 200, ''  ],
		['stl/binary/pr2_head\_pan.stl', 200, '' ],
		['stl/binary/pr2_head\_tilt.stl', 200, '' ],
		['utf8/ben.js', 1, ''  ],
		['utf8/ben.utf8', 1, ''  ],
		['utf8/ben_dds.js', 1, ''  ],
		['utf8/hand.js', 1, ''  ],
		['utf8/hand.utf8', 1, ''  ],
		['utf8/WaltHi.js', 1, ''  ],
		['utf8/WaltHi.utf8', 1, ''  ],
		['utf8/dds/James_Body_Lores.dds', 1, ''  ],
		['utf8/dds/James_EyeLashBotTran.dds', 1, ''  ],
		['utf8/dds/James_EyeLashTopTran.dds', 1, ''  ],
		['utf8/dds/James_Eye_Green.dds', 1, ''  ],
		['utf8/dds/James_Eye_Inner_Green.dds', 1, ''  ],
		['utf8/dds/James_Face_Color\_Hair\_Lores.dds', 1, ''  ],
		['utf8/dds/James_Mouth_Gum_Lores.dds', 1, ''  ],
		['utf8/dds/James_Tongue_Lores.dds', 1, ''  ],
		['utf8/dds/MCasShoe1TEX_Lores.dds', 1, ''  ],
		['utf8/dds/MJeans1TEX_Lores.dds', 1, ''  ],
		['utf8/dds/MTshirt3TEX_Lores.dds', 1, ''  ],
		['utf8/dds/Nail_Hand_01_Lores.dds', 1, ''  ],
		['vrml/house.wrl', 1, ''  ],
		['vrml/simple.wrl', 1, ''  ],
		['vtk/bunny.vtk', 300, '' ]
	];

	V3TO.addThreejsObjTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabThreejsObj ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> Three.js Example Objects...' +
			'</p></a>';
		tabThreejsObj.onclick = function() {JA.toggleDialogs( V3TO.threejsObjTab ); };

		V3TO.threejsObjTab = tab.appendChild( document.createElement( 'div' ) );
		V3TO.threejsObjTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, scale;
		for ( var i = 0, len = V3TO.files.length; i < len; i++ ) {
			file = V3TO.files[ i ][ 0 ];
			scale = V3TO.files[ i ][ 1 ]; 
			
			fileList += 
			'<a href=JavaScript:JAFO.openUrl("' + V3TO.basepath + file + '",' + scale + '); >[O]</a> ' +
			'<a href=JavaScript:JAFO.appendUrl("' + V3TO.basepath + file + '",' + scale + '); >' + file + '</a><br>';

		}

		V3TO.threejsObjTab.innerHTML =
			'<p>' +
				'Sourced from <a href="http://mrdoob.github.io/three.js/examples/obj" target="_blank">threejs.org</a><br><br>' +
				'Many files have issues. Why?<br>' +
			'</p>' +
			'<p><a href=JavaScript:JAFO.openUrl("template-basic.html"); >Open new drawing</a></p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3TO.threejsObjTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3TO.files = [
		['Bird.js', 1,'Bird.js - broken'],
		['Qrcode.js', 1,'Qrcode.js - broken'],
		['Suzanne.js', 1,'Suzanne.js'],
		['terrain.js', 1,'terrain.js'],
		['WaltHeadLo.js', 1,'WaltHeadLo.js'],
		['blenderscene/scene.Cube.js', 1,'blenderscene/scene.Cube.js'],
		['blenderscene/scene.js', 1,'blenderscene/scene.js'],
		['blenderscene/scene.Monkey.js', 1,'blenderscene/scene.Monkey.js'],
		['blenderscene/scene.Plane.js', 1,'blenderscene/scene.Plane.js'],
		['box/box.js', 1,'box/box.js - broken'],
		['camaro/CamaroNoUv_bin.js', 1,'camaro/CamaroNoUv_bin.js'],
		['cubecolors/cubecolors.js', 1,'cubecolors/cubecolors.js'],
		['cubecolors/cube_fvc.js', 1,'cubecolors/cube_fvc.js'],
		['f50/F50NoUv_bin.js', 1,'f50/F50NoUv_bin.js'],
		['female02/Female02_bin.js', 1,'female02/Female02_bin.js'],
		['female02/Female02_slim.js', 1,'female02/Female02_slim.js'],
		['gallardo/GallardoNoUv_bin.js', 1,'gallardo/GallardoNoUv_bin.js'],
		['gallardo/parts/gallardo_body_bin.js', 1,'gallardo/parts/gallardo_body_bin.js'],
		['gallardo/parts/gallardo_wheel_bin.js', 1,'gallardo/parts/gallardo_wheel_bin.js'],
		['leeperrysmith/LeePerrySmith.js', 1,'leeperrysmith/LeePerrySmith.js'],
		['lightmap/lightmap.js', 1,'lightmap/lightmap.js'],
		['lucy/Lucy100k_bin.js', 1,'lucy/Lucy100k_bin.js'],
		['lucy/Lucy100k_slim.js','html','lucy/Lucy100k_slim.js'],
		['male02/Male02_bin.js', 1,'male02/Male02_bin.js'],
		['male02/Male02_dds.js', 1,'male02/Male02_dds.js'],
		['male02/Male02_slim.js', 1,'male02/Male02_slim.js'],
		['ninja/NinjaLo_bin.js', 1,'ninja/NinjaLo_bin.js'],
		['suzanne/suzanne.js', 1,'suzanne/suzanne.js'],
		['suzanne/suzanne.Monkey.003.js', 1,'suzanne/suzanne.Monkey.003.js'],
		['suzanne/suzanneHi.js', 1,'suzanne/suzanneHi.js'],
		['suzanne/suzanneHi.Monkey.003.js', 1,'suzanne/suzanneHi.Monkey.003.js'],
		['tree/tree.js', 1,'tree/tree.js'],
		['veyron/VeyronNoUv_bin.js', 1,'veyron/VeyronNoUv_bin.js'],
		['veyron/parts/veyron_body_bin.js', 1,'veyron/parts/veyron_body_bin.js'],
		['veyron/parts/veyron_wheel_bin.js', 1,'veyron/parts/veyron_wheel_bin.js'],
		['walt/WaltHead.obj', 1,'walt/WaltHead.obj'],
		['walt/WaltHead_bin.js', 1,'walt/WaltHead_bin.js'],
		['walt/WaltHead_slim.js', 1,'walt/WaltHead_slim.js']
	];

	V3TB.addThreejsHTMLTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.title = 'View things from the Three.js repo';
		tab.innerHTML =
			'<a id=tabThreeHTML ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> Three.js Example HTML...' +
			'</p></a>';
		tabThreeHTML.onclick = function() {JA.toggleTab( V3TB.ThreeHTMLTab ); };

		V3TB.ThreeHTMLTab = tab.appendChild( document.createElement( 'div' ) );
		V3TB.ThreeHTMLTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file;
		for ( var i = 0, len = V3TB.files.length; i < len; i++ ) {
			file = V3TB.files[ i ][ 0 ];
			fileList += '<a href=JavaScript:' +
				'JAFO.openUrl("' + V3TB.basepath + V3TB.files[ i ][0] + '"); >' + file + '</a><br>';

		}
		V3TB.ThreeHTMLTab.innerHTML =
			'<p>HTML sourced from: <b><a href="http://threejs.org" target="_blank">Three.js</a></b></p>' +
			'<p>Always overwrites current view</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3TB.ThreeHTMLTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3TB.files = [
		['canvas_ascii_effect.html',''],
		['canvas_camera_orthographic.html',''],
		['canvas_camera_orthographic2.html',''],
		['canvas_geometry_birds.html',''],
		['canvas_geometry_cube.html',''],
		['canvas_geometry_earth.html',''],
		['canvas_geometry_hierarchy.html',''],
		['canvas_geometry_nurbs.html',''],
		['canvas_geometry_panorama.html',''],
		['canvas_geometry_panorama_fisheye.html',''],
		['canvas_geometry_shapes.html',''],
		['canvas_geometry_terrain.html',''],
		['canvas_geometry_text.html',''],
		['canvas_interactive_cubes.html',''],
		['canvas_interactive_cubes_tween.html',''],
		['canvas_interactive_lines.html',''],
		['canvas_interactive_particles.html',''],
		['canvas_interactive_voxelpainter.html',''],
		['canvas_lights_pointlights.html',''],
		['canvas_lines.html',''],
		['canvas_lines_colors.html',''],
		['canvas_lines_colors_2d.html',''],
		['canvas_lines_dashed.html',''],
		['canvas_lines_sphere.html',''],
		['canvas_materials.html',''],
		['canvas_materials_depth.html',''],
		['canvas_materials_normal.html',''],
		['canvas_materials_reflection.html',''],
		['canvas_materials_video.html',''],
		['canvas_morphtargets_horse.html',''],
		['canvas_particles_floor.html',''],
		['canvas_particles_random.html',''],
		['canvas_particles_shapes.html',''],
		['canvas_particles_sprites.html',''],
		['canvas_particles_waves.html',''],
		['canvas_performance.html',''],
		['canvas_sandbox.html',''],
		['css3d_molecules.html',''],
		['css3d_panorama.html',''],
		['css3d_panorama_deviceorientation.html',''],
		['css3d_periodictable.html',''],
		['css3d_sandbox.html',''],
		['css3d_sprites.html',''],
		['css3d_youtube.html',''],
		['index.html',''],
		['misc_animation_keys.html',''],
		['misc_controls_deviceorientation.html',''],
		['misc_controls_fly.html',''],
		['misc_controls_oculusrift.html',''],
		['misc_controls_orbit.html',''],
		['misc_controls_path.html',''],
		['misc_controls_pointerlock.html',''],
		['misc_controls_trackball.html',''],
		['misc_controls_transform.html',''],
		['misc_geometry2_sandbox.html',''],
		['misc_lights_test.html',''],
		['misc_lookat.html',''],
		['misc_sound.html',''],
		['misc_ubiquity_test.html',''],
		['misc_ubiquity_test2.html',''],
		['misc_uv_tests.html',''],
		['raytracing_sandbox.html',''],
		['software_sandbox.html',''],
		['webgl3_performance.html',''],
		['webgl_animation_cloth.html',''],
		['webgl_animation_skinning_blending.html',''],
		['webgl_animation_skinning_morph.html',''],
		['webgl_buffergeometry.html',''],
		['webgl_buffergeometry_custom_attributes_particles.html',''],
		['webgl_buffergeometry_lines.html',''],
		['webgl_buffergeometry_lines_indexed.html',''],
		['webgl_buffergeometry_particles.html',''],
		['webgl_buffergeometry_rawshader.html',''],
		['webgl_buffergeometry_uint.html',''],
		['webgl_camera.html',''],
		['webgl_camera_logarithmicdepthbuffer.html',''],
		['webgl_custom_attributes.html',''],
		['webgl_custom_attributes_lines.html',''],
		['webgl_custom_attributes_particles.html',''],
		['webgl_custom_attributes_particles2.html',''],
		['webgl_custom_attributes_particles3.html',''],
		['webgl_effects_anaglyph.html',''],
		['webgl_effects_crosseyed.html',''],
		['webgl_effects_oculusrift.html',''],
		['webgl_effects_parallaxbarrier.html',''],
		['webgl_geometries.html',''],
		['webgl_geometries2.html',''],
		['webgl_geometry_colors.html',''],
		['webgl_geometry_colors_blender.html',''],
		['webgl_geometry_colors_lookuptable.html',''],
		['webgl_geometry_convex.html',''],
		['webgl_geometry_cube.html',''],
		['webgl_geometry_dynamic.html',''],
		['webgl_geometry_extrude_shapes.html',''],
		['webgl_geometry_extrude_shapes2.html',''],
		['webgl_geometry_extrude_splines.html',''],
		['webgl_geometry_extrude_uvs2.html',''],
		['webgl_geometry_hierarchy.html',''],
		['webgl_geometry_hierarchy2.html',''],
		['webgl_geometry_large_mesh.html',''],
		['webgl_geometry_minecraft.html',''],
		['webgl_geometry_minecraft_ao.html',''],
		['webgl_geometry_normals.html',''],
		['webgl_geometry_nurbs.html',''],
		['webgl_geometry_shapes.html',''],
		['webgl_geometry_subdivision.html',''],
		['webgl_geometry_terrain.html',''],
		['webgl_geometry_terrain_fog.html',''],
		['webgl_geometry_terrain_raycast.html',''],
		['webgl_geometry_tessellation.html',''],
		['webgl_geometry_text.html',''],
		['webgl_gpgpu_birds.html',''],
		['webgl_hdr.html',''],
		['webgl_helpers.html',''],
		['webgl_interactive_buffergeometry.html',''],
		['webgl_interactive_cubes.html',''],
		['webgl_interactive_cubes_gpu.html',''],
		['webgl_interactive_draggablecubes.html',''],
		['webgl_interactive_voxelpainter.html',''],
		['webgl_kinect.html',''],
		['webgl_lensflares.html',''],
		['webgl_lights_hemisphere.html',''],
		['webgl_lights_pointlights.html',''],
		['webgl_lights_pointlights2.html',''],
		['webgl_lines_colors.html',''],
		['webgl_lines_cubes.html',''],
		['webgl_lines_dashed.html',''],
		['webgl_lines_sphere.html',''],
		['webgl_lines_splines.html',''],
		['webgl_loader_assimp2json.html',''],
		['webgl_loader_awd.html',''],
		['webgl_loader_collada.html',''],
		['webgl_loader_collada_keyframe.html',''],
		['webgl_loader_collada_skinning.html',''],
		['webgl_loader_ctm.html',''],
		['webgl_loader_ctm_materials.html',''],
		['webgl_loader_gltf.html',''],
		['webgl_loader_json_blender.html',''],
		['webgl_loader_json_objconverter.html',''],
		['webgl_loader_obj.html',''],
		['webgl_loader_obj_mtl.html',''],
		['webgl_loader_pdb.html',''],
		['webgl_loader_ply.html',''],
		['webgl_loader_scene.html',''],
		['webgl_loader_scene_blender.html',''],
		['webgl_loader_stl.html',''],
		['webgl_loader_utf8.html',''],
		['webgl_loader_vrml.html',''],
		['webgl_loader_vtk.html',''],
		['webgl_lod.html',''],
		['webgl_marchingcubes.html',''],
		['webgl_materials.html',''],
		['webgl_materials2.html',''],
		['webgl_materials_blending.html',''],
		['webgl_materials_blending_custom.html',''],
		['webgl_materials_bumpmap.html',''],
		['webgl_materials_bumpmap_skin.html',''],
		['webgl_materials_cars.html',''],
		['webgl_materials_cars_camaro.html',''],
		['webgl_materials_cubemap.html',''],
		['webgl_materials_cubemap_balls_reflection.html',''],
		['webgl_materials_cubemap_balls_refraction.html',''],
		['webgl_materials_cubemap_dynamic.html',''],
		['webgl_materials_cubemap_dynamic2.html',''],
		['webgl_materials_cubemap_escher.html',''],
		['webgl_materials_cubemap_refraction.html',''],
		['webgl_materials_grass.html',''],
		['webgl_materials_lightmap.html',''],
		['webgl_materials_normalmap.html',''],
		['webgl_materials_normalmap2.html',''],
		['webgl_materials_shaders_fresnel.html',''],
		['webgl_materials_skin.html',''],
		['webgl_materials_texture_anisotropy.html',''],
		['webgl_materials_texture_compressed.html',''],
		['webgl_materials_texture_filters.html',''],
		['webgl_materials_texture_manualmipmap.html',''],
		['webgl_materials_video.html',''],
		['webgl_materials_wireframe.html',''],
		['webgl_mirror.html',''],
		['webgl_morphnormals.html',''],
		['webgl_morphtargets.html',''],
		['webgl_morphtargets_horse.html',''],
		['webgl_morphtargets_human.html',''],
		['webgl_morphtargets_md2.html',''],
		['webgl_morphtargets_md2_control.html',''],
		['webgl_multiple_canvases_circle.html',''],
		['webgl_multiple_canvases_complex.html',''],
		['webgl_multiple_canvases_grid.html',''],
		['webgl_multiple_views.html',''],
		['webgl_nearestneighbour.html',''],
		['webgl_octree.html',''],
		['webgl_octree_raycasting.html',''],
		['webgl_panorama_equirectangular.html',''],
		['webgl_particles_billboards.html',''],
		['webgl_particles_billboards_colors.html',''],
		['webgl_particles_dynamic.html',''],
		['webgl_particles_random.html',''],
		['webgl_particles_shapes.html',''],
		['webgl_particles_sprites.html',''],
		['webgl_performance.html',''],
		['webgl_performance_doublesided.html',''],
		['webgl_performance_static.html',''],
		['webgl_postprocessing.html',''],
		['webgl_postprocessing2.html',''],
		['webgl_postprocessing_advanced.html',''],
		['webgl_postprocessing_crossfade.html',''],
		['webgl_postprocessing_dof.html',''],
		['webgl_postprocessing_dof2.html',''],
		['webgl_postprocessing_godrays.html',''],
		['webgl_rtt.html',''],
		['webgl_sandbox.html',''],
		['webgl_shader.html',''],
		['webgl_shader2.html',''],
		['webgl_shader_lava.html',''],
		['webgl_shaders_ocean.html',''],
		['webgl_shaders_ocean2.html',''],
		['webgl_shading_physical.html',''],
		['webgl_shadowmap.html',''],
		['webgl_shadowmap_performance.html',''],
		['webgl_sprites.html',''],
		['webgl_terrain_dynamic.html',''],
		['webgl_test_memory.html',''],
		['webgl_test_memory2.html',''],
		['webgl_trails.html',''],
		['webgldeferred_animation.html',''],
		['webgldeferred_arealights.html',''],
		['webgldeferred_pointlights.html','']
	]
