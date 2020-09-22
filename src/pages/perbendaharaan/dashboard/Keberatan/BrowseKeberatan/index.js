import { React, UploadOutlined, Form, Row, Col, Input, DatePicker, Select, Button, message, Upload, useState, Modal, Table, useEffect, moment, Link } from '../../../libraries/dependencies';

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
    const [jenisDokumen, setJenisDokumen] = useState([]);
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
            dataIndex: 'tanggalSurat',
            key: 'tanggalSurat',
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
            align: 'center',
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
                </>
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 350,
            render: (data) =>
                <>
                    <Button type="primary" onClick={() => showModal({ name: "cabutModal", data: data })}>Cabut Keberatan</Button>
                    <span>&nbsp;</span>
                    <Button type="primary" onClick={() => showModal({ name: "editModal" })}><Link to={{ pathname: "/perbendaharaan/perekaman-keberatan", state: true }}>Edit</Link></Button>
                    <span>&nbsp;</span>
                    <Button type="primary" onClick={() => showModal({ name: "disposisiModal" })} disabled>Disposisi</Button>
                </>
        },
    ];

    const [dataBrowse, setDataBrowse] = useState([{
        no: '1',
        key: '1',
        noSurat: 'XXXX'
    }, {
        no: '2',
        key: '2',
        noSurat: 'XXXX'
    }]);

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
            align: 'center',
            render: text => <span aria-disabled={"true"}>{moment(text).format('DD-MM-YYYY')}</span>
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
                    <Button type="primary" onClick={() => showModal({ name: "pilihModal" })}>Pilih</Button>
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

    const onChangeNamaPejabat = async (val) => {
        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-pegawai?search=${val}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.length > 1) {
                    message.info("Data Yang di Masukkan Kurang Spesifik.");
                }
                form.setFieldsValue({ namaPejabat: data.data.data[0].namaPegawai });
            }).catch(err => message.error("[ERROR]: ", err))
    }

    function showModal(props) {
        if (props.name === "report") {
            setReportVisible(!reportVisible);
        } else if (props.name === "cabutModal") {
            const { npwp, idKeberatan, kantorPenerbit, alamat, jenisDokumen, tanggalDokumen } = props.data;
            form.setFieldsValue({
                npwp: npwp,
                idKeberatan: idKeberatan,
                KodeKantorPenerbit: kantorPenerbit,
                alamat: alamat,
                jenisPenetapan: jenisDokumen,
                tglPenetapan: moment(tanggalDokumen, "YYYY-MM-DD")
            })
            setCabutVisible(!cabutVisible);
        } else if (props.name === "editModal") {
            setEditVisible(!editVisible);
        } else if (props.name === "disposisiModal") {
            setDisposisiVisible(!disposisiVisible);
        } else if (props.name === "pilihModal") {
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


            /** Jenis Dokumen */
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-jenis-dokumen?keterangan=keberatan")
                .then(res => res.json())
                .then(data => setJenisDokumen(data.data));
        }
        fetchData();
    }, []);

    const onSimpanKeberatan = (bodyData) => {
        fetch("http://10.162.71.119:9090/perbendaharaan/perben/keberatan/simpan-pencabutan-keberatan", {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'res data simpan')
            })
            .catch(err => {
                console.log('[ERROR]:', err);
            });
    }

    const onFinish = () => {
        // Regex For Extension
        const nameFile = originFileObj.name
        const fileName = nameFile.substr(0, nameFile.lastIndexOf('.'))
        const extFileName = nameFile.substring(nameFile.lastIndexOf('.') + 1)
        // -----------------
        setLoading(!loading);
        form
            .validateFields()
            .then(async values => {
                const bodyData = {
                    tdKeputusanKeberatan: {
                        idKeberatan: values.idKeberatan,
                        kodeKantor: values.KodeKantorPenerbit,
                        nipPejabat: values.nipPejabat,
                        nmPejabat: values.namaPejabat,
                        noKep: values.noKeputusanPencabutan,
                        resumeKep: values.resumeKeputusan,
                        tglKepKeberatan: moment(values.tglKeputusanPencabutan).format('YYYY-MM-DD HH:mm:ss')
                    },
                    ttBerkas: {
                        namaFile: fileName,
                        typeFile: extFileName,
                        urlFile: "string"
                    }
                }

                setTimeout(() => {
                    onSimpanKeberatan(bodyData);
                    form.resetFields();
                    setOriginFileObj(null) // file upld.
                    setCabutVisible(false);
                    setLoading(false);
                    message.success("Data Terkirim!");
                }, 100)
            })
            .catch(err => {
                console.log('[ERROR]:', err);
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
            }
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
                            </Button>
                ]}
            >
                <Form form={form} labelAlign={"left"} size={"small"}>
                    <Form.Item name="idKeberatan" rules={[{ required: false }]} hidden>
                        <Input placeholder="idKeberatan" />
                    </Form.Item>
                    <Form.Item name="KodeKantorPenerbit" rules={[{ required: false }]} hidden>
                        <Input placeholder="KodeKantorPenerbit" />
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="nipPejabat"
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <Input onChange={(e) => onChangeNamaPejabat(e.target.value)} placeholder="nip pejabat" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="namaPejabat"
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <Input placeholder="nama pejabat" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
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
                                        {jenisDokumen.map((item) => (
                                            <Option value={item.kodeDokumen} key={item.kodeDokumen}>{item.uraianDokumen}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="tglPenetapan"
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <DatePicker style={{ width: '100%' }} placeholder="tanggal penetapan" format={'DD-MM-YYYY'} />
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
                                    name="noKeputusanPencabutan"
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <Input placeholder="nomor keputusan pencabutan" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="tglKeputusanPencabutan"
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <DatePicker style={{ width: '100%' }} placeholder="tanggal pencabutan" format={'DD-MM-YYYY'} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="resumeKeputusan" rules={[{ required: false }]}>
                        <Input placeholder="resume keputusan" />
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
            </Modal>
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
    )
}

export default BrowseKeberatan;