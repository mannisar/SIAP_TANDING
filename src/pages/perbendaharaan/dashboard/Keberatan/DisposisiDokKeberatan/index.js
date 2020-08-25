import { React, Row, Layout, Menu, FolderOpenOutlined, Link, useState, Table, Modal, Button } from '../../../libraries/dependencies';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function DisposisiDokumenKeberatan() {
    const [actionVisible, setActionVisible] = useState(false);
    const columns_disposisi = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75,
        },
        {
            title: 'Nip',
            dataIndex: 'nip',
            key: 'nip',
            align: 'center'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            align: 'center'
        },
        {
            title: 'Jabatan',
            dataIndex: 'jabatan',
            key: 'jabatan',
            align: 'center'
        },
        {
            title: 'Pangkat/Gol',
            dataIndex: 'pangkatOrGolongan',
            key: 'pangkatOrGolongan',
            align: 'center'
        },
        {
            title: 'Jumlah Pekerjaan',
            dataIndex: 'jumlahPekerjaan',
            key: 'jumlahPekerjaan',
            align: 'center'
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: () =>
                <>
                    <Button type="primary" onClick={() => showModal("action")}>Pilih</Button>
                    <Modal
                        title="Pilih Modal"
                        visible={actionVisible}
                        onOk={() => handleOk("action")}
                        onCancel={() => handleCancel("action")}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </>
        },
    ];

    const data_disposisi = [
        {
            key: '1',
            no: '1',
            nip: 'XXXX',
            nama: 'Mawar',
            jabatan: 'Pemeriksa Bea Cukai Pertama',
            pangkatOrGolongan: 'III-a',
            jumlahPekerjaan: '999',
        },
        {
            key: '2',
            no: '2',
            nip: 'XXXX',
            nama: 'Fuadi',
            jabatan: 'Pemeriksa Bea Cukai Pertama',
            pangkatOrGolongan: 'III-a',
            jumlahPekerjaan: '999',
        },
    ];

    function showModal(name) {
        if (name === "action") {
            setActionVisible(!actionVisible);
        }
    };

    function handleOk(name) {
        if (name === "action") {
            setActionVisible(false);
        }
    };

    function handleCancel(name) {
        if (name === "action") {
            setActionVisible(false);
        }
    };
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        <SubMenu key="KB" icon={<FolderOpenOutlined />} title="KEBERATAN" style={{ marginLeft: -12 }} >
                            <Menu.Item key="1" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                                <Link to="/perekaman-keberatan">Perekaman Keberatan</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                                <Link to="/browse-keberatan">Browse Data Keberatan</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                                <Link to="/perekaman-keputusan-keberatan">Perekaman Kep Keberatan</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="BD" icon={<FolderOpenOutlined />} title="BANDING" style={{ marginLeft: -12 }} >
                            <Menu.Item key="5" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                                <Link to="/tampil-banding">Tampil Banding</Link>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                                <Link to="/perekaman-permintaan-sub">Perekaman Permintaan SUB</Link>
                            </Menu.Item>
                            <Menu.Item key="7" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                                <Link to="/perekaman-sub">Perekaman SUB</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 400 }}>
                            <Row>
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>DISPOSISI DOKUMEN KEBERATAN</h1>
                            </Row>
                            <Row><Table columns={columns_disposisi} dataSource={data_disposisi} scroll={{ x: 1500 }} bordered={true} /></Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default DisposisiDokumenKeberatan;