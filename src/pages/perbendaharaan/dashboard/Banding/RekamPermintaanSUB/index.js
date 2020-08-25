import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Table, Modal, Layout, Menu, FolderOpenOutlined, Link, Upload, message, PlusOutlined } from '../../../libraries/dependencies';

const customLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 0 }
};

// const normalLayout = {
//     labelCol: { span: 6 }, wrapperCol: { span: 24 }
// };

const tailLayoutExtraSmall = {
    wrapperCol: { span: 4 }
};

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

const tailLayoutSpacingTable = {
    wrapperCol: { offset: 6, span: 8 }
};

const layoutSpacingNilai = {
    wrapperCol: { offset: 6, span: 16 }
};

const tailLayoutSpacingBtn = {
    wrapperCol: { offset: 6, span: 8 }
};

const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function RekamPermintaanSUB() {
    const [form] = Form.useForm();
    const [selectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [objekBandingVisible, setObjekBandingVisible] = useState(false);
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
        console.log(values, "response!");
        console.log(selectedRowKeys);
        console.log(selectedRows);
    };

    const onReset = () => {
        form.resetFields();
        setOriginFileObj(null); // file upld.
    };

    function showModal(name) {
        if (name === "objekBanding") {
            setObjekBandingVisible(!objekBandingVisible);
        }
    };

    function handleOk(name) {
        if (name === "objekBanding") {
            setObjekBandingVisible(false);
        }
    };

    function handleCancel(name) {
        if (name === "objekBanding") {
            setObjekBandingVisible(false);
        }
    };

    // function getKeputusan() {
    //     form.getFieldValue("BM_keputusan_dir")
    // }

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['6']}>
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
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN PERMINTAAN SUB</h1>
                            </Row>
                            <Row style={{ border: '1px solid #eaeaea' }}>
                                <Col span={24}>
                                    <Form {...customLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ padding: 8 }}>
                                        <Form.Item {...tailLayoutExtraSmall} label="Kantor Perekam Surat Permintaan SUB" name="kantorPerekaman" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Surat Permintaan SUB">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="noSuratPermintaanSUB"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="tglSuratPermintaanSUB"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Surat Banding">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="noSuratBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="tglSuratBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutExtraSmall} label="No Sengketa Pajak" name="noSengketaPajak" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutExtraSmall} label="Objek Banding" name="objekBanding" rules={[{ required: false }]}>
                                            <Select>
                                                <Option value="KEBERATAN">KEBERATAN</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSpacingTable}>
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
                                        <Form.Item {...tailLayoutMedium} label="No / Tanggal Objek Banding">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="noObjekBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="tglObjekBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" style={{ width: '100%' }} onClick={() => showModal("objekBanding")}>
                                                        Cari
                                                    </Button>
                                                    <Modal
                                                        title="Detail Objek Banding Modal"
                                                        visible={objekBandingVisible}
                                                        onOk={() => handleOk("objekBanding")}
                                                        onCancel={() => handleCancel("objekBanding")}
                                                    >
                                                        <p>Some contents...</p>
                                                        <p>Some contents...</p>
                                                        <p>Some contents...</p>
                                                    </Modal>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="Pemohon Banding">
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="noBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input disabled={true} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={18}>
                                                    <Form.Item
                                                        name="labelBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input disabled={true} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item  {...tailLayoutLarge} label="NIP Pemeriksa SUB">
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
                                                <Col span={18}>
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
                                        {/** PEMBATAS */}
                                        <Form.Item {...layoutSpacingNilai}>
                                            <Row gutter={8}>
                                                <Col span={8} style={{ textAlign: 'left' }}>
                                                    <span>Nilai Pemberitahuan</span>
                                                </Col>
                                                <Col span={8} style={{ textAlign: 'left' }}>
                                                    <span>Nilai Keputusan Dirijen</span>
                                                </Col>
                                                <Col span={8} style={{ textAlign: 'left' }}>
                                                    <span>Nilai Branding</span>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        {/** PEMBATAS */}
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutLarge} label="BM">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_pemberitahuan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_keputusan_dir"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                {/* <Button type="primary" style={{ width: '25%' }} onClick={getKeputusan} >
                                                    Copy
                                                </Button> */}
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="BM_branding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
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
                                                <Col span={6}>
                                                    <Button type="primary" htmlType="button" style={{ width: '100%' }}>
                                                        Upload
                                                    </Button>
                                                </Col>
                                                <Col span={2} style={{ textAlign: 'right' }}>
                                                    <Upload {...props} style={{ width: '100%' }} showUploadList={false}>
                                                        <Button type="primary" htmlType="button" style={{ width: '100%' }}>
                                                            <PlusOutlined />
                                                        </Button>
                                                    </Upload>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSpacingBtn}>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: 8 }} size={"large"}>
                                                        Simpan
                                                    </Button>
                                                </Col>
                                                <Col span={12}>
                                                    <Button type="primary" htmlType="button" style={{ width: '100%', borderRadius: 8 }} size={"large"} onClick={onReset}>
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

export default RekamPermintaanSUB;