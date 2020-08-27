import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Checkbox, Radio, Modal, useEffect, AutoComplete, Menu, Dropdown, DownOutlined, Link } from '../../../libraries/dependencies';

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

const tailLayoutExtraSmallCustom = {
    wrapperCol: { span: 8, offset: 6 }
};

const tailLayoutSpacing = {
    wrapperCol: { offset: 6, span: 4 }
};

const tailLayoutBtn = {
    wrapperCol: { offset: 6, span: 8 }
};

const { Option } = Select;
const { SubMenu } = Menu;

const menu = (
    <Menu>
        <SubMenu title="Level 1">
            <Menu.Item>Level 2</Menu.Item>
            <Menu.Item>Level 2</Menu.Item>
        </SubMenu>
        <SubMenu title="Level 1">
            <SubMenu title="Level 2">
                <Menu.Item>Level 3</Menu.Item>
                <Menu.Item>Level 3</Menu.Item>
                <Menu.Item>Level 3</Menu.Item>
                <Menu.Item>Level 3</Menu.Item>
            </SubMenu>
            <Menu.Item>Level 2</Menu.Item>
        </SubMenu>
    </Menu>
);

function RekamKeberatan(props) {
    const [form] = Form.useForm();
    const [detailPIBVisible, setDetailPIBVisible] = useState(false);
    const [jaminanPelunasanVisible, setJaminanPelunasanVisible] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // ** Kode Kantor */
            let arrKantor = [];
            await fetch(process.env.REACT_APP_URL + "v1/kantor/all")
                .then(res => res.json())
                .then(data => data.data.map((item) => arrKantor.push({ value: item.kodeKantor })));
            await setOptions(arrKantor)
        }
        fetchData();
    }, []);

    function onSelect(value, option, name) {
        if (name.unique === "kodeKantorPenerbit") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${value}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorPenerbit: data.data.namaKantorPanjang }));
        } else if (name.unique === "kodeKantorMonitor") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${value}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorMonitor: data.data.namaKantorPanjang }));
        } else if (name.unique === "kodeKantorPenerusan") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${value}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorPenerusan: data.data.namaKantorPanjang }));
        }
    }

    const onFinish = values => {
        console.log(values, 'response!');
    };

    const onReset = () => {
        form.resetFields();
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
        if (e.target.value === "Ya") {
            form.setFieldsValue({ status: "Lengkap" });
        } else {
            form.setFieldsValue({ status: "Tidak Lengkap" });
        }
    }

    return (
        <div hidden={props.hidden}>
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
                                            <AutoComplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelect(value, option, { unique: "kodeKantorPenerbit" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
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
                                            <AutoComplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelect(value, option, { unique: "kodeKantorMonitor" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
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
                                            <AutoComplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelect(value, option, { unique: "kodeKantorPenerusan" })}
                                            />
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
                            <Form.Item {...tailLayoutExtraSmall} label="Pokok Sengketa">
                                <Dropdown overlay={menu}>
                                    <Link className="ant-dropdown-link" to="#" onClick={e => e.preventDefault()} style={{ width: '100%' }}>
                                        Pilih Sengketa <DownOutlined style={{ display: 'inline-block' }} />
                                    </Link>
                                </Dropdown>
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
                            {/** PEMBATAS */}
                            <Form.Item {...tailLayoutSpacing} style={{ textAlign: 'center' }}>
                                <Form.Item
                                    name=""
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <span>Nilai Keberatan</span>
                                </Form.Item>
                            </Form.Item>
                            {/** PEMBATAS */}
                            <Row>
                                <Col span={12}>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BM">
                                        <Form.Item
                                            name="BM_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BMTP">
                                        <Form.Item
                                            name="BMTP_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BMTPS">
                                        <Form.Item
                                            name="BMTPS_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BMAD">
                                        <Form.Item
                                            name="BMAD_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BMI">
                                        <Form.Item
                                            name="BMI_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="CTEM">
                                        <Form.Item
                                            name="CTEM_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="CEA">
                                        <Form.Item
                                            name="CEA_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="CMEA">
                                        <Form.Item
                                            name="CMEA_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="PAB LAIN (BUNGA)">
                                        <Form.Item
                                            name="PAB_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="DENDA PAB">
                                        <Form.Item
                                            name="DENDA_PAB_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BUNGA AWAL">
                                        <Form.Item
                                            name="BUNGA_AWAL_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BK">
                                        <Form.Item
                                            name="BK_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="PPN">
                                        <Form.Item
                                            name="PPN_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="PPH">
                                        <Form.Item
                                            name="PPH_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="PPnBM">
                                        <Form.Item
                                            name="PPnBM_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="CK LAIN">
                                        <Form.Item
                                            name="CK_LAIN_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="DENDA CK">
                                        <Form.Item
                                            name="DENDA_CK_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="BUNGA PPN">
                                        <Form.Item
                                            name="BUNGA_PPN_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item {...tailLayoutExtraSmallCustom} label="TOTAL">
                                        <Form.Item
                                            name="TOTAL_nilai"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>
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
        </div >
    )
}

export default RekamKeberatan;