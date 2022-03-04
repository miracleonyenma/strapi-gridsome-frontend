// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require("axios");

module.exports = function(api) {
	api.loadSource(async (actions) => {
		console.log("--> actions", actions);
		console.log("--> actions", process.env.STRAPI_API_URL);
		let data;
		try {
			data = (await axios.get(`${process.env.STRAPI_API_URL}/strapi-courses?populate=*`)).data;
		} catch (error) {
			console.log("--------------> ERROR", error);
		}
		console.log("--------------> DATA", data);

		const collection = actions.addCollection({
			typeName: "Course",
			path: "/course/:id",
		});

		for (const course of data.data) {
			console.log(course);
			collection.addNode({
				id: course.id,
				path: "/course/" + course.id,
				long_description: course.attributes.long_description,
				title: course.attributes.course_title,
				description: course.attributes.short_description,
				price: course.attributes.price,
				course_image: course.attributes.course_image,
				course_video: course.attributes.course_video,
			});
		}
	});
};
