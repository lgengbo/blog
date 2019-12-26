import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
    const [navArray,setNavArray] = useState([])
    // userEffect第二参数变化的时候就会触发第一个参数方法，传[]只执行一次
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then((res)=>{
                return res.data.data
            })
            setNavArray(result); // 赋值
        }
        fetchData(); // 执行
    },[])
	
	const handleClick = (e) => {
		if(e.key === '0') { // 是否点击首页
			Router.push('/index');
		} else {
			Router.push('/list?id=' + e.key); // e.key文章类别的id
		}
	}
    return (
        <div className="header">
            <Row type="flex" justify="center">
                {/* xs普通手机 sm大一小的手机 xl普通电脑*/}
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">小白技术</span>
                    <span className="header-title">专注前端开发、后端开发</span>
                </Col>
                {/* xs={0} 手机上不显示* 平板上显示14 */}
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            首页
                    </Menu.Item>
                        {
							navArray.map((item)=>{
								return (
									<Menu.Item key={item.id}>
									        <Icon type={item.icon} />
									        {item.typeName}
									</Menu.Item>
								)								
							})
						}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header;