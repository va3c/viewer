
	var V3TM = {} || V3TM;
	var V3TB = {} || V3TB;
	var V3TO = {} || V3TO;

	V3TM.basepath = 'http://va3c.github.io/three.js/examples/models/';
//	V3TM.basepath = '../../../../three.js/examples/models/';

	V3TB.basepath = 'http://va3c.github.io/three.js/examples/models/';
//	V3TB.basepath = '../../../../three.js/examples/';

	V3TO.basepath = 'http://va3c.github.io/three.js/examples/obj/';
//	V3TO.basepath = '../../../../three.js/examples/obj/';

	V3TM.addThreejsModelsTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a href=# id=tabThreejsModels ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> Three.js Example Models...' +
			'</p></a>';
		tabThreejsModels.onclick = function() {JA.toggleDialogs(V3TM.threejsModelsTab); };

		V3TM.threejsModelsTab = tab.appendChild( document.createElement( 'div' ) );
		V3TM.threejsModelsTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, fname;
		for ( var i = 0, len = V3TM.files.length; i < len; i++ ) {
			file = V3TM.files[ i ][ 0 ];
			boilerplate = V3TM.files[ i ][ 1 ]; 
			fileList += '<a href=JavaScript:V3LI.updateIframe(V3TM.files,' + i + ',V3TM.basepath,"' + V3TM.files[ i ][0] + '","' + boilerplate + '"); >' + file + '</a><br>';
		}
