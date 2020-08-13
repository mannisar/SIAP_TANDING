import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Table, Modal, Layout, Menu, UserOutlined, Link, Upload, message, UploadOutlined } from '../../libraries/dependencies';

const customLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 0 }
};

// const normalLayout = {
//     labelCol: { span: 6 }, wrapperCol: { span: 24 }
// };

// const tailLayoutExtraSmall = {
//     wrapperCol: { span: 4 }
// };

const tailLayoutSmall = {
    wrapperCol: { span: 8 }
};

const tailLayoutMedium = {
    wrapperCol: { span: 12 }
};

const tailLayoutLarge = {
    wrapperCol: { span: 16 }
};

// const tailLayoutExtraLarge = {
//     wrapperCol: { span: 20 }
// };

// const tailLayoutNormal = {
//     wrapperCol: { span: 24 }
// };

const tailLayoutSpacing = {
    wrapperCol: { offset: 6, span: 8 }
};

const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;

function RekamKepKeberatan() {
    const [form] = Form.useForm();
    const [selectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [detailPIBVisible, setDetailPIBVisible] = useState(false);
    const [originFileObj, setOriginFileObj] = useState(null);
    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                setOriginFileObj(file.originFileObj);
                message.success("Upload File Success!")
            }
        }
    };
    const columns = [
        {
            title: 'Nama Pokok Sengketa',
            dataIndex: 'name',
        }
    ];
    const data = [
        {
            key: '1',
            name: '-'
        },
        {
            key: '2',
            name: '-'
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        }
    };

    const onFinish = values => {
        console.log(values, "response!")
    };

    const onReset = () => {
        form.resetFields();
        setOriginFileObj(null); // file upld.
    };

    function showModal(name) {
        if (name === "detailPIB") {
            setDetailPIBVisible(!detailPIBVisible);
        }
    };

    function handleOk(name) {
        if (name === "detailPIB") {
            setDetailPIBVisible(false);
        }
    };

    function handleCancel(name) {
        if (name === "detailPIB") {
            setDetailPIBVisible(false);
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
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
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN KEPUTUSAN KEBERATAN</h1>
                            </Row>
                            <Row style={{ border: '1px solid #eaeaea' }}>
                                <Col span={24}>
                                    <Form {...customLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ padding: 8 }}>
                                        <Form.Item {...tailLayoutLarge} label="Kode Kantor Penerbit" style={{ marginBottom: 2 }}>
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="kodeKantorPenerbit"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="labelKantorPenerbit"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="Kode Kantor Monitoring" style={{ marginBottom: 2 }}>
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="kodeKantorMonitor"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="labelKantorMonitor"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item  {...tailLayoutLarge} label="Kode Kantor Penerusan">
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="kodeKantorPenerusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="labelKantorPenerusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} name="noAgendaKantor" label="Nomor Agenda Kantor" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Penetapan">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="noPenetapan1"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="tglPenetapan1"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} label="No PIB / Tanggal PIB">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="noPIB"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="tglPIB"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" style={{ width: '100%' }} onClick={() => showModal("detailPIB")}>
                                                        Lihat Detail PIB
                                                        </Button>
                                                    <Modal
                                                        title="Detail PIB Modal"
                                                        visible={detailPIBVisible}
                                                        onOk={() => handleOk("detailPIB")}
                                                        onCancel={() => handleCancel("detailPIB")}
                                                    >
                                                        <p>Some contents...</p>
                                                        <p>Some contents...</p>
                                                        <p>Some contents...</p>
                                                    </Modal>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="NPWP" name="npwp" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} name="alamat" label="Alamat" rules={[{ required: false }]}>
                                            <Input.TextArea />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="No Penetapan / Tanggal">
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="listPenetapan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Select>
                                                            <Option value="PIB-BERKALA">PIB BERKALA</Option>
                                                            <Option value="PIB-VOORITSLAG">PIB VOORITSLAG</Option>
                                                            <Option value="RUSH-HANDLING">RUSH HANDLING</Option>
                                                            <Option value="SPTNP">SPTNP</Option>
                                                            <Option value="SPKTNP">SPKTNP</Option>
                                                            <Option value="SPP">SPP</Option>
                                                            <Option value="SPSA">SPSA</Option>
                                                            <Option value="SPPBMCP">SPPBMCP</Option>
                                                            <Option value="PEB-PENUNDAAN">PEB PENUNDAAN</Option>
                                                            <Option value="SPPBK">SPPBK</Option>
                                                            <Option value="SPKPBK">SPKPBK</Option>
                                                            <Option value="CK1-PENUNDAAN">CK1 PENUNDAAN</Option>
                                                            <Option value="CK1A-BERKALA">CK1A BERKALA</Option>
                                                            <Option value="CK5">CK5</Option>
                                                            <Option value="STCK1">STCK1</Option>
                                                            <Option value="SPPBP">SPPBP</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="noPenetapan2"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="tglPenetapan2"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="Jaminan / Pelunasan">
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="listJaminanPelunasan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Select>
                                                            <Option value="Jaminan">Jaminan</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="noJaminanPelunasan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="tglJaminanPelunasan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="Pokok Sengketa">
                                            <Table
                                                rowSelection={{
                                                    type: selectionType,
                                                    ...rowSelection,
                                                }}
                                                columns={columns}
                                                dataSource={data}
                                                pagination={false}
                                                size={"small"}
                                                bordered={true}
                                            />
                                        </Form.Item>
                                        {/** PEMBATAS */}
                                        <Form.Item {...tailLayoutSpacing}>
                                            <Row gutter={8}>
                                                <Col span={12} style={{ textAlign: 'center' }}>
                                                    <Form.Item
                                                        name=""
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <span>Nilai Keberatan</span>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'center' }}>
                                                    <Form.Item
                                                        name=""
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <span>Nilai Keputusan</span>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        {/** PEMBATAS */}
                                        <Form.Item {...tailLayoutSmall} label="BM">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BM_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BM_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BMTP">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMTP_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMTP_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BMTPS">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMTPS_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMTPS_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BMAD">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMAD_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMAD_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BMI">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMI_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BMI_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="CTEM">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CTEM_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CTEM_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="CEA">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CEA_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CEA_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="CMEA">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CMEA_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CMEA_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="PAB LAIN (BUNGA)">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PAB_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PAB_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="DENDA PAB">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="DENDA_PAB_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="DENDA_PAB_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BUNGA AWAL">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BUNGA_AWAL_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BUNGA_AWAL_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BK">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BK_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BK_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="PPN">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PPN_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PPN_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="PPH">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PPH_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PPH_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="PPnBM">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PPnBM_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="PPnBM_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="CK LAIN">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CK_LAIN_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="CK_LAIN_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="DENDA CK">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="DENDA_CK_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="DENDA_CK_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="BUNGA PPN">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BUNGA_PPN_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="BUNGA_PPN_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="TOTAL">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="TOTAL_nilai"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="TOTAL_keputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="No Kep / Agenda / Tanggal Keputusan">
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="noKeputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="agenda"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="tglKeputusan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="Rekomendasi Keputusan" name="rekomendasiKeputusan" rules={[{ required: false }]}>
                                            <Select>
                                                <Option value="pabean">MENETAPKAN LAIN (KURANG - PABEAN)</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="Pejabat TTD" name="pejabatTTD" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} label="Resume Keputusan" name="resumeKeputusan" rules={[{ required: false }]}>
                                            <Input.TextArea autoSize style={{ minHeight: 300 }} />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} label="Upload Berkas">
                                            <Row gutter={8}>
                                                <Col span={16}>
                                                    <Form.Item
                                                        name="berkas"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input placeholder={originFileObj === null ? "Tidak ada file." : originFileObj.name} disabled={true} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Upload {...props} style={{ width: '100%' }} showUploadList={false}>
                                                        <Button type="primary" style={{ width: '100%' }}>
                                                            <UploadOutlined /> Browse Files..
                                                        </Button>
                                                    </Upload>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSpacing}>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                                        Simpan
                                                    </Button>
                                                </Col>
                                                <Col span={12}>
                                                    <Button type="primary" htmlType="button" style={{ width: '100%' }} onClick={onReset}>
                                                        Batal
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default RekamKepKeberatan;