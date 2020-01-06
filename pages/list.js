import React, { useState ,useEffect} from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

// 引入markdown
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';

import axios from 'axios';
import ServicePath from '../config/apiUrl';
import Link from 'next/link';

const MyList = (list) => {
	const renderer = new marked.Renderer();
    const [myList, setMyList] = useState(list.data); // 动态获取列表数据
	// 写一个useEffect解决点击列表不刷新数据的问题,数据变化都重新赋值
	useEffect(()=>{
	  setMyList(list.data)
	 })
	 
	 marked.setOptions({
	     renderer: renderer, // 你可以通过自定义的Renderer渲染出自定义的格式
	     gfm: true, // 启动类似Github样式的Markdown
	     pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
	     sanitize: false, // 原始输出，忽略HTML标签
	     tables: true, // 支持Github形式的表格
	     breaks: false, // 支持Github换行符
	     smartLists: true, // ：优化列表输出，这个填写ture之后，你的样式会好看很多
	     smartypants: false,
	     highlight: function (code) {
	       return hljs.highlightAuto(code).value; // 自动检测代码是html还是js等
	     }
	   });
    return (
        <div>
            <Head>
                <title>MyList</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xm={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                        <Breadcrumb.Item>视频教程</Breadcrumb.Item>
                    </Breadcrumb>
                    </div>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={myList}
                        renderItem={item => (
                            <List.Item>				
                                <div className="list-title">
									<Link href={{pathname: '/detailed',query: {id: item.id}}}>
									  <a><div className="list-title">{item.title}</div></a>
									</Link>
								</div>
                                <div className="list-icon">
                                    <span><Icon type="calendar" /> {item.addTime}</span>
                                    <span><Icon type="folder" /> {item.typeName}</span>
                                    <span><Icon type="fire" /> {item.view_count}</span>
                                </div>
                                <div className="list-context"
								dangerouslySetInnerHTML={{__html:marked(item.introduce)}} // 解析html标签
								></div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="comm-right" xm={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

// next技术 getInitialProps  初始化执行的方法
MyList.getInitialProps  = async (context)=>{
  const id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(ServicePath.getListById + id).then((res)=>{
      resolve(res.data);
    })
  })
  return await promise;
}

export default MyList
