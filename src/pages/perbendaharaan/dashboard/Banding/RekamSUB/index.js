import { React, Layout, Menu, FolderOpenOutlined, PlusOutlined, Link, Row, Col, Select, Form, Input, DatePicker, Button, Upload, useState, message } from '../../../libraries/dependencies';

// const customLayout = {
//     labelCol: { span: 6 }, wrapperCol: { span: 0 }
// };

const normalLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 24 }
};

const tailLayoutExtraSmall = {
    wrapperCol: { span: 4 }
};

const tailLayoutSmall = {
    wrapperCol: { span: 8 }
};

const tailLayoutMedium = {
    wrapperCol: { span: 12 }
};

// const tailLayoutLarge = {
//     wrapperCol: { span: 16 }
// };

// const tailLayoutExtraLarge = {
//     wrapperCol: { span: 20 }
// };

// const tailLayoutNormal = {
//     wrapperCol: { span: 24 }
// };

const tailLayoutBtn = {
    wrapperCol: { offset: 6, span: 8 }
};

const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function RekamSUB() {
    const [form] = Form.useForm();
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

    const onFinish = values => {
        console.log(values, 'response!')
    };

    const onReset = () => {
        form.resetFields();
        setOriginFileObj(null); // file upld.
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['7']}>
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
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN SUB</h1>
                                <Col span={24}>
                                    <Form {...normalLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish}>
                                        <Form.Item {...tailLayoutExtraSmall} label="No Sengketa Pajak" name="noSengketaPajak" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} label="No / Tanggal Objek Banding">
                                            <Row gutter={4}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="jenisObjekBanding"
                                                        label="jenisObjekBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Select>
                                                            <Option value="KEBERATAN">KEBERATAN</Option>
                                                            <Option value="KERINGANAN">KERINGANAN</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
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
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} label="Pemohon Banding">
                                            <Row gutter={4}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="noBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={16}>
                                                    <Form.Item
                                                        name="labelBanding"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutExtraSmall} name="pokokSengketa" label="Pokok Sengketa" rules={[{ required: false }]} >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="No / Tanggal SUB">
                                            <Row gutter={4}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="noSub"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="tglSub"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} name="pokokPermasalahan" label="Pokok Permasalahan" rules={[{ required: false }]}>
                                            <Input.TextArea style={{ minHeight: 150 }} />
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
                                        <Form.Item {...tailLayoutBtn}>
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

export default RekamSUB;