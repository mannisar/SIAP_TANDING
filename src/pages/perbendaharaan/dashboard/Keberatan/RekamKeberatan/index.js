import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Checkbox, Radio, Modal, useEffect, AutoComplete, Menu, Dropdown, DownOutlined, Link } from '../../../libraries/dependencies';

const customLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 0 }
};

const normalLayout = {
    labelCol: { span: 6 }, wrapperCol: { span: 22 }
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

// const tailLayoutExtraSmallCustom = {
//     wrapperCol: { span: 4, offset: 0 }
// };

const tailLayoutSpacing = {
    wrapperCol: { offset: 6, span: 4 }
};

const tailLayoutBtn = {
    wrapperCol: { offset: 6, span: 8 }
};

const { Option } = Select;
const { SubMenu } = Menu;

function RekamKeberatan(props) {
    const [form] = Form.useForm();
    const [detailPIBVisible, setDetailPIBVisible] = useState(false);
    const [jaminanPelunasanVisible, setJaminanPelunasanVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [optionsKeberatan, setOptionKeberatan] = useState([]);
    const [sengketaArr, setSengketaArr] = useState("");
    const menu = (
        <Menu onClick={(e) => setSengketaArr(e.item.props.children[1])}>
            <SubMenu title="Level 1">
                <Menu.Item>Level 2</Menu.Item>
                <Menu.Item>Level 2</Menu.Item>
            </SubMenu>
            <SubMenu title="Level 1">
                <SubMenu title="Level 2">
                    <Menu.Item aria-valuetext={"Level 3"}>Level 3</Menu.Item>
                    <Menu.Item>Level 3</Menu.Item>
                    <Menu.Item>Level 3</Menu.Item>
                    <Menu.Item>Level 3</Menu.Item>
                </SubMenu>
                <Menu.Item>Level 2</Menu.Item>
            </SubMenu>
        </Menu>
    );

    useEffect(() => {
        async function fetchData() {
            // ** Kode Kantor */
            let arrKantor = [];
            await fetch(process.env.REACT_APP_URL + "v1/kantor/all")
                .then(res => res.json())
                .then(data => data.data.map((item) => arrKantor.push({ value: item.kodeKantor })))
            await setOptions(arrKantor);

            // ** List Pungutan */
            let arrPungutan = []
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-pungutan")
                .then(res => res.json())
                .then(data => data.data.map((item) => arrPungutan.push({
                    kodeAkun: item.kodeAkun,
                    uraian: item.uraian,
                    key: arrPungutan.length === 0 ? 1 : arrPungutan.length + 1
                })))
            await setOptionKeberatan(arrPungutan);
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
        } else if (name.unique === "kodeKantorTujuan") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${value}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorTujuan: data.data.namaKantorPanjang }));
        }
    }

    const onFinish = values => {
        let loopObj = optionsKeberatan.map(({ kodeAkun, uraian, key }) => ({
            idAkun: parseInt(kodeAkun),
            idKeberatan: key,
            nilaiKeberatan: values[uraian] === undefined ? null : values[uraian],
        }))
        const bodyData = {
            listTdKeberatanNilai: loopObj,
            nipRekam: "string", // localStorage
            tdKeberatan: {
                alamat: values.alamat,
                alasan: values.alasan,
                flKriteria1: values.flKriteria1,
                flKriteria2: values.flKriteria2,
                flKriteria3: values.flKriteria3,
                flKriteria4: values.flKriteria4,
                flKriteria5: values.flKriteria5,
                flKriteria6: values.flKriteria6,
                flKriteria7: values.flKriteria7,
                flKriteria8: values.flKriteria8,
                flagJaminan: values.flagJaminan,
                idHeaderPenetapan: "string", // Cari
                idHeaderPib: "string",
                idPerusahaan: "string", // values.idPerusahaan || NPWP
                idProsesKeberatan: "string",
                kodeKantorMonitoring: values.kodeKantorMonitoring,
                kodeKantorPenerbit: values.kodeKantorPenerbit,
                kodeKantorTujuan: values.kodeKantorTujuan,
                noAgenda: values.noAgenda,
                noSuratPernyataan: "string",
                pokokSengketa3: sengketaArr,
                status: values.status
            }
        }
        fetch("http://10.162.71.119:9090/perbendaharaan/perben/keberatan/simpan-keberatan", {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));
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
        if (e.target.value === "Y") {
            form.setFieldsValue({ status: "Lengkap" });
        } else {
            form.setFieldsValue({ status: "Tidak Lengkap" });
        }
    }

    const secondColumnStart = Math.floor(optionsKeberatan.length / 2);

    return (
        <div hidden={props.hidden}>
            <Row>
                <h1 style={{ fontWeight: 'bold', fontSize: 24, paddingLeft: 16 }}>PEREKAMAN KEBERATAN</h1>
            </Row>
            <Row style={{ flexDirection: 'column' }}>
                <Row>
                    <Col span={24}>
                        <Form {...customLayout} form={form} labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ paddingLeft: 16 }}>
                            <Form.Item {...tailLayoutLarge} label="Kode Kantor Penerbit" style={{ marginBottom: 2 }} colon={false}>
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
                            <Form.Item {...tailLayoutLarge} label="Kode Kantor Monitoring" style={{ marginBottom: 2 }} colon={false}>
                                <Row gutter={8}>
                                    <Col span={6}>
                                        <Form.Item
                                            name="kodeKantorMonitoring"
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
                            <Form.Item  {...tailLayoutLarge} label="Kode Kantor Penerusan" colon={false}>
                                <Row gutter={8}>
                                    <Col span={6}>
                                        <Form.Item
                                            name="kodeKantorTujuan"
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
                                                onSelect={(value, option) => onSelect(value, option, { unique: "kodeKantorTujuan" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
                                        <Form.Item
                                            name="labelKantorTujuan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="noAgenda" label="Nomor Agenda Kantor" rules={[{ required: false }]} colon={false}>
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} label="No Surat Keberatan / Tanggal" colon={false}>
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
                            <Form.Item {...tailLayoutLarge} label="NPWP" colon={false}>
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
                            <Form.Item {...tailLayoutSmall} name="alamat" label="Alamat" rules={[{ required: false }]} colon={false}>
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item {...tailLayoutLarge} label="No Penetapan / Tanggal" colon={false}>
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
                            {/* <Form.Item {...tailLayoutExtraSmall} name="idPerusahaan" label="ID Perusahaan" rules={[{ required: false }]} colon={false}>
                                <Input />
                            </Form.Item> */}
                            <Form.Item {...tailLayoutMedium} label="No PIB / Tanggal PIB" colon={false}>
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
                            <Form.Item {...tailLayoutExtraSmall} label="Pokok Sengketa" colon={false}>
                                <Dropdown overlay={menu}>
                                    <Link className="ant-dropdown-link" to="#" onClick={e => e.preventDefault()} style={{ width: '100%' }}>
                                        Pilih Sengketa <DownOutlined style={{ display: 'inline-block' }} />
                                    </Link>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} label="Jaminan / Pelunasan" colon={false}>
                                <Row gutter={8} style={{ marginBottom: 2 }}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="flagJaminan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Select>
                                                <Option value="Jaminan">Jaminan</Option>
                                                <Option value="Pelunasan">Pelunasan</Option>
                                                <Option value="Tidak Wajib Meyerahkan Jaminan">Tidak Wajib Meyerahkan Jaminan</Option>
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
                                    // name=""
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <span>Nilai Keberatan</span>
                                </Form.Item>
                            </Form.Item>
                            {/** PEMBATAS */}
                            <Row gutter={8}>
                                <Col span={12}>
                                    {
                                        optionsKeberatan.slice(0, secondColumnStart).map((item) => (
                                            <Form.Item colon={false} wrapperCol={{ offset: 0, span: 8 }} labelCol={{ span: 12 }} label={item.uraian.length < 20 ? item.uraian : item.uraian.substring(0, 30) + "..."} key={item.key}>
                                                <Form.Item
                                                    name={item.uraian}
                                                    noStyle
                                                    rules={[{ required: false }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                            </Form.Item>
                                        ))
                                    }
                                </Col>
                                <Col span={12} style={{ textAlign: "right", display: 'block' }}>
                                    {
                                        optionsKeberatan.slice(secondColumnStart).map((item) => (
                                            <Form.Item colon={false} wrapperCol={{ offset: 0, span: 8 }} labelCol={{ span: 12 }} label={item.uraian.length < 20 ? item.uraian : item.uraian.substring(0, 30) + "..."} key={item.key}>
                                                <Form.Item
                                                    name={item.uraian}
                                                    noStyle
                                                    rules={[{ required: false }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                            </Form.Item>
                                        ))
                                    }
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <h1 style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 16 }}>CEK KELENGKAPAN BERKAS</h1>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form {...normalLayout} form={form} labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ paddingLeft: 16 }}>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <span>1. Ditulis dalam Bahasa Indonesia</span>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name="flKriteria1" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria2" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria3" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria4" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria5" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria6" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria7" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                        <Form.Item name="flKriteria8" style={{ float: 'right' }} rules={[{ required: false }]}>
                                            <Radio.Group
                                                onChange={onRadioBtn}
                                            >
                                                <Radio value="Y">Ya</Radio>
                                                <Radio value="T">Tidak</Radio>
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
                                    <Option value="Kembalikan">Kembalikan</Option>
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