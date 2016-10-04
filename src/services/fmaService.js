fmaService.$inject = ['$http', 'config'];
function fmaService($http, config) {
	const getTracks = () => $http.get(config.fmaUrl)
		.then((result) => result.data.aTracks.map(({ track_id, track_listen_url, track_title, artist_name, album_image_file, track_image_file}) => ({
			id: track_id,
			audioUrl: track_listen_url,
			trackName: track_title,
			artistName: artist_name,
			trackImage: `${config.imageLoadingUrl}${track_image_file || album_image_file}?${track_id}`
		})));

	return {
		getTracks
	};
}

export default fmaService;