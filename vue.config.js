const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://citavehiculosapi2022.azurewebsites.net/api/Citas/',
}
})
