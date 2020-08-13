import { React, Table, Row, Button, Modal, useState, Layout, Menu, UserOutlined, Link } from '../../libraries/dependencies';

const { Header, Content, Footer, Sider } = Layout;

function BrowseKeberatan() {
    const [actionVisible, setActionVisible] = useState(false);
    const [reportVisible, setReportVisible] = useState(false);
    const columns_browse = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75,
        },
        {
            title: 'No Surat',
            dataIndex: 'noSurat',
            key: 'noSurat',
            align: 'center'
        },
        {
            title: 'Tgl Surat',
            dataIndex: 'tglSurat',
            key: 'tglSurat',
            align: 'center'
        },
        {
            title: 'NPWP/NPPBCK',
            dataIndex: 'npwpnppbck',
            key: 'npwpnppbck',
            align: 'center'
        },
        {
            title: 'Nama Perusahaan',
            dataIndex: 'namaPerusahaan',
            key: 'namaPerusahaan',
            align: 'center'
        },
        {
            title: 'Jatuh Tempo',
            dataIndex: 'jatuhTempo',
            key: 'jatuhTempo',
            align: 'center'
        },
        {
            title: 'Kantor Penerbit',
            dataIndex: 'kantorPenerbit',
            key: 'kantorPenerbit',
            align: 'center'
        },
        {
            title: 'Waktu Terima',
            dataIndex: 'waktuTerima',
            key: 'waktuTerima',
            align: 'center'
        },
        {
            title: 'Pemeriksa',
            dataIndex: 'pemeriksa',
            key: 'pemeriksa',
            align: 'center'
        },
        {
            title: 'Report',
            key: 'Report',
            align: 'center',
            render: () =>
                <>
                    <Button type="primary" onClick={() => showModal("report")}>Report</Button>
                    <Modal
                        title="Report Modal"
                        visible={reportVisible}
                        onOk={() => handleOk("report")}
                        onCancel={() => handleCancel("report")}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </>
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 350,
            render: () =>
                <>
                    <Button type="primary" onClick={() => showModal("action")}>Cabut Keberatan</Button>
                    <span>&nbsp;</span>
                    <Button type="primary" onClick={() => showModal("action")}>Edit</Button>
                    <span>&nbsp;</span>
                    <Button type="primary" onClick={() => showModal("action")}>Disposisi</Button>
                    <Modal
                        title="Action Modal"
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

    const data_browse = [
        {
            key: '1',
            no: '1',
            noSurat: '123',
            tglSurat: '10/01/2020',
            npwpnppbck: '1234567123',
            namaPerusahaan: 'PT MAJU SEJAHTERA',
            jatuhTempo: '08/12/2020',
            kantorPenerbit: '009000',
            waktuTerima: '10-01-2020',
            pemeriksa: '-'
        },
        {
            key: '2',
            no: '2',
            noSurat: '123',
            tglSurat: '10/01/2020',
            npwpnppbck: '1234567123',
            namaPerusahaan: 'PT MAJU SEJAHTERA',
            jatuhTempo: '08/12/2020',
            kantorPenerbit: '009000',
            waktuTerima: '10-01-2020',
            pemeriksa: '-'
        },
    ];

    const columns_data = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center'
        },
        {
            title: 'Waktu',
            dataIndex: 'waktu',
            key: 'waktu',
            align: 'center'
        },
    ];

    const data_status = [
        {
            key: '1',
            no: '1',
            nip: '199101192014021002',
            nama: 'Fulan',
            status: 'Penelitian Dir',
            waktu: '22-02-20 10.20',
        },
        {
            key: '2',
            no: '2',
            nip: '199101192014021002',
            nama: 'Mawar',
            status: 'Penelitian Akhir Kasi',
            waktu: '22-02-20 10.20',
        },
    ];

    function showModal(name) {
        if (name === "report") {
            setReportVisible(!reportVisible);
        } else if (name === "action") {
            setActionVisible(!actionVisible);
        }
    };

    function handleOk(name) {
        if (name === "report") {
            setReportVisible(false);
        } else if (name === "action") {
            setActionVisible(false);
        }
    };

    function handleCancel(name) {
        if (name === "report") {
            setReportVisible(false);
        } else if (name === "action") {
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
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
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>BROWSE DATA KEBERATAN</h1>
                            </Row>
                            <Row>
                                <Table columns={columns_browse} dataSource={data_browse} scroll={{ x: 1500 }} bordered={true} />
                            </Row>
                            <Row>
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>STATUS PROSES</h1>
                            </Row>
                            <Row>
                                <Table columns={columns_data} dataSource={data_status} scroll={{ x: 1500 }} bordered={true} pagination={false} />
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default BrowseKeberatan;