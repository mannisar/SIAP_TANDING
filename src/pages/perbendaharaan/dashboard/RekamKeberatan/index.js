import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Checkbox, Table, Radio, Modal, Layout, Menu, UserOutlined, Link } from '../../libraries/dependencies';

const customLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 0 }
};

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

const tailLayoutLarge = {
    wrapperCol: { span: 16 }
};

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

function RekamKeberatan() {
    const [form] = Form.useForm();
    const [selectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [detailPIBVisible, setDetailPIBVisible] = useState(false);
    const [jaminanPelunasanVisible, setJaminanPelunasanVisible] = useState(false);
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
        // const {
        //     ResultTglPenetapan,
        //     alamat,
        //     alasan,
        //     jaminan,
        //     jenisDokumen,
        //     keputusan,
        //     kodeKantorMonitor,
        //     kodeKantorPenerbit,
        //     kodeKantorPenerusan,
        //     labelKantorMonitor,
        //     labelKantorPenerbit,
        //     labelKantorPenerusan,
        //     noAgendaKantor,
        //     noPIB,
        //     noPenetapan,
        //     noSuratKeberatan,
        //     npwp,
        //     radio1,
        //     radio2,
        //     radio3,
        //     radio4,
        //     radio5,
        //     radio6,
        //     radio7,
        //     radio8,
        //     resultNoPenetapan,
        //     status,
        //     tglPIB,
        //     tglPenetapan,
        //     tglSuratKeberatan,
        // } = values;
        console.log(values, 'response!')
    };

    const onReset = () => {
        form.resetFields();
        setSelectedRowKeys([]);
        setSelectedRows([]);
    };

    function showModal(name) {
        if (name === "detailPIB") {
            setDetailPIBVisible(!detailPIBVisible);
        } else if (name === "jaminanPelunasan") {
            setJaminanPelunasanVisible(!jaminanPelunasanVisible);
        }
    };

    function handleOk(name) {
        if (name === "detailPIB") {
            setDetailPIBVisible(false);
        } else if (name === "jaminanPelunasan") {
            setJaminanPelunasanVisible(false);
        }
    };

    function handleCancel(name) {
        if (name === "detailPIB") {
            setDetailPIBVisible(false);
        } else if (name === "jaminanPelunasan") {
            setJaminanPelunasanVisible(false);
        }
    };

    const onRadioBtn = e => {
        if (form.getFieldsValue().radio1 === undefined || form.getFieldsValue().radio2 === undefined || form.getFieldsValue().radio3 === undefined || form.getFieldsValue().radio4 === undefined || form.getFieldsValue().radio5 === undefined || form.getFieldsValue().radio6 === undefined || form.getFieldsValue().radio7 === undefined || form.getFieldsValue().radio8 === undefined) { form.setFieldsValue({ status: "Tidak Lengkap" }); }
        else { form.setFieldsValue({ status: "Lengkap" }); }
        if (e.target.name === "radio1") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio2") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio3") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio4") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio5") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio6") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio7") {
            form.setFieldsValue(e.target.value);
        } else if (e.target.name === "radio8") {
            form.setFieldsValue(e.target.value)
        }
    }

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
                                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN KEBERATAN</h1>
                            </Row>
                            <Row style={{ border: '1px solid #eaeaea', flexDirection: 'column' }}>
                                <Row>
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
                                            <Form.Item {...tailLayoutSmall} label="No Surat Keberatan / Tanggal">
                                                <Row gutter={8}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="noSuratKeberatan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="tglSuratKeberatan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <DatePicker style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item {...tailLayoutLarge} label="NPWP">
                                                <Row gutter={8}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="npwp"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        {/**  onChange={onChange} */}
                                                        <Checkbox><span style={{ fontSize: 12 }}>* Bukan NPWP (BARKIR / Contoh -KTP)</span></Checkbox>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item {...tailLayoutSmall} name="alamat" label="Alamat" rules={[{ required: false }]}>
                                                <Input.TextArea />
                                            </Form.Item>
                                            <Form.Item {...tailLayoutLarge} label="No Penetapan / Tanggal">
                                                <Row gutter={8}>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            name="jenisDokumen"
                                                            label="jenisDokumen"
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
                                                            name="noPenetapan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            name="tglPenetapan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <DatePicker style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Button type="info" htmlType="submit" style={{ width: '100%' }}>
                                                            Cari
                                                        </Button>
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
                                            <Form.Item {...tailLayoutSmall} label="Jaminan / Pelunasan">
                                                <Row gutter={8} style={{ marginBottom: 2 }}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="jaminan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <Select>
                                                                <Option value="Jaminan">Jaminan</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Button type="primary" style={{ width: '100%' }} onClick={() => showModal("jaminanPelunasan")}>
                                                            Cari
                                                        </Button>
                                                        <Modal
                                                            title="Jaminan / Pelunasan Modal"
                                                            visible={jaminanPelunasanVisible}
                                                            onOk={() => handleOk("jaminanPelunasan")}
                                                            onCancel={() => handleCancel("jaminanPelunasan")}
                                                        >
                                                            <p>Some contents...</p>
                                                            <p>Some contents...</p>
                                                            <p>Some contents...</p>
                                                        </Modal>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="resultNoPenetapan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="ResultTglPenetapan"
                                                            noStyle
                                                            rules={[{ required: false }]}
                                                        >
                                                            <DatePicker style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <h1 style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>CEK KELENGKAPAN BERKAS</h1>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form {...normalLayout} form={form} name="second-form" labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ padding: 8 }}>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>1. Ditulis dalam Bahasa Indonesia</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio1" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>2. Ditujukan Kepada Direktur Jendral Bea dan Cukai</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio2" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>3. Disertai Alasan-alasan Keberatan</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio3" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>4. Dilampiri BPJ, Bukti Pelunasan atau Surat Tagihan</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio4" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>5. Dilampiri Fotokopi Surat Penetapan atau Surat Tagihan</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio5" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>6. a. Dilampiri Fotokopi Surat Penetapan atau Surat Tagihan</span><br />
                                                        <span style={{ marginLeft: 15, display: 'block' }}>b. Ditandatangani Oleh Kuasa Pemohonan dan Dilengkapi dengan Fotokopi Bukti Identitas diri/akta perusahaan ditambah asli Surat Kuasa Khusus</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio6" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>7. Satu Keberatan Untuk Satu Surat Penetapan atau Surat Tagihan</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio7" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Row gutter={8}>
                                                    <Col span={18}>
                                                        <span>8. Memenuhi Jangka Waktu Pengajuan Keberatan</span>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item name="radio8" style={{ float: 'right' }} rules={[{ required: false }]}>
                                                            <Radio.Group
                                                                // value={radioBtn}
                                                                onChange={onRadioBtn}
                                                            >
                                                                <Radio value="Ya">Ya</Radio>
                                                                <Radio value="Tidak">Tidak</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            <Form.Item {...tailLayoutExtraSmall} name="status" label="Status" rules={[{ required: false }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item {...tailLayoutExtraSmall} name="keputusan" label="Keputusan" rules={[{ required: false }]}>
                                                <Select>
                                                    <Option value="Terima">Terima</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item {...tailLayoutSmall} name="alasan" label="Alasan" rules={[{ required: false }]}>
                                                <Input.TextArea />
                                            </Form.Item>
                                            <Form.Item {...tailLayoutBtn}>
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
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default RekamKeberatan;