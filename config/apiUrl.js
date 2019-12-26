const ip = 'http://127.0.0.1:7001/default/'

const servicePath = {
    getArticleList : ip + 'getArticleList', // 首页列表信息
    getArticleDetails : ip + 'getArticleDetails/', // 文章详情
    getTypeInfo : ip + 'getTypeInfo', // 文章导航类别接口
	getListById : ip + 'getListById/', // 根据类别ID获取文章列表
}

export default servicePath;