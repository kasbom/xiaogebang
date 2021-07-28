/**
* 根据一个经纬度及距离角度，算出另外一个经纬度
* @param {*} lng 经度 113.3960698
* @param {*} lat 纬度 22.941386
* @param {*} brng 方位角 45 ---- 正北方：000°或360° 正东方：090° 正南方：180° 正西方：270°
* @param {*} dist 90000距离(米)
*
*/
let mapNumberUtil = {
	rad(d) {
		return d * Math.PI / 180.0
	},
	deg() {}
}

function getLonAndLat(lng, lat, brng, dist) {
	//大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
	let a = 6378137;
	let b = 6356752.3142;
	let f = 1 / 298.257223563;

	let lon1 = lng * 1;
	let lat1 = lat * 1;
	let s = dist;
	let alpha1 = mapNumberUtil.rad(brng);
	let sinAlpha1 = Math.sin(alpha1);
	let cosAlpha1 = Math.cos(alpha1);

	let tanU1 = (1 - f) * Math.tan(mapNumberUtil.rad(lat1));
	let cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)),
		sinU1 = tanU1 * cosU1;
	let sigma1 = Math.atan2(tanU1, cosAlpha1);
	let sinAlpha = cosU1 * sinAlpha1;
	let cosSqAlpha = 1 - sinAlpha * sinAlpha;
	let uSq = cosSqAlpha * (a * a - b * b) / (b * b);
	let A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
	let B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

	let sigma = s / (b * A),
		sigmaP = 2 * Math.PI;
	while (Math.abs(sigma - sigmaP) > 1e-12) {
		let cos2SigmaM = Math.cos(2 * sigma1 + sigma);
		let sinSigma = Math.sin(sigma);
		let cosSigma = Math.cos(sigma);
		let deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
			B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
		sigmaP = sigma;
		sigma = s / (b * A) + deltaSigma;
	}

	let tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
	let lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
		(1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
	let lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
	let C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
	let L = lambda - (1 - C) * f * sinAlpha *
		(sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

	let revAz = Math.atan2(sinAlpha, -tmp); // final bearing

	let lngLatObj = {
		lng: lon1 + mapNumberUtil.deg(L),
		lat: mapNumberUtil.deg(lat2)
	}
	return lngLatObj;
}

export default getLonAndLat
