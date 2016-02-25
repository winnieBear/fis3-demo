fis.set('project.files', ['index.html']);
// npm install [-g] fis3-hook-amd
fis.hook('amd',{
    forwardDeclaration:true,
    baseUrl:'http://cdn.baidu.com/static/'
    //skipBuiltinModules:true
});

fis.match('/comp/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    //release:'/static/$0',
    //domain: 'http://cdn.baidu.com'
});
fis.match('/busi/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    //release:'/static/$0',
    //domain: 'http://cdn.baidu.com'
});

fis.match('::package', {
//  packager: fis.plugin('map', {
//    'pkg/page1.js': [
//        'busi/page1/page1.js',
//        /*'comp/base/base.js',
//        'comp/foo/foo.js'*/
//    ]
//  }),
//  packager: fis.plugin('deps-pack', {
//    'busi/page1/page1.js': [
//        'busi/page1/page1.js',
//        'busi/page1/page1.js:deps'
//    ],
//    'busi/page2/page2.js': [
//        'busi/page2/page2.js',
//        'busi/page2/page2.js:deps',
//        'busi/page2/page2.js:asyncs'
//    ]
//  }),
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true, // 资源映射表内嵌
        allInOne:{
            js:'pkg/foo.js',
            includeAsyncs:true,
        } //js&css打包成一个文件
        
    })
})

// fis3 release prod 产品发布，进行合并
//fis.media('prod')
//    .match('/busi/**/*.js', {
//        //includeAsyncs:true,
//        packTo: '/static/$0'
//    });
fis.media('prod')
    .match('*.js', {
      optimizer: fis.plugin('uglify-js')
    })
    .match('*.css', {
      optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
      optimizer: fis.plugin('png-compressor')
    });
