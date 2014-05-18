//to go in getComboA instead of updatelights
var temp_latlon = sunPosition( 2014, 5, 18, 22, 30, 00, latlong[0], latlong[1] );
var temp_pos = convertPosition(  temp_latlon[0], temp_latlon[1], 10000 );
//light.position = pos;
new TWEEN.Tween(light.position ).to( {
x: pos.x,
y: pos.y,
z: pos.z }, 2000 )
.easing( TWEEN.Easing.Elastic.Out).start();
