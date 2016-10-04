fmaService.$inject = ['$http'];
function fmaService($http) {
	const getTracks = () => $http.get('https://freemusicarchive.org/recent.json')
		.then((result) => result.data.aTracks.map(({ track_id, track_listen_url, track_title, artist_name, album_image_file, track_image_file}) => ({
			id: track_id,
			audioUrl: track_listen_url,
			trackName: track_title,
			artistName: artist_name,
			trackImage: `//res.cloudinary.com/dmc5off8m/image/fetch/w_500,h_500/${track_image_file || album_image_file}?${track_id}`
		})));

	return {
		getTracks
	};
}

export default fmaService;