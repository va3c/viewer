	V3PL = {};

// defaults & values all lower case to make editing the URL by hand easier 
	V3PL.defaults = {
		camx: 15000,
		camy: 15000,
		camz: 15000,
		files: 'replace',
		posx: 0,
		posy: 0,
		posz: 0,
		rotx: 0,
		roty: 0,
		rotz: 0,
		sclx: 1,
		scly: 1,
		sclz: 1,
		tarx: 0,
		tary: 0,
		tarz: 0,
		url: ''
	};

	V3PL.values = {}; // current or runtime updates


	V3PL.addPermalinks = function () {
		var permalinksButton = V3AA.menu.appendChild( document.createElement( 'div' ) );

		permalinksButton.innerHTML =
			'<p class=button >' +
				'<a href=# onclick=V3AA.openDialog(V3PL.permalinks);V3PL.permalinks.innerHTML=V3PL.refreshParameters(); ><i class="fa fa-link"></i> Permalinks...</a>' +
			'</p>'; 

		V3PL.permalinks = container.appendChild( document.createElement( 'div' ) );
		V3PL.permalinks.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 0 20px 20px; ' +
			'bottom: 0; height: 530px; left: 0; margin: auto; position: absolute; right: 0; top: 0; width: 450px; ';

		V3PL.permalinks.innerHTML = V3PL.refreshParameters();
	};

	V3PL.refreshParameters = function () {

// remember: no spaces in the JS below or add quotes
		V3PL.camX = parseInt( camera.position.x, 10 );
		V3PL.camY = parseInt( camera.position.y, 10 );
		V3PL.camZ = parseInt( camera.position.z, 10 );

		V3PL.tarX = parseInt( controls.target.x, 10 );
		V3PL.tarY = parseInt( controls.target.y, 10 );
		V3PL.tarZ = parseInt( controls.target.z, 10 );

		var txt =
			'<div>' +
				'<h3><i class="fa fa-link"></i> Permalinks</h3>' +

				'<p><small><i><a href="http://en.wikipedia.org/wiki/Permalink" target="_blank">Permalinks</a> enable you to create a scene and save it as a link you can share..</i></small></p>' +

				'<input type=radio name=files id=radFilesReplace onclick=V3PL.files=this.value value="replace" checked=' + ( V3PL.files === 'replace' ) + ' >Replace - new file erases current scene<br>' +
				'<input type=radio name=files id=radFilesAppend onclick=V3PL.files=this.value value="append" >Append - new file added to current scene<br>' +

				'<h4>Object Parameters</h4>' +

				'<table>' +
				'<tr><td>Position: </td><td>X <input type=text class=xyz value=' + V3PL.posX + ' onchange=V3PL.posX=parseInt(this.value,10); ></td>' +
				'<td>Y <input type=text class=xyz value=' + V3PL.posY + ' onchange=V3PL.posY=parseInt(this.value,10); ></td>'  +
				'<td>Z <input type=text class=xyz value=' + V3PL.posZ + ' onchange=V3PL.posZ=parseInt(this.value,10); ></td></tr>' +
				'<tr><td>Rotation: </td><td>X <input type=text class=xyz value=' + (V3PL.rotX * r2d) + ' onchange=V3PL.rotX=this.value*d2r; ></td>' +
				'<td>Y <input type=text class=xyz value=' + (V3PL.rotY * r2d) + ' onchange=V3PL.rotY=this.value*d2r; ></td>' +
				'<td>Z <input type=text class=xyz value=' + (V3PL.rotZ * r2d)+ ' onchange=V3PL.rotZ=this.value*d2r; ></td></tr>' +
				'<tr><td>Scale: </td><td>X <input type=text class=xyz value=' + V3PL.sclX + ' onchange=V3PL.sclX=parseInt(this.value,10); ></td>' +
				'<td>Y <input type=text class=xyz value=' + V3PL.sclY + ' onchange=V3PL.sclY=parseInt(this.value,10); ></td>' +
				'<td>Z <input type=text class=xyz value=' + V3PL.sclZ + ' onchange=V3PL.sclZ=parseInt(this.value,10); ></td></tr>' +
				'</table>' +

				'<h4>Camera Parameters</h4>' +

				'<table>' +
				'<tr><td>Position: </td><td>X <input type=text class=xyz value=' + V3PL.camX + ' onchange=V3PL.posX=parseInt(this.value,10); ></td>' +
				'<td>Y <input type=text class=xyz value=' + V3PL.camY + ' onchange=V3PL.posY=parseInt(this.value,10); ></td>'  +
				'<td>Z <input type=text class=xyz value=' + V3PL.camZ + ' onchange=V3PL.posZ=parseInt(this.value,10); ></td></tr>' +
				'<tr><td>Target: </td><td>X <input type=text class=xyz value=' + V3PL.tarX + ' onchange=V3PL.rotX=parseInt(this.value,10); ></td>' +
				'<td>Y <input type=text class=xyz value=' + V3PL.tarY + ' onchange=V3PL.rotY=parseInt(this.value,10); ></td>' +
				'<td>Z <input type=text class=xyz value=' + V3PL.tarZ + ' onchange=V3PL.rotZ=parseInt(this.value,10); ></td></tr>' +
				'</table>' +

				'<h4>JSON URL</h4>' +
				'<input type=text onchange=V3PL.url=this.value; style=width:450px; value=' + V3PL.url + ' ></br>' +

				'<p><a href=JavaScript:V3PL.setPermalink(); >Set Permalink</a></p>' +
				'<p><a href=JavaScript:V3PL.clearPermalink(); >Clear Permalink</a></p>' +

				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Close</a> ' +
				'</p>' +
			'</div>';
		return txt;
	};

	V3PL.parsePermalink = function () {
		var item, index;
		var hashes = location.hash.split('#');

// if the hash exits set the appropriate value
		for (var i = 1, len = hashes.length; i < len; i++) {
			item = hashes[i].split('=');
			index = item[0];
			if ( V3PL.defaults[ index ] !== undefined ){
				V3PL.values[ index ] = item;
			}
		}

		V3PL.camX = V3PL.values.camx ? parseFloat( V3PL.values.camx[1] ) : V3PL.defaults.camx;
		V3PL.camY = V3PL.values.camy ? parseFloat( V3PL.values.camy[1] ) : V3PL.defaults.camy;
		V3PL.camZ = V3PL.values.camz ? parseFloat( V3PL.values.camz[1] ) : V3PL.defaults.camz;

		V3PL.files = V3PL.values.files ? V3PL.values.files[1] : V3PL.defaults.files;

		V3PL.posX = V3PL.values.posx ? parseFloat( V3PL.values.posx[1] ) : V3PL.defaults.posx;
		V3PL.posY = V3PL.values.posy ? parseFloat( V3PL.values.posy[1] ) : V3PL.defaults.posy;
		V3PL.posZ = V3PL.values.posz ? parseFloat( V3PL.values.posz[1] ) : V3PL.defaults.posz;

		V3PL.rotX = V3PL.values.rotx ? parseFloat( V3PL.values.rotx[1] ) : V3PL.defaults.rotx;
		V3PL.rotY = V3PL.values.roty ? parseFloat( V3PL.values.roty[1] ) : V3PL.defaults.roty;
		V3PL.rotZ = V3PL.values.rotz ? parseFloat( V3PL.values.rotz[1] ) : V3PL.defaults.rotz;

		V3PL.sclX = V3PL.values.sclx ? parseFloat( V3PL.values.sclx[1] ) : V3PL.defaults.sclx;
		V3PL.sclY = V3PL.values.scly ? parseFloat( V3PL.values.scly[1] ) : V3PL.defaults.scly;
		V3PL.sclZ = V3PL.values.sclz ? parseFloat( V3PL.values.sclz[1] ) : V3PL.defaults.sclz;

		V3PL.tarX = V3PL.values.tarx ? parseFloat( V3PL.values.tarx[1] ) : V3PL.defaults.tarx;
		V3PL.tarY = V3PL.values.tary ? parseFloat( V3PL.values.tary[1] ) : V3PL.defaults.tary;
		V3PL.tarZ = V3PL.values.tarz ? parseFloat( V3PL.values.tarz[1] ) : V3PL.defaults.tarz;

		V3PL.url = V3PL.values.url ? V3PL.values.url[1] : V3PL.defaults.url;
	};

	V3PL.setPermalink = function() {
		var txt = '';
// in alphabetical order. Only add values that are not defaults
		if ( V3PL.camX && V3PL.camX !== V3PL.defaults.camx ) txt += '#camx=' + parseInt( V3PL.camX, 10 );
		if ( V3PL.camY && V3PL.camY !== V3PL.defaults.camy ) txt += '#camy=' + parseInt( V3PL.camY, 10 );
		if ( V3PL.camZ && V3PL.camZ !== V3PL.defaults.camz ) txt += '#camz=' + parseInt( V3PL.camZ, 10 );

		if ( V3PL.files && V3PL.files !== V3PL.defaults.files ) txt += '#files=' + V3PL.files;

		if ( V3PL.posX && V3PL.posX !== V3PL.defaults.posx ) txt += '#posx=' + parseInt( V3PL.posX, 10 );
		if ( V3PL.posY && V3PL.posY !== V3PL.defaults.posy ) txt += '#posy=' + parseInt( V3PL.posY, 10 );
		if ( V3PL.posZ && V3PL.posZ !== V3PL.defaults.posz ) txt += '#posz=' + parseInt( V3PL.posZ, 10 );

		if ( V3PL.rotX && V3PL.rotX !== V3PL.defaults.rotx ) txt += '#rotx=' + parseInt( V3PL.rotX, 10 );
		if ( V3PL.rotY && V3PL.rotY !== V3PL.defaults.roty ) txt += '#roty=' + parseInt( V3PL.rotY, 10 );
		if ( V3PL.rotZ && V3PL.rotZ !== V3PL.defaults.rotz ) txt += '#rotz=' + parseInt( V3PL.rotZ, 10 );

		if ( V3PL.sclX && V3PL.sclX !== V3PL.defaults.sclx ) txt += '#sclx=' + parseInt( V3PL.sclX, 10 );
		if ( V3PL.sclY && V3PL.sclY !== V3PL.defaults.scly ) txt += '#scly=' + parseInt( V3PL.sclY, 10 );
		if ( V3PL.sclZ && V3PL.sclZ !== V3PL.defaults.sclz ) txt += '#sclz=' + parseInt( V3PL.sclZ, 10 );

		if ( V3PL.tarX && V3PL.tarX !== V3PL.defaults.tarx ) txt += '#tarx=' + parseInt( V3PL.tarX, 10 );
		if ( V3PL.tarY && V3PL.tarY !== V3PL.defaults.tary ) txt += '#tary=' + parseInt( V3PL.tarY, 10 );
		if ( V3PL.tarZ && V3PL.tarZ !== V3PL.defaults.tarz ) txt += '#tarz=' + parseInt( V3PL.tarZ, 10 );

		if ( V3PL.url && V3PL.url !== V3PL.defaults.url ) txt += '#url=' + V3PL.url;

		window.location.hash = txt;
	};

	V3PL.clearPermalink = function () {
		window.history.pushState( '', '', window.location.pathname);
	};
