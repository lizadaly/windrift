const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    trailingSlash: true,
    assetPrefix: isProd ? '../' : ''
}
