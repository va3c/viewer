	function sunPosition (year, month, day, hour, minutes, sec, lat, long) {

	hour = typeof hour !== 'undefined' ? hour : 12;
	minutes = typeof minutes !== 'undefined' ? minutes : 0;
	sec = typeof sec !== 'undefined' ? sec : 0;
	lat = typeof lat !== 'undefined' ? lat : 46.5;
	long = typeof long !== 'undefined' ? long : 6.5;
	PI = Math.PI;
	pi = Math.PI;
	twopi = 2 *  pi;
	deg2rad = (PI * 2) / 360;



    // The input to the Atronomer's almanach is the difference between
    // the Julian date and JD 2451545.0 (noon, 1 January 2000)
    Date.prototype.getJulian = function() {
		return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
	}

    today = new Date(year, month, day, hour, minutes, sec, 0);
	var jd = today.getJulian(); //get Julian counterpart 
    time = jd - 51545;
//    console.log(jd);

    // Ecliptic coordinates

    // Mean longitude
    mnlong = 280.460 + 0.9856474 * time;
    mnlong = mnlong % 360;
    if (mnlong < 0){mnlong = mnlong+360;}

    // Mean anomaly
    mnanom = 357.528 + 0.9856003 * time;
    mnanom = mnanom % 360;
    if (mnanom < 0){mnanom = mnanom+360;}
    //mnanom[mnanom < 0] = mnanom[mnanom < 0] + 360
    mnanom = mnanom * deg2rad

    // Ecliptic longitude and obliquity of ecliptic
    eclong = mnlong + 1.915 * Math.sin(mnanom) + 0.020 * Math.sin(2 * mnanom);
    eclong = eclong % 360;
    if (eclong < 0){eclong = eclong+360;}
    //eclong[eclong < 0] = eclong[eclong < 0] + 360
    oblqec = 23.439 - 0.0000004 * time;
    eclong = eclong * deg2rad;
    oblqec = oblqec * deg2rad;

    // Celestial coordinates
    // Right ascension and declination
    num = Math.cos(oblqec) * Math.sin(eclong);
    den = Math.cos(eclong);
    ra = Math.atan(num / den);
    if(den<0) {ra = ra+pi;}
    //ra[den < 0] = ra[den < 0] + pi
    if(den>=0&&num<0) {ra = ra+twopi;}
    //ra[den >= 0 & num < 0] = ra[den >= 0 & num < 0] + twopi
    dec = Math.asin(Math.sin(oblqec) * Math.sin(eclong));

    // Local coordinates
    // Greenwich mean sidereal time
    gmst = 6.697375 + 0.0657098242 * time + hour;
    gmst = gmst % 24;
    if (gmst<0) {gmst = gmst +24;}
    //gmst[gmst < 0] = gmst[gmst < 0] + 24;

    // Local mean sidereal time
    lmst = gmst + long / 15;
    lmst = lmst % 24;
    if (lmst < 0) {lmst = lmst + 24;}
    //lmst[lmst < 0] = lmst[lmst < 0] + 24.
    lmst = lmst * 15 * deg2rad;

    // Hour angle
    ha = lmst - ra;
    if (ha < -pi) {ha = ha +twopi;}
    //ha[ha < -pi] = ha[ha < -pi] + twopi
    if (ha > pi) {ha = ha - twopi;}
    //ha[ha > pi] = ha[ha > pi] - twopi

    // Latitude to radians
    lat = lat * deg2rad;

    // Azimuth and elevation
    el = Math.asin(Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha));
    az = Math.asin(-Math.cos(dec) * Math.sin(ha) / Math.cos(el));

    // For logic and names, see Spencer, J.W. 1989. Solar Energy. 42(4):353
    Math.cosAzPos = (0 <= Math.sin(dec) - Math.sin(el) * Math.sin(lat));
    Math.sinAzNeg = (Math.sin(az) < 0);
    if (Math.cosAzPos && Math.sinAzNeg) {az = az +twopi;}
    //az[Math.cosAzPos & Math.sinAzNeg] = az[Math.cosAzPos & Math.sinAzNeg] + twopi
    if (!Math.cosAzPos){az = pi - az;}
    //az[!Math.cosAzPos] = pi - az[!Math.cosAzPos]

    // if (0 < Math.sin(dec) - Math.sin(el) * Math.sin(lat)) {
    //     if(Math.sin(az) < 0) {az = az + twopi;}
    // } else {
    //     az = pi - az;
    // }


    el = el / deg2rad;
    az = az / deg2rad;
    lat = lat / deg2rad;

    //return(list(elevation=el, azimuth=az))
    return [el, az];
}

//sunPosition(2012, 06, 23);
// console.log(sunPosition(2012, 06, 23));
