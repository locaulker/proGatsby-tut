const path = require('path')

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions // createPage = actions.createPage

	return new Promise((resolve, reject) => {
		graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              excerpt
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `).then((results) => {
			results.data.allMarkdownRemark.edges.forEach(({ node }) => {
				createPage({
					path: `/posts${node.frontmatter.slug}`,
					component: path.resolve('./src/components/postLayout.js'),
					context: {
						slug: node.frontmatter.slug
					}
				})
			})
			resolve()
		})
	})
}
