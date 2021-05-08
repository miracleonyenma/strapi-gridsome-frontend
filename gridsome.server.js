// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {

    api.loadSource(async actions => {
      const { data } = await axios.get(`${process.env.STRAPI_URL}/learning-platforms/`)

      const collection = actions.addCollection({
        typeName: 'Course',
        path: '/course/:id'
      })

      for(const course of data) {
        collection.addNode({
          id: course.id,
          path: '/course/' + course.id,
          long_description: course.long_description,
          title: course.title,
          description: course.description,
          price: course.price,
          course_image: course.course_image,
          course_video: course.course_video
        })
      }
    })


}