//console.log( fileList )
		V3TM.threejsModelsTab.innerHTML =
			'<p>' +
				'Sourced from <a href="http://mrdoob.github.io/three.js/examples/models" target="_blank">threejs.org</a><br><br>' +
				'Currently supports: .dae, .js, json, .stl, .vtk, .wrl. Others<br>' +
			'</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3TM.threejsModelsTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3TM.files = [
		['animated/elderlyWalk.js','boilerplate-va3c-small.html'],
		['animated/flamingo.js',''],
		['animated/horse.js',''],
		['animated/parrot.js',''],
		['animated/sittingBox.js','boilerplate-va3c-small.html'],
		['animated/stork.js',''],
		['animated/monster/monster.js','boilerplate-va3c-big.html'],
		['animated/ogro/ogro-light.js',''],
		['animated/ogro/weapon-light.js',''],
		['animated/ratamahatta/ratamahatta.js',''],
		['animated/ratamahatta/weapon.js',''],
		['animated/ratamahatta/w_bfg.js',''],
		['animated/ratamahatta/w_blaster.js',''],
		['animated/ratamahatta/w_chaingun.js',''],
		['animated/ratamahatta/w_glauncher.js',''],
		['animated/ratamahatta/w_hyperblaster.js',''],
		['animated/ratamahatta/w_machinegun.js',''],
		['animated/ratamahatta/w_railgun.js',''],
		['animated/ratamahatta/w_rlauncher.js',''],
		['animated/ratamahatta/w_shotgun.js',''],
		['animated/ratamahatta/w_sshotgun.js',''],
		['animated/ratamahatta/src/ratamahatta.md2',''],
		['animated/ratamahatta/src/weapon.md2',''],
		['animated/ratamahatta/src/w_bfg.md2',''],
		['animated/ratamahatta/src/w_blaster.md2',''],
		['animated/ratamahatta/src/w_chaingun.MD2',''],
		['animated/ratamahatta/src/w_glauncher.md2',''],
		['animated/ratamahatta/src/w_hyperblaster.md2',''],
		['animated/ratamahatta/src/w_machinegun.md2',''],
		['animated/ratamahatta/src/w_railgun.md2',''],
		['animated/ratamahatta/src/w_rlauncher.md2',''],
		['animated/ratamahatta/src/w_shotgun.md2',''],
		['animated/ratamahatta/src/w_sshotgun.md2',''],
		['assimp/interior/interior.3ds',''],
		['assimp/interior/interior.3ds.json',''],
		['assimp/jeep/jeep1.ms3d',''],
		['assimp/jeep/jeep1.ms3d.json',''],
		['awd/simple/simple.awd','boilerplate-va3c-small.html'],
		['collada/avatar.dae','boilerplate-va3c-small.html'],
		['collada/multimaterial.dae',''],
		['collada/monster/monster.dae',''],
		['collada/pump/pump.dae',''],
		['ctm/ben.ctm',''],
		['ctm/hand.ctm',''],
		['ctm/LeePerry.ctm',''],
		['ctm/WaltHead.ctm',''],
		['ctm/camaro/camaro.ctm',''],
		['ctm/camaro/camaro.js',''],
		['gltf/duck/duck.dae','boilerplate-va3c-small.html'],
		['gltf/duck/duck.json',''],
		['gltf/duck/duck0FS.glsl',''],
		['gltf/duck/duck0VS.glsl',''],
		['gltf/monster/monster.dae',''],
		['gltf/monster/monster.json',''],
		['gltf/monster/monster0FS.glsl',''],
		['gltf/monster/monster0VS.glsl',''],
		['molecules/Al2O3.pdb',''],
		['molecules/aspirin.pdb',''],
		['molecules/buckyball.pdb',''],
		['molecules/caf2.pdb',''],
		['molecules/caffeine.pdb',''],
		['molecules/cholesterol.pdb',''],
		['molecules/cocaine.pdb',''],
		['molecules/cu.pdb',''],
		['molecules/cubane.pdb',''],
		['molecules/diamond.pdb',''],
		['molecules/ethanol.pdb',''],
		['molecules/glucose.pdb',''],
		['molecules/graphite.pdb',''],
		['molecules/lsd.pdb',''],
		['molecules/lycopene.pdb',''],
		['molecules/nacl.pdb',''],
		['molecules/nicotine.pdb',''],
		['molecules/ybco.pdb',''],
		['ply/ascii/dolphins.ply',''],
		['ply/ascii/dolphins_colored.ply',''],
		['ply/binary/dolphins_be.ply',''],
		['ply/binary/dolphins_le.ply',''],
		['skinned/human_walk_0_female.js','boilerplate-va3c-small.html'],
		['skinned/knight.js','boilerplate-va3c-small.html'],
		['skinned/UCS_config.json',''],
		['skinned/marine/m4.js',''],
		['skinned/marine/marine.js',''],
		['skinned/marine/marine_anims.js',''],
		['skinned/marine/marine_ikrig.js',''],
		['skinned/UCS/umich_ucs.js',''],
		['stl/ascii/pr2_head\_pan.stl','boilerplate-va3c-small.html'],
		['stl/ascii/pr2_head\_tilt.stl','boilerplate-va3c-small.html'],
		['stl/ascii/slotted_\disk.stl','boilerplate-va3c-small.html'],
		['stl/binary/pr2_head\_pan.stl','boilerplate-va3c-small.html'],
		['stl/binary/pr2_head\_tilt.stl','boilerplate-va3c-small.html'],
		['utf8/ben.js',''],
		['utf8/ben.utf8',''],
		['utf8/ben_dds.js',''],
		['utf8/hand.js',''],
		['utf8/hand.utf8',''],
		['utf8/WaltHi.js',''],
		['utf8/WaltHi.utf8',''],
		['utf8/dds/James_Body_Lores.dds',''],
		['utf8/dds/James_EyeLashBotTran.dds',''],
		['utf8/dds/James_EyeLashTopTran.dds',''],
		['utf8/dds/James_Eye_Green.dds',''],
		['utf8/dds/James_Eye_Inner_Green.dds',''],
		['utf8/dds/James_Face_Color\_Hair\_Lores.dds',''],
		['utf8/dds/James_Mouth_Gum_Lores.dds',''],
		['utf8/dds/James_Tongue_Lores.dds',''],
		['utf8/dds/MCasShoe1TEX_Lores.dds',''],
		['utf8/dds/MJeans1TEX_Lores.dds',''],
		['utf8/dds/MTshirt3TEX_Lores.dds',''],
		['utf8/dds/Nail_Hand_01_Lores.dds',''],
		['vrml/house.wrl','boilerplate-va3c-small.html'],
		['vrml/simple.wrl','boilerplate-va3c-small.html'],
		['vtk/bunny.vtk','boilerplate-va3c-small.html']
	];

	V3TO.addThreejsObjTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a href=# id=tabThreejsObj ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> Three.js Example Objects...' +
			'</p></a>';
		tabThreejsObj.onclick = function() {JA.toggleDialogs(V3TO.threejsObjTab); };

		V3TO.threejsObjTab = tab.appendChild( document.createElement( 'div' ) );
		V3TO.threejsObjTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, fname;
		for ( var i = 0, len = V3TO.files.length; i < len; i++ ) {
			file = V3TO.files[ i ][ 0 ];
			boilerplate = V3TO.files[ i ][ 1 ];
			fileList += '<a href=JavaScript:V3LI.updateIframe(V3TO.files,' + i + ',V3TO.basepath,"' + V3TO.files[ i ][0] + '","' + boilerplate + '"); >' + file + '</a><br>';
		}
