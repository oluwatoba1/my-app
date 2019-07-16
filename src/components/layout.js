/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet';
import "./layout.css";
import Header from './header'
import Footer from './Footer'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description, 
            keywords
          }
        }
        allContentfulLink{
        edges{
          node{
            title
            url
          }
        }
      }
      }
    `}
    render={data => (
      <>
      <Helmet 
        title={data.site.siteMetadata.title}
        meta={[
          {name: 'description', content: data.site.siteMetadata.description},
          {name: 'keywords', content: data.site.siteMetadata.keywords}
          ]}
      />
      <Header />
      {children}
      <Footer data={data}>
        Backgrounds made in Cinema 4D, iOS app in Swift, site made in React. <a href="mailto:tohbyy@gmail.com">Email us</a> to ask us anything. © 2019
      </Footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
