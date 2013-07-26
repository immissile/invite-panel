seajs.config({
  debug:true,
  charset: 'utf-8',
  plugins: ['text','shim'],
  alias: {
    'jquery': 'sea-modules/jquery/jquery/1.8.2/jquery',
    '$': 'sea-modules/jquery/jquery/1.8.2/jquery',
    'mustache': 'sea-modules/marketing/mustache/0.7.2/mustache'
  },

  shim:{
    jquery: {exports: 'jQuery'},
    $: {exports: '$'},
    mustache: {
      deps:['jquery'],
      exports: 'Mustache'
    }
  },
  map:[
    ['.js', '.js?'+ Date.parse(new Date())]
  ]
});