//console.log( fileList )
		V3TO.threejsObjTab.innerHTML =
			'<p>' +
				'Sourced from <a href="http://mrdoob.github.io/three.js/examples/obj" target="_blank">threejs.org</a><br><br>' +
				'Many files have issues. Why?<br>' +
			'</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3TO.threejsObjTab); ); >Close</a> ' +
			'</p>' +
		'';

	};
	V3TO.files = [
		['Bird.js','','Bird.js - broken'],
		['Qrcode.js','','Qrcode.js - broken'],
		['Suzanne.js','boilerplate-va3c-small.html','Suzanne.js'],
		['terrain.js','','terrain.js'],
		['WaltHeadLo.js','','WaltHeadLo.js'],
		['blenderscene/scene.Cube.js','boilerplate-va3c-small.html','blenderscene/scene.Cube.js'],
		['blenderscene/scene.js','boilerplate-va3c-small.html','blenderscene/scene.js'],
		['blenderscene/scene.Monkey.js','boilerplate-va3c-small.html','blenderscene/scene.Monkey.js'],
		['blenderscene/scene.Plane.js','boilerplate-va3c-small.html','blenderscene/scene.Plane.js'],
		['box/box.js','','box/box.js - broken'],
		['camaro/CamaroNoUv_bin.js','','camaro/CamaroNoUv_bin.js'],
		['cubecolors/cubecolors.js','boilerplate-va3c-small.html','cubecolors/cubecolors.js'],
		['cubecolors/cube_fvc.js','boilerplate-va3c-small.html','cubecolors/cube_fvc.js'],
		['f50/F50NoUv_bin.js','','f50/F50NoUv_bin.js'],
		['female02/Female02_bin.js','','female02/Female02_bin.js'],
		['female02/Female02_slim.js','','female02/Female02_slim.js'],
		['gallardo/GallardoNoUv_bin.js','','gallardo/GallardoNoUv_bin.js'],
		['gallardo/parts/gallardo_body_bin.js','','gallardo/parts/gallardo_body_bin.js'],
		['gallardo/parts/gallardo_wheel_bin.js','','gallardo/parts/gallardo_wheel_bin.js'],
		['leeperrysmith/LeePerrySmith.js','boilerplate-va3c-small.html','leeperrysmith/LeePerrySmith.js'],
		['lightmap/lightmap.js','boilerplate-va3c-small.html','lightmap/lightmap.js'],
		['lucy/Lucy100k_bin.js','','lucy/Lucy100k_bin.js'],
		['lucy/Lucy100k_slim.js','html','lucy/Lucy100k_slim.js'],
		['male02/Male02_bin.js','','male02/Male02_bin.js'],
		['male02/Male02_dds.js','','male02/Male02_dds.js'],
		['male02/Male02_slim.js','','male02/Male02_slim.js'],
		['ninja/NinjaLo_bin.js','','ninja/NinjaLo_bin.js'],
		['suzanne/suzanne.js','','suzanne/suzanne.js'],
		['suzanne/suzanne.Monkey.003.js','','suzanne/suzanne.Monkey.003.js'],
		['suzanne/suzanneHi.js','','suzanne/suzanneHi.js'],
		['suzanne/suzanneHi.Monkey.003.js','','suzanne/suzanneHi.Monkey.003.js'],
		['tree/tree.js','boilerplate-va3c-small.html','tree/tree.js'],
		['veyron/VeyronNoUv_bin.js','','veyron/VeyronNoUv_bin.js'],
		['veyron/parts/veyron_body_bin.js','','veyron/parts/veyron_body_bin.js'],
		['veyron/parts/veyron_wheel_bin.js','','veyron/parts/veyron_wheel_bin.js'],
		['walt/WaltHead.obj','','walt/WaltHead.obj'],
		['walt/WaltHead_bin.js','','walt/WaltHead_bin.js'],
		['walt/WaltHead_slim.js','','walt/WaltHead_slim.js'],
	];

	V3TB.addThreejsHTMLTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'View things from the Three.js repo';
		tab.innerHTML =
			'<a href=# id=tabThreeHTML ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> Three.js Example HTML...' +
			'</p></a>';
		tabThreeHTML.onclick = function() {JA.toggleTab( V3TB.ThreeHTMLTab ); };

		V3TB.ThreeHTMLTab = tab.appendChild( document.createElement( 'div' ) );
		V3TB.ThreeHTMLTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file;
		for ( var i = 0, len = V3TB.files.length; i < len; i++ ) {
			file = V3TB.files[ i ][ 0 ];
			fileList += '<a href=JavaScript:openOver.checked=true;' +
				'V3LI.updateIframe(V3TB.files,' + i + ',V3TB.basepath,"' + V3TB.files[ i ][0] + '",""); >' + file + '</a><br>';
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
