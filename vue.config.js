const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/citas-vue-app/'
    : '/',
  devServer: {
    proxy: 'https://citavehiculosapi2022.azurewebsites.net/api/Citas/',
}
})
