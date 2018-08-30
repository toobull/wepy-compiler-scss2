const nodeSass = require('node-sass')
const postcss = require('postcss')

exports.__esModule = true

exports.default = function (content, config, file) {
    var result = {}
    return new Promise(function (resolve, reject) {
        config.data = content
        config.file = file
        config.indentedSyntax = false

        const postcssConfig = config.postcss
        delete config.postcss

        function _resolve(res) {
            if (config.supportObject) {
                result.css = res.css.toString()
                result.map = res.map
                result.context = file
                result.imports = res.stats && res.stats.includedFiles
                resolve(result)
            } else {
                resolve(res.css)
            }
        }

        nodeSass.render(config, function (err, res) {
            if (err) {
                reject(err)
            } else {
                if (postcssConfig && postcssConfig.plugins && postcssConfig.plugins.length) {
                    postcss(
                        postcssConfig.plugins
                    ).process(
                        res.css.toString(), {from: undefined}
                    ).then(res2 => {
                        _resolve(res2)
                    }).catch(reject)
                } else {
                    _resolve(res)
                }
            }
        })
    })
}
