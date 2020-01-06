import React from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb ,Affix} from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import ReactMarkDown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx'

import ServicePath from '../config/apiUrl'

const Detailed = (props) => {
  let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
  const tocify = new Tocify(); // 初始化插件
  const renderer = new marked.Renderer();
  renderer.heading = function (text,level,raw) {
    const anchor = tocify.add(text,level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
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
    let html = marked(props.article_content);
  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xm={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>xxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
            {props.title}
          </div>
            <div className="list-icon center">
              <span><Icon type="calendar" />{props.addTime}</span>
              <span><Icon type="folder" />{props.typeName}</span>
              <span><Icon type="fire" />{props.view_count}</span>
            </div>
            <div className="detailed-content"
            dangerouslySetInnerHTML={{__html:html}} // 解析html标签
            >
              {/* <ReactMarkDown
                source={markdown}
                escapeHtml={false} // 不解析html标签
              /> */}
          </div>
          </div>
        </Col>
        <Col className="comm-right" xm={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          {/* 滚动的时候固定在顶部5像素 */}
          <Affix offsetTop={5}> 
          <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            {/* <MarkNav
              className="article-menu"
              source={html}
              ordered={false} // true是带编号
          /> */}
          {tocify && tocify.render()}
          </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

// context获取Link路由传过来的值
Detailed.getInitialProps = async (context) =>{
  const id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(ServicePath.getArticleDetails + id).then((res)=>{
      resolve(res.data.data[0])
    })
  })
  return await promise;
}

export default Detailed
