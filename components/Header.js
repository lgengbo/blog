import React from 'react'
import '../public/style/components/header.css'
import {Row,Col,Menu,Icon} from 'antd'

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
        {/* xs普通手机 sm大一小的手机 xl普通电脑*/}
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">小白技术</span>
                <span className="header-title">专注前端开发、后端开发</span>
            </Col>
            {/* xs={0} 手机上不显示* 平板上显示14 */}
            <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <Icon type="home"/>
                        首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        <Icon type="youtube"/>
                        视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        <Icon type="smile"/>
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header;