import { React, Form, Row, Col, Input, DatePicker, Select, Button, Table } from '../../../libraries/dependencies';

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

// const tailLayoutMedium = {
//     wrapperCol: { span: 12 }
// };

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

function RekamRiwayatSidang(props) {
    const [form] = Form.useForm();
    const columns_petugas_sidang = [
        {
            title: 'No',
            dataIndex: 'no',
            align: 'center',
            width: 50
        },
        {
            title: 'Nip',
            dataIndex: 'nip',
            align: 'center'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            align: 'center'
        },
        {
            title: 'Jabatan',
            dataIndex: 'jabatan',
            align: 'center'
        },
        {
            title: 'Pangkat/Gol',
            dataIndex: 'pangkatOrGolongan',
            align: 'center'
        },
    ];

    const data_petugas_sidang = [
        {
            key: '1',
            no: '1',
            nip: 'XXXXX',
            nama: 'Salman',
            jabatan: 'Hanya Manusia Biasa di Mata Allah',
            pangkatOrGolongan: 'III-A'
        },
        {
            key: '2',
            no: '2',
            nip: 'XXXXX',
            nama: 'Mawar',
            jabatan: 'Pemeriksa Bea dan Cukai Pertama',
            pangkatOrGolongan: 'III-A'
        },
    ];

    const columns_agenda_sidang = [
        {
            title: 'No',
            dataIndex: 'no',
            align: 'center',
            width: 50
        },
        {
            title: 'Nip',
            dataIndex: 'nip',
            align: 'center'
        },
        {
            title: 'Surat Panggilan',
            dataIndex: 'suratPanggilan',
            align: 'center'
        },
        {
            title: 'No Sengketa Pajak',
            dataIndex: 'noSengketaPajak',
            align: 'center'
        },
        {
            title: 'Pemohon',
            dataIndex: 'pemohon',
            align: 'center'
        },
        {
            title: 'No Objek Banding / Gugatan',
            dataIndex: 'noObjekBandingGugatan',
            align: 'center'
        },
        {
            title: 'Tgl Objek Banding / Gugatan',
            dataIndex: 'tglObjekBandingGugatan',
            align: 'center'
        },
        {
            title: 'Pokok Sengketa',
            dataIndex: 'pokokSengketa',
            align: 'center'
        },
        {
            title: 'Nip PIC',
            dataIndex: 'nipPIC',
            align: 'center'
        },
        {
            title: 'Nama PIC',
            dataIndex: 'namaPIC',
            align: 'center'
        },
        {
            title: 'Sidang Ke-',
            dataIndex: 'sidangKe',
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center'
        },
        {
            title: 'Tanggal Sidang Berikutnya',
            dataIndex: 'tglSidangNext',
            align: 'center'
        },
        {
            title: 'Agenda Sidang',
            dataIndex: 'agendaSidang',
            align: 'center'
        },
    ];

    const data_agenda_sidang = [
        {
            key: '1',
            no: '1',
            nip: 'XXXXX',
            suratPanggilan: 'Salman',
            noSengketaPajak: 'Hanya Manusia Biasa di Mata Allah',
            pemohon: 'XXXXX',
            noObjekBandingGugatan: 'XXXXX',
            tglObjekBandingGugatan: 'XXXXX',
            pokokSengketa: 'XXXXX',
            nipPIC: 'XXXXX',
            namaPIC: 'XXXXX',
            sidangKe: 'XXXXX',
            status: 'XXXXX',
            tglSidangNext: 'XXXXX',
            agendaSidang: 'XXXXX',
        },
        {
            key: '2',
            no: '2',
            nip: 'XXXXX',
            suratPanggilan: 'Mawar',
            noSengketaPajak: 'Hanya Manusia Biasa di Mata Allah',
            pemohon: 'XXXXX',
            noObjekBandingGugatan: 'XXXXX',
            tglObjekBandingGugatan: 'XXXXX',
            pokokSengketa: 'XXXXX',
            nipPIC: 'XXXXX',
            namaPIC: 'XXXXX',
            sidangKe: 'XXXXX',
            status: 'XXXXX',
            tglSidangNext: 'XXXXX',
            agendaSidang: 'XXXXX',
        },
    ];

    const columns_pejabatTTD = [
        {
            title: 'No',
            dataIndex: 'no',
            align: 'center',
            width: 50
        },
        {
            title: 'Nip',
            dataIndex: 'nip',
            align: 'center'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            align: 'center'
        },
        {
            title: 'Jabatan',
            dataIndex: 'jabatan',
            align: 'center'
        },
        {
            title: 'Peran',
            dataIndex: 'peran',
            align: 'center'
        },
    ];

    const data_pejabatTTD = [
        {
            key: '1',
            no: '1',
            nip: 'XXXXX',
            nama: 'Salman',
            jabatan: 'Pemeriksa Bea dan Cukai Madya',
            peran: 'Koordinatior'
        },
        {
            key: '2',
            no: '2',
            nip: 'XXXXX',
            nama: 'Mawar',
            jabatan: 'Pemeriksa Bea dan Cukai Muda',
            peran: 'Supervisor'
        },
        {
            key: '3',
            no: '3',
            nip: 'XXXXX',
            nama: 'Matahari',
            jabatan: 'Kasubdit/Kabid (ES III)',
            peran: 'Mengetahui'
        },
    ];

    const onFinish = values => {
        console.log(values, 'response!');
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div hidden={props.hidden}>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>PEREKAMAN RIWAYAT SIDANG</h1>
            </Row>
            <Row>
                <Col span={24}>
                    <Form {...normalLayout} form={form} name="first-form" labelAlign={"left"} size={"small"} onFinish={onFinish}>
                        <Form.Item {...tailLayoutExtraSmall} label="Kantor Penanganan Sidang" name="kantorPenanganSidang" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="jenisSidang" label="Jenis Sidang" rules={[{ required: false }]}>
                            <Select>
                                <Option value="Banding">Banding</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="majelsBandingGugatan" label="Majelis Banding / Gugatan" rules={[{ required: false }]}>
                            <Select>
                                <Option value="XVIIA">XVIIA</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayoutExtraSmall} name="tglSidang" label="Tanggal Sidang" rules={[{ required: false }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="No / Tgl Surat Tugas" >
                            <Row gutter={4}>
                                <Col span={12}>
                                    <Form.Item
                                        name="noSuratTugas"
                                        noStyle
                                        rules={[{ required: false }]}
                                        initialValue="ST-"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="tglSuratTugas"
                                        noStyle
                                        rules={[{ required: false }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="Petugas Sidang">
                            <Table
                                columns={columns_petugas_sidang}
                                dataSource={data_petugas_sidang}
                                pagination={false}
                                size={"small"}
                                bordered={true}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayoutLarge} label="Agenda Sidang">
                            <Table
                                columns={columns_agenda_sidang}
                                dataSource={data_agenda_sidang}
                                pagination={false}
                                size={"small"}
                                bordered={true}
                                scroll={{ x: 1500 }}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayoutSmall} label="PejabatTTD">
                            <Table
                                columns={columns_pejabatTTD}
                                dataSource={data_pejabatTTD}
                                pagination={false}
                                size={"small"}
                                bordered={true}
                            />
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

export default RekamRiwayatSidang;