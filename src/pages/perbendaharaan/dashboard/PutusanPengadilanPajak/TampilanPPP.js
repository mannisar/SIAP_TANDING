import { React, Form, Row, Col, Input, DatePicker, Select, Button, Table, Modal, useState } from '../../libraries/dependencies';

// const customLayout = {
//     labelCol: { span: 6 }, wrapperCol: { span: 0 }
// };

const normalLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 24 }
};

const tailLayoutExtraSmall = {
    wrapperCol: { span: 4 }
};

// const tailLayoutSmall = {
//     wrapperCol: { span: 8 }
// };

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

function TampilanPPP(props) {
    const [form] = Form.useForm();
    const [actionVisible, setActionVisible] = useState(false);
    const columns_sub = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75,
        },
        {
            title: 'No Surat Permintaan SUB',
            dataIndex: 'noSuratPermintaanSUB',
            key: 'noSuratPermintaanSUB',
            align: 'center'
        },
        {
            title: 'Tgl Surat Permintaan SUB',
            dataIndex: 'tglSuratPermintaanSUB',
            key: 'tglSuratPermintaanSUB',
            align: 'center'
        },
        {
            title: 'No Sengketa Pajak',
            dataIndex: 'noSengketaPajak',
            key: 'noSengketaPajak',
            align: 'center'
        },
        {
            title: 'Pemohonan',
            dataIndex: 'pemohonan',
            key: 'pemohonan',
            align: 'center'
        },
        {
            title: 'No Objek Banding',
            dataIndex: 'noObjekBanding',
            key: 'noObjekBanding',
            align: 'center'
        },
        {
            title: 'Tanggal Objek Banding',
            dataIndex: 'tglObjekBanding',
            key: 'tglObjekBanding',
            align: 'center'
        },
        {
            title: 'Tanggal Jatuh Tempo',
            dataIndex: 'tglJatuhTempo',
            key: 'tglJatuhTempo',
            align: 'center'
        },
        {
            title: 'Status SUB',
            dataIndex: 'statusSUB',
            key: 'statusSUB',
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
                    <Button type="primary" onClick={() => showModal("action")}>Edit</Button>
                    <Modal
                        title="Edit Modal"
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

    const data_sub = [
        {
            key: '1',
            no: '1',
            noSuratPermintaanSUB: 'U-3964/PAN.WK/2020',
            tglSuratPermintaanSUB: '25/12/2005',
            noSengketaPajak: '05670.45/2030/PP',
            pemohonan: 'PT TATARASA PRATAMA',
            noObjekBanding: 'KEP-810/KPU.03/2030',
            tglObjekBanding: '21/05/2030',
            tglJatuhTempo: '24/05/2030',
            statusSUB: "Selesai"
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

    const onFinish = values => {
        console.log(values, 'response!')
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div hidden={props.hidden}>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PENGAJUAN PUTUSAN PENGADILAN PAJAK</h1>
            </Row>
            <Row>
                <Col span={24}>
                    <Form {...normalLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish}>
                        <Form.Item {...tailLayoutExtraSmall} label="No Sengketa Pajak" name="noSengketaPajak" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="jenisSidang" label="Jenis Sidang" rules={[{ required: false }]}>
                            <Select>
                                <Option value="BANDING">BANDING</Option>
                                <Option value="GUGATAN">GUGATAN</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayoutMedium} label="No / Tanggal Objek Banding / Gugatan" >
                            <Row gutter={4}>
                                <Col span={8}>
                                    <Form.Item
                                        name="jenisObjekBandingGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Select>
                                            <Option value="KEBERATAN">KEBERATAN</Option>
                                            <Option value="SPKTNP">SPKTNP</Option>
                                            <Option value="SPKPBK">SPKPBK</Option>
                                            <Option value="LAIN-LAIN">LAIN-LAIN</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="noObjekBandingGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="tglObjekBandingGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutMedium} label="Pemohon Banding / Gugatan" >
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
                        <Form.Item {...tailLayoutMedium} label="No / Tgl Putusan Pengadilan Pajak" >
                            <Row gutter={4}>
                                <Col span={16}>
                                    <Form.Item
                                        name="noPPP"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="tglPPP"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="amarPutusanPP" label="Amar Putusan PP" rules={[{ required: false }]}>
                            <Select>
                                <Option value="1">Menolak</Option>
                                <Option value="2">Mengabulkan Seluruhnya</Option>
                                <Option value="3">Mengabulkan Sebagian</Option>
                                <Option value="4">Tidak di Terima</Option>
                                <Option value="5">Membatalkan</Option>
                                <Option value="6">Mencabut</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="kantorEvaluatorPutusanPP" label="Kantor Evaluator Putusan PP" rules={[{ required: false }]}>
                            <Select>
                                <Option value="1">Direktorat KBP</Option>
                                <Option value="2">Kanwil DJBC Jateng dan DIY</Option>
                                <Option value="3">Kanwil DJBC Jatim I</Option>
                                <Option value="4">KPU BC Tanjung Priok</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="rekomendasiEvaluasi" label="Rekomendasi Evaluasi" rules={[{ required: false }]}>
                            <Select>
                                <Option value="BANDING">BANDING</Option>
                                <Option value="GUGATAN">GUGATAN</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayoutBtn}>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Button type="primary" htmlType="button" style={{ width: '100%' }}>
                                        Cari
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" htmlType="button" style={{ width: '100%' }} onClick={onReset}>
                                        Clear
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row style={{ flexDirection: 'column' }}>
                <Row style={{ flexDirection: 'row', marginBottom: 24 }}>
                    <Button type="primary" htmlType="button" style={{ width: 175 }} size={"small"}>
                        Rekam Permintaan SUB
                                    </Button>
                    <Button type="primary" htmlType="button" style={{ width: 100 }} size={"small"}>
                        Rekam SUB
                                    </Button>
                </Row>
            </Row>
            <Row><Table columns={columns_sub} dataSource={data_sub} scroll={{ x: 1500 }} bordered={true} /></Row>
        </div>
    )
}

export default TampilanPPP;