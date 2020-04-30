module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //   @就是会自动寻找src文件
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}