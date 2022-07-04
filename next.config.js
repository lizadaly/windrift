const withMDX = require('@next/mdx')()
const isProd = process.env.NODE_ENV === 'production'

module.exports = withMDX({
    trailingSlash: true,
    assetPrefix: isProd ? '../' : '',
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})
