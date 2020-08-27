import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Modal, Upload, message, PlusOutlined } from '../../../libraries/dependencies';

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

const tailLayoutBtn = {
    wrapperCol: { offset: 6, span: 8 }
};

const tailLayoutSpacing = {
    wrapperCol: { offset: 6, span: 4 }
};

const { Option } = Select;

function RekamPermintaanTanggapan(props) {
    const [form] = Form.useForm();
    const [actionVisible, setActionVisible] = useState(false);
    const [originFileObj, setOriginFileObj] = useState(null);
    const propsUpload = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                setOriginFileObj(file.originFileObj);
                message.success("Upload File Success!")
            }
        }
    };

    const onFinish = values => {
        console.log(values, "response!");
    };

    const onReset = () => {
        form.resetFields();
        setOriginFileObj(null); // file upld.
    };

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
        <div hidden={props.hidden}>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN PERMINTAAN TANGGAPAN</h1>
            </Row>
            <Row style={{ border: '1px solid #eaeaea' }}>
                <Col span={24}>
                    <Form {...customLayout} form={form} name="rekam-permintaan-tanggapan-form" labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ padding: 8 }}>
                        <Form.Item {...tailLayoutExtraSmall} name="KPSPST" label="Kantor Perekaman Surat Permintaan" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Surat Permintaan Tanggapan">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item
                                        name="noSuratPermintaanTanggapan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="tglSuratPermintaanTanggapan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Surat Gugatan">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item
                                        name="noSuratGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="tglSuratGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="noSengketaPajak" label="Nomor Sengketa Pajak" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="Objek Gugatan">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item
                                        name="listObjekGugatan1"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Select>
                                            <Option value="PenagihanPajak">Penagihan Pajak</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="listObjekGugatan2"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Select>
                                            <Option value="SuratTeguran">SuratTeguran</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutMedium} label="No / Tanggal Objek Gugatan">
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Form.Item
                                        name="noObjekGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="tglObjekGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" style={{ width: '100%' }} onClick={() => showModal("action")}>
                                        Cari
                                    </Button>
                                    <Modal
                                        title="Detail PIB Modal"
                                        visible={actionVisible}
                                        onOk={() => handleOk("action")}
                                        onCancel={() => handleCancel("action")}
                                    >
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Modal>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutLarge} label="Pemohonan Gugatan">
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Form.Item
                                        name="kodePemohonanGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <Form.Item
                                        name="labelPemohonanGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutLarge} label="NIP Pemeriksa Surat Tanggapan">
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Form.Item
                                        name="kodeNIPPST"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <Form.Item
                                        name="labelNIPPST"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
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
                                <span>Nilai Gugatan</span>
                            </Form.Item>
                        </Form.Item>
                        {/** PEMBATAS */}
                        <Form.Item {...tailLayoutExtraSmall} label="BM">
                            <Form.Item
                                name="BM_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BMTP">
                            <Form.Item
                                name="BMTP_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BMTPS">
                            <Form.Item
                                name="BMTPS_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BMAD">
                            <Form.Item
                                name="BMAD_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BMI">
                            <Form.Item
                                name="BMI_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="CTEM">
                            <Form.Item
                                name="CTEM_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="CEA">
                            <Form.Item
                                name="CEA_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="CMEA">
                            <Form.Item
                                name="CMEA_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="PAB LAIN (BUNGA)">
                            <Form.Item
                                name="PAB_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="DENDA PAB">
                            <Form.Item
                                name="DENDA_PAB_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BUNGA AWAL">
                            <Form.Item
                                name="BUNGA_AWAL_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BK">
                            <Form.Item
                                name="BK_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="PPN">
                            <Form.Item
                                name="PPN_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="PPH">
                            <Form.Item
                                name="PPH_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="PPnBM">
                            <Form.Item
                                name="PPnBM_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="CK LAIN">
                            <Form.Item
                                name="CK_LAIN_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="DENDA CK">
                            <Form.Item
                                name="DENDA_CK_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="BUNGA PPN">
                            <Form.Item
                                name="BUNGA_PPN_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} label="TOTAL">
                            <Form.Item
                                name="TOTAL_nilai"
                                noStyle
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
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
                                    <Upload {...propsUpload} style={{ width: '100%' }} showUploadList={false}>
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
    )
}

export default RekamPermintaanTanggapan;