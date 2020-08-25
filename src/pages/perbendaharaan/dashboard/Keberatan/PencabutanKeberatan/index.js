import { React, Layout, Menu, FolderOpenOutlined, UploadOutlined, Link, Form, Row, Col, Input, DatePicker, Select, Button, message, Upload, useState } from '../../../libraries/dependencies';

// const customLayout = {
//     labelCol: { span: 6 }, wrapperCol: { span: 0 }
// };

const normalLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 24 }
};

// const tailLayoutExtraSmall = {
//     wrapperCol: { span: 4 }
// };

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

function PencabutanKeberatan() {
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
        setOriginFileObj(null) // file upld.
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
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN PENCABUTAN KEBERATAN</h1>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form {...normalLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish}>
                                        <Form.Item {...tailLayoutSmall} label="No Penetapan / Tanggal">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="jenisPenetapan"
                                                        label="jenisPenetapan"
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
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="tglPenetapan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} name="npwp" label="NPWP" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} name="alamat" label="Alamat" rules={[{ required: false }]}>
                                            <Input.TextArea style={{ minHeight: 150 }} />
                                        </Form.Item>
                                        <Form.Item {...tailLayoutSmall} label="Kep Pencabutan / Tanggal">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="kepPencabutan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="tglPencabutan"
                                                        noStyle
                                                        rules={[{ required: false }]}
                                                    >
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item {...tailLayoutMedium} label="Upload Berkas Pendukung">
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
                                                        <Button type="primary" htmlType="button" style={{ width: '100%' }}>
                                                            <UploadOutlined />Upload
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

export default PencabutanKeberatan;