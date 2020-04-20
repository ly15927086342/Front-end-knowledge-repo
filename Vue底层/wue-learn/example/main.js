/**
 * @author monkeywang
 * Date: 2018/4/8
 */
 // import '@babel/polyfill';

 let app = new Wue({
  el: '#app',
  data: {
    msg: 'hello wue',
    deep: {
      a: {
        c:11
      },
      b: 2
    }
  },
  mounted () {
    this.deep.a.c = '111'
  }
})