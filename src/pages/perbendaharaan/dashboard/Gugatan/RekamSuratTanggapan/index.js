import { React, PlusOutlined, Row, Col, Form, Input, DatePicker, Button, Upload, useState, message } from '../../../libraries/dependencies';

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

function RekamSuratTanggapan(props) {
    const [form] = Form.useForm();
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
        console.log(values, 'response!')
    };

    const onReset = () => {
        form.resetFields();
        setOriginFileObj(null); // file upld.
    };
    return (
        <div hidden={props.hidden}>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN SURAT TANGGAPAN</h1>
                <Col span={24}>
                    <Form {...normalLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish}>
                        <Form.Item {...tailLayoutExtraSmall} label="No Sengketa Pajak" name="noSengketaPajak" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Objek Gugatan">
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
                        <Form.Item {...tailLayoutMedium} label="Pemohon Gugatan">
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
                        <Form.Item {...tailLayoutExtraSmall} name="pokokPermasalahaan" label="Pokok Permasalahaan" rules={[{ required: false }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="No / Tanggal Surat Tanggapan">
                            <Row gutter={4}>
                                <Col span={12}>
                                    <Form.Item
                                        name="noSuratTanggapan"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="tglSuratTanggapan"
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

export default RekamSuratTanggapan;