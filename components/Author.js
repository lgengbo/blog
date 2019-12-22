import React from 'react'
import '../public/style/components/author.css'
import { Avatar, Divider } from 'antd'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"/></div>
            <div className="author-introduction">
                小白专注于前端和后端开发
                <Divider>小白社交</Divider>
                <Avatar size={28} icon="github" className="account"/>
                <Avatar size={28} icon="qq" className="account"/>
                <Avatar size={28} icon="wechat" className="account"/>
            </div>
        </div>
    )
}

export default Author;