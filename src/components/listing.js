import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

const LISTING_QUERY = graphql`
	query BlogPostListing {
		allMarkdownRemark(limit: 10, sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					excerpt
					frontmatter {
						date(formatString: "MMM. Do, YYYY")
						title
						slug
					}
				}
			}
		}
	}
`

const Listing = () => (
	<StaticQuery
		query={LISTING_QUERY}
		render={({ allMarkdownRemark }) =>
			allMarkdownRemark.edges.map(({ node }) => (
				<article key={node.frontmatter.slug}>
					<Link to={`/posts${node.frontmatter.slug}`}>
						<h2>{node.frontmatter.title}</h2>
					</Link>
					<p>{node.frontmatter.date}</p>
					<p>{node.excerpt}</p>
					<Link to={`/posts${node.frontmatter.slug}`}>Read More...</Link>
				</article>
			))}
	/>
)

export default Listing
