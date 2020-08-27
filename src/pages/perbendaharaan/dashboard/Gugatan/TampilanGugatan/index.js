import { React, Form, Row, Col, Input, DatePicker, Select, Button, Table, Modal, useState } from '../../../libraries/dependencies';

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

function TampilanGugatan(props) {
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
            title: 'No Surat Permintaan Tanggapan',
            dataIndex: 'noSuratPermintaanTanggapan',
            key: 'noSuratPermintaanTanggapan',
            align: 'center'
        },
        {
            title: 'Tgl Surat Permintaan Tanggapan',
            dataIndex: 'tglSuratPermintaanTanggapan',
            key: 'tglSuratPermintaanTanggapan',
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
            title: 'No Objek Gugatan',
            dataIndex: 'noObjekGugatan',
            key: 'noObjekGugatan',
            align: 'center'
        },
        {
            title: 'Tanggal Objek Gugatan',
            dataIndex: 'tglObjekGugatan',
            key: 'tglObjekGugatan',
            align: 'center'
        },
        {
            title: 'Tanggal Jatuh Tempo',
            dataIndex: 'tglJatuhTempo',
            key: 'tglJatuhTempo',
            align: 'center'
        },
        {
            title: 'Status SuratTanggapan',
            dataIndex: 'statusSuratTanggapan',
            key: 'statusSuratTanggapan',
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
            noSuratPermintaanTanggapan: '',
            tglSuratPermintaanTanggapan: '',
            noSengketaPajak: 'XXXX',
            pemohonan: '',
            noObjekGugatan: 'XXXX',
            tglObjekGugatan: '',
            tglJatuhTempo: '',
            statusSuratTanggapan: "Selesai"
        },
        {
            key: '2',
            no: '2',
            noSuratPermintaanTanggapan: 'XXXX',
            tglSuratPermintaanTanggapan: 'XXXX',
            noSengketaPajak: 'XXXX',
            pemohonan: '',
            noObjekGugatan: 'XXXX',
            tglObjekGugatan: '',
            tglJatuhTempo: '',
            statusSuratTanggapan: "PROSES"
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
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PENGAJUAN GUGATAN</h1>
            </Row>
            <Row>
                <Col span={24}>
                    <Form {...normalLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish}>
                        <Form.Item {...tailLayoutExtraSmall} label="No Sengketa Pajak" name="noSengketaPajak" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutMedium} label="Pemohon Gugatan" >
                            <Row gutter={4}>
                                <Col span={8}>
                                    <Form.Item
                                        name="noGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={16}>
                                    <Form.Item
                                        name="labelGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Objek Gugatan" >
                            <Row gutter={4}>
                                <Col span={12}>
                                    <Form.Item
                                        name="noObjekGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="tglObjekGugatan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="statSuratTanggapan" label="Status Surat Tanggapan" rules={[{ required: false }]}>
                            <Select>
                                <Option value="Proses">Proses</Option>
                                <Option value="Tunda">Tunda</Option>
                                <Option value="Selesai">Selesai</Option>
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
                    <Button type="primary" htmlType="button" style={{ width: 250 }} size={"small"}>
                        Rekam Permintaan Surat Tanggapan
                    </Button>
                    <Button type="primary" htmlType="button" style={{ width: 175 }} size={"small"}>
                        Rekam Surat Tanggapan
                    </Button>
                </Row>
            </Row>
            <Row><Table columns={columns_sub} dataSource={data_sub} scroll={{ x: 1500 }} bordered={true} /></Row>
        </div>
    )
}

export default TampilanGugatan;