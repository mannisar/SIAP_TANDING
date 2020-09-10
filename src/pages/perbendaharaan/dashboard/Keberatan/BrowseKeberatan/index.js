import { React, UploadOutlined, Form, Row, Col, Input, DatePicker, Select, Button, message, Upload, useState, Modal, Table, useEffect } from '../../../libraries/dependencies';

const { Option } = Select;

function BrowseKeberatan() {
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
            title: "No",
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 75
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
            dataIndex: 'npwp',
            key: 'npwp',
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
                                            <DatePicker style={{ width: '100%' }} placeholder="tanggal penetapan" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item name="npwp" rules={[{ required: false }]}>
                                <Input placeholder="npwp" />
                            </Form.Item>
                            <Form.Item name="alamat" rules={[{ required: false }]}>
                                <Input.TextArea style={{ minHeight: 150, maxHeight: 150 }} placeholder="alamat" />
                            </Form.Item>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="kepPencabutan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="keputusan pencabutan" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="tglPencabutan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker style={{ width: '100%' }} placeholder="tanggal pencabutan" />
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

    const [dataBrowse, setDataBrowse] = useState([]);

    const columns_data = [
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

    const [dataStatus, setDataStatus] = useState([]);

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

    useEffect(() => {
        // ** All Fetch */
        async function fetchData() {
            // ** Kode Kantor */
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/keberatan/get-data-keberatan")
                .then(res => res.json())
                .then(data => {
                    for (let x = 0; x < data.data.length; x++) {
                        data.data[x].key = x + 1
                        data.data[x].no = x + 1
                    }
                    setDataBrowse(data.data)
                });
        }
        fetchData();
    }, []);

    const onFinish = () => {
        setLoading(!loading);
        form
            .validateFields()
            .then(async values => {
                console.log('All Values:', values)
                setTimeout(() => {
                    form.resetFields();
                    setOriginFileObj(null) // file upld.
                    setCabutVisible(false);
                    setLoading(false);
                    message.success("Data Terkirim!");
                }, 5000)
            })
            .catch(err => {
                console.log('Validate Failed:', err);
            });
    };

    const onReset = () => {
        form.resetFields();
        setCabutVisible(false);
        setOriginFileObj(null) // file upld.
    };

    const onFetchStatus = async idKeberatan => {
        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/keberatan/get-status-proses?idKeberatan=${idKeberatan}`)
            .then(res => res.json())
            .then(data => {
                for (let y = 0; y < data.data.length; y++) {
                    data.data[y].key = y + 1
                    data.data[y].no = y + 1
                }
                setDataStatus(data.data)
            })
    }

    const [rowId, setRowId] = useState(0);
    const onClickRow = (record) => {
        return {
            onClick: () => {
                setRowId(record.idKeberatan);
                onFetchStatus(record.idKeberatan);
            },
        };
    }

    const setRowClassName = (record) => {
        return record.idKeberatan === rowId ? 'clickRowStyl' : '';
    }

    return (
        <>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>BROWSE DATA KEBERATAN</h1>
            </Row>
            <Row>
                <Table columns={columns_browse} dataSource={dataBrowse} scroll={{ x: 1500 }} bordered={true} onRow={onClickRow} rowClassName={setRowClassName} />
            </Row>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>STATUS PROSES</h1>
            </Row>
            <Row>
                <Table columns={columns_data} dataSource={dataStatus} scroll={{ x: 1500 }} bordered={true} pagination={false} />
            </Row>
        </>
    )
}

export default BrowseKeberatan;