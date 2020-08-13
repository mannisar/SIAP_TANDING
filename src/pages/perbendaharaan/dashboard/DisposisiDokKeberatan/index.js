import { React, Row, Layout, Menu, UserOutlined, Link } from '../../libraries/dependencies';

const { Header, Content, Footer, Sider } = Layout;

function DisposisiDokumenKeberatan() {
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        // console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        // console.log(collapsed, type);
                    }}>
                    <div className="logo" style={{ fontSize: 18, paddingLeft: 24, paddingTop: 2, color: 'white' }}>SIAP TANDING</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" icon={<UserOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perekaman-keberatan">Perekaman Keberatan</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/browse-keberatan">Browse Data Keberatan</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perekaman-keputusan-keberatan">Perekaman Kep Keberatan</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/disposisi-dokumen-keberatan">Disposisi Dok Keberatan</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 400 }}>
                            <Row>
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>DISPOSISI DOKUMEN KEBERATAN</h1>
                            </Row>
                            <Row>
                                <h6 style={{ fontWeight: 'bold', fontSize: 24 }}>Cooming Soon</h6>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default DisposisiDokumenKeberatan;