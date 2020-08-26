import { React, UploadOutlined, Form, Row, Col, Input, DatePicker, Select, Button, message, Upload, useState, Modal, Table } from '../../../libraries/dependencies';

const { Option } = Select;

function BrowseKeberatan(props) {
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
    const [reportVisible, setReportVisible] = useState(false);
    const [cabutVisible, setCabutVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [disposisiVisible, setDisposisiVisible] = useState(false);
    const [pilihVisible, setPilihVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const columns_browse = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75,
        },
        {
            title: 'No Surat',
            dataIndex: 'noSurat',
            key: 'noSurat',
            align: 'center'
        },
        {
            title: 'Tgl Surat',
            dataIndex: 'tglSurat',
            key: 'tglSurat',
            align: 'center'
        },
        {
            title: 'NPWP/NPPBCK',
            dataIndex: 'npwpnppbck',
            key: 'npwpnppbck',
            align: 'center'
        },
        {
            title: 'Nama Perusahaan',
            dataIndex: 'namaPerusahaan',
            key: 'namaPerusahaan',
            align: 'center'
        },
        {
            title: 'Jatuh Tempo',
            dataIndex: 'jatuhTempo',
            key: 'jatuhTempo',
            align: 'center'
        },
        {
            title: 'Kantor Penerbit',
            dataIndex: 'kantorPenerbit',
            key: 'kantorPenerbit',
            align: 'center'
        },
        {
            title: 'Waktu Terima',
            dataIndex: 'waktuTerima',
            key: 'waktuTerima',
            align: 'center'
        },
        {
            title: 'Pemeriksa',
            dataIndex: 'pemeriksa',
            key: 'pemeriksa',
            align: 'center'
        },
        {
            title: 'Report',
            key: 'Report',
            align: 'center',
            render: () =>
                <>
                    <Button type="primary" onClick={() => showModal("report")}>Report</Button>
                    <Modal
                        title="Report Modal"
                        visible={reportVisible}
                        onOk={() => handleOk("report")}
                        onCancel={() => handleCancel("report")}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </>
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 350,
            render: () =>
                <>
                    <Button type="primary" onClick={() => showModal("cabutModal")}>Cabut Keberatan</Button>
                    <span>&nbsp;</span>
                    <Button type="primary" onClick={() => showModal("editModal")}>Edit</Button>
                    <span>&nbsp;</span>
                    <Button type="primary" onClick={() => showModal("disposisiModal")}>Disposisi</Button>
                    <Modal
                        title="Cabut Keberatan Form"
                        visible={cabutVisible}
                        onOk={() => handleOk("cabutModal")}
                        onCancel={() => handleCancel("cabutModal")}
                        footer={[
                            <Button key="back" onClick={onReset}>
                                Batal
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={onFinish}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Form form={form} name="first-form" labelAlign={"left"} size={"small"}>
                            <Form.Item>
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
                            <Form.Item name="npwp" rules={[{ required: false }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="alamat" rules={[{ required: false }]}>
                                <Input.TextArea style={{ minHeight: 150, maxHeight: 150 }} />
                            </Form.Item>
                            <Form.Item>
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
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={19}>
                                        <Form.Item
                                            name="berkas"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder={originFileObj === null ? "Tidak ada file." : originFileObj.name} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Upload {...propsUpload} showUploadList={false}>
                                            <Button type="primary" htmlType="button">
                                                <UploadOutlined />Upload
                                            </Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Modal >
                    <Modal
                        title="Edit Modal"
                        visible={editVisible}
                        onOk={() => handleOk("editModal")}
                        onCancel={() => handleCancel("editModal")}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <Modal
                        title="Disposisi Modal"
                        visible={disposisiVisible}
                        onOk={() => handleOk("disposisiModal")}
                        onCancel={() => handleCancel("disposisiModal")}
                        style={{ minWidth: 1040 }}
                    >
                        <Table columns={columns_disposisi} dataSource={data_disposisi} scroll={{ x: 1500 }} bordered={true} />
                    </Modal>
                </>
        },
    ];

    const data_browse = [
        {
            key: '1',
            no: '1',
            noSurat: '123',
            tglSurat: '10/01/2020',
            npwpnppbck: '1234567123',
            namaPerusahaan: 'PT MAJU SEJAHTERA',
            jatuhTempo: '08/12/2020',
            kantorPenerbit: '009000',
            waktuTerima: '10-01-2020',
            pemeriksa: '-'
        },
        {
            key: '2',
            no: '2',
            noSurat: '123',
            tglSurat: '10/01/2020',
            npwpnppbck: '1234567123',
            namaPerusahaan: 'PT MAJU SEJAHTERA',
            jatuhTempo: '08/12/2020',
            kantorPenerbit: '009000',
            waktuTerima: '10-01-2020',
            pemeriksa: '-'
        },
    ];

    const columns_data = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75
        },
        {
            title: 'Nip',
            dataIndex: 'nip',
            key: 'nip',
            align: 'center'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center'
        },
        {
            title: 'Waktu',
            dataIndex: 'waktu',
            key: 'waktu',
            align: 'center'
        },
    ];

    const data_status = [
        {
            key: '1',
            no: '1',
            nip: '199101192014021002',
            nama: 'Fulan',
            status: 'Penelitian Dir',
            waktu: '22-02-20 10.20',
        },
        {
            key: '2',
            no: '2',
            nip: '199101192014021002',
            nama: 'Mawar',
            status: 'Penelitian Akhir Kasi',
            waktu: '22-02-20 10.20',
        },
    ];

    const columns_disposisi = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75,
        },
        {
            title: 'Nip',
            dataIndex: 'nip',
            key: 'nip',
            align: 'center'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            align: 'center'
        },
        {
            title: 'Jabatan',
            dataIndex: 'jabatan',
            key: 'jabatan',
            align: 'center'
        },
        {
            title: 'Pangkat/Gol',
            dataIndex: 'pangkatOrGolongan',
            key: 'pangkatOrGolongan',
            align: 'center'
        },
        {
            title: 'Jumlah Pekerjaan',
            dataIndex: 'jumlahPekerjaan',
            key: 'jumlahPekerjaan',
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
                    <Button type="primary" onClick={() => showModal("pilihModal")}>Pilih</Button>
                    <Modal
                        title="Pilih Modal"
                        visible={pilihVisible}
                        onOk={() => handleOk("pilihModal")}
                        onCancel={() => handleCancel("pilihModal")}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </>
        },
    ];

    const data_disposisi = [
        {
            key: '1',
            no: '1',
            nip: 'XXXX',
            nama: 'Mawar',
            jabatan: 'Pemeriksa Bea Cukai Pertama',
            pangkatOrGolongan: 'III-a',
            jumlahPekerjaan: '999',
        },
        {
            key: '2',
            no: '2',
            nip: 'XXXX',
            nama: 'Fuadi',
            jabatan: 'Pemeriksa Bea Cukai Pertama',
            pangkatOrGolongan: 'III-a',
            jumlahPekerjaan: '999',
        },
    ];


    function showModal(name) {
        if (name === "report") {
            setReportVisible(!reportVisible);
        } else if (name === "cabutModal") {
            setCabutVisible(!cabutVisible);
        } else if (name === "editModal") {
            setEditVisible(!editVisible);
        } else if (name === "disposisiModal") {
            setDisposisiVisible(!disposisiVisible);
        } else if (name === "pilihModal") {
            setPilihVisible(!pilihVisible);
        }
    };

    function handleOk(name) {
        if (name === "report") {
            setReportVisible(false);
        } else if (name === "cabutModal") {
            setCabutVisible(false);
        } else if (name === "editModal") {
            setEditVisible(false);
        } else if (name === "disposisiModal") {
            setDisposisiVisible(false);
        } else if (name === "pilihModal") {
            setPilihVisible(false);
        }
    };

    function handleCancel(name) {
        if (name === "report") {
            setReportVisible(false);
        } else if (name === "cabutModal") {
            setCabutVisible(false);
        } else if (name === "editModal") {
            setEditVisible(false);
        } else if (name === "disposisiModal") {
            setDisposisiVisible(false);
        } else if (name === "pilihModal") {
            setPilihVisible(false);
        }
    };

    const onFinish = () => {
        setLoading(!loading);
        form
            .validateFields()
            .then(async values => {
                console.log('All Values:', values)
                setTimeout(() => {
                    form.resetFields();
                    setCabutVisible(false);
                    setLoading(false);
                    message.success("Data Terkirim!");
                }, 5000)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const onReset = () => {
        form.resetFields();
        setOriginFileObj(null) // file upld.
    };

    return (
        <div hidden={props.hidden}>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>BROWSE DATA KEBERATAN</h1>
            </Row>
            <Row>
                <Table columns={columns_browse} dataSource={data_browse} scroll={{ x: 1500 }} bordered={true} />
            </Row>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>STATUS PROSES</h1>
            </Row>
            <Row>
                <Table columns={columns_data} dataSource={data_status} scroll={{ x: 1500 }} bordered={true} pagination={false} />
            </Row>
        </div>
    )
}

export default BrowseKeberatan;