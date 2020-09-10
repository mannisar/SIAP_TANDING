import { React, useState, Form, Input, DatePicker, Row, Col, Select, Button, Checkbox, Radio, Modal, useEffect, AutoComplete, TreeSelect, message, Alert, moment } from '../../../libraries/dependencies';
import { pungutanKeberatan } from "../../../assets/dummy/pungutanKeberatan";

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

const tailLayoutExtraSmallCustom = {
    wrapperCol: { span: 4, offset: 0 }
};

const tailLayoutSpacing = {
    wrapperCol: { offset: 6, span: 4 }
};

const tailLayoutBtn = {
    wrapperCol: { offset: 6, span: 8 }
};

const { Option } = Select;
const { TreeNode } = TreeSelect;

function RekamKeberatan() {
    const [form] = Form.useForm();
    const [detailPIBVisible, setDetailPIBVisible] = useState(false);
    const [jaminanPelunasanVisible, setJaminanPelunasanVisible] = useState(false);
    const [options, setOptions] = useState([]);
    // const [optionsNpwp, setOptionsNpwp] = useState([]);
    const [optionsKeberatan/*, setOptionKeberatan*/] = useState(pungutanKeberatan);
    const [optionPokokSengketa, setOptionPokokSengketa] = useState([]);
    const [value, setValue] = useState(undefined);
    const [isNpwp, setIsNpwp] = useState(false);
    const [jenisDokumen, setJenisDokumen] = useState([]);

    useEffect(() => {
        // ** Fetch Data */
        async function fetchData() {
            // ** Kode Kantor */
            let arrKantor = [];
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor")
                .then(res => res.json())
                .then(data => data.data.map((item) => arrKantor.push({ value: `${item.kodeKantor} - ${item.namaKantorPendek}` })))
            await setOptions(arrKantor);

            // ** List Pungutan */
            // let arrPungutan = []
            // await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-pungutan")
            //     .then(res => res.json())
            //     .then(data => data.data.map((item) => arrPungutan.push({
            //         kodeAkun: item.kodeAkun,
            //         uraian: item.uraian,
            //         key: arrPungutan.length === 0 ? 1 : arrPungutan.length + 1
            //     })))
            // await setOptionKeberatan(arrPungutan);

            /** Jenis Dokumen */
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-jenis-dokumen?keterangan=JENIS%20DOKUMEN")
                .then(res => res.json())
                .then(data => setJenisDokumen(data.data));
        }
        fetchData();

        // ** Set Default Kelengkapan Berkas */
        form.setFieldsValue({
            status: "Lengkap",
            flKriteria1: "Y",
            flKriteria2: "Y",
            flKriteria3: "Y",
            flKriteria4: "Y",
            flKriteria5: "Y",
            flKriteria6: "Y",
            flKriteria7: "Y",
            flKriteria8: "Y",
        });

        /** Pokok Sengketa */
        async function getPK() {
            const treeData = [];
            // TINGKAT 1
            // =========
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=1")
                .then(res => res.json())
                .then(data => data.data.map((item) => treeData.push({ title: item.namaObjekKeberatan, value: item.idObjekKeberatan })));
            for (let x = 0; x < treeData.length; x++) {
                // TINGKAT 2
                // =========
                if (x === 1) { // Pokok Sengketa 1
                    // ------------ Level 2
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua;
                    // ------------- Level 3 Sengketa 4
                    let LevelTiga = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=3&pokokSengketa=${4}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelTiga.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa3
                            })
                        ));
                    treeData[x - 1].LevelDua[3].LevelTiga = LevelTiga
                    // ------------- Level 4 Sengketa 4
                    let LevelEmpat = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=4&pokokSengketa=${4}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelEmpat.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa4
                            })
                        ));
                    treeData[x - 1].LevelDua[3].LevelTiga[0].LevelEmpat = LevelEmpat
                } else if (x === 2) { // Pokok Sengketa 2
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua;
                } else if (x === 3) { // Pokok Sengketa 3
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua;
                } else if (x === 4) { // Pokok Sengketa 4
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua
                }
                else if (x === 5) { // Pokok Sengketa 5
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua;
                }
                else if (x === 6) { // Pokok Sengketa 6
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua;
                }
                else if (x === 7) { // Pokok Sengketa 7
                    let LevelDua = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            LevelDua.push({
                                title: item.uraian,
                                value: item.kodePokokSengketa2
                            })
                        ));
                    treeData[x - 1].LevelDua = LevelDua;
                } else {
                    // null
                }
            }
            await setOptionPokokSengketa(treeData);
        }
        getPK()
        console.log("000001/009000/2020".split('/')[2].replace("000001/009000/2020".split('/')[2], "2011"))
    }, []);

    function onSelect(value, option, name) {
        let val = value.substring(0, 6)
        if (name.unique === "kodeKantorPenerbit") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${val}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorPenerbit: data.data.namaKantorPanjang }), form.setFieldsValue({ kodeKantorPenerbit: val })); // setSaveKodeKantorPenerbit(val)
        } else if (name.unique === "kodeKantorMonitoring") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${val}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorMonitoring: data.data.namaKantorPanjang }), form.setFieldsValue({ kodeKantorMonitoring: val }));
            fetch(`http://10.162.71.119:9090/perbendaharaan/perben/keberatan/no-agenda-kantor?kodeKantor=${val}`)
                .then(res => res.json())
                .then(data => form.setFieldsValue({ noAgendaKantor: data.data.noAgenda, tglAgendaKantor: moment() }))
                .catch(err => {
                    if (err) form.setFieldsValue({ noAgendaKantor: `000001/${val}/2020`, tglAgendaKantor: moment() });
                })
        } else if (name.unique === "kodeKantorTujuan") {
            fetch(process.env.REACT_APP_URL + `v1/kantor/${val}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorTujuan: data.data.namaKantorPanjang }), form.setFieldsValue({ kodeKantorTujuan: val }));
        }
    }

    const onFinish = values => {
        let loopObj = optionsKeberatan.map(({ kodeAkun, uraian }) => ({
            idAkun: parseInt(kodeAkun),
            nilaiKeberatan: values[uraian], // values[uraian] === undefined ? null : values[uraian]
        }))
        loopObj = loopObj.filter(item => item.nilaiKeberatan !== undefined);
        for (let x = 0; x < loopObj.length; x++) {
            loopObj[x].idKeberatan = x + 1
        }
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
                idHeaderPenetapan: values.idHeaderPenetapan, // Jenis Dokumen || GET /perben/piutang/get-data-browse dan Refrensi
                idHeaderPib: "string", // GET /perben/piutang/get-data-browse
                idPerusahaan: values.idPerusahaan, // values.idPerusahaan || NPWP
                kodeKantorMonitoring: values.kodeKantorMonitoring,
                kodeKantorPenerbit: values.kodeKantorPenerbit,
                kodeKantorTujuan: values.kodeKantorTujuan,
                noAgenda: values.noAgendaKantor, // dari get browse data keberatan
                noSuratPernyataan: values.noSuratPernyataan,
                pokokSengketa3: values.pokokSengketa3,
                status: values.status,
                tglAgenda: moment(values.tglAgendaKantor).format('YYYY-MM-DD'),
                tglJatuhTempo: values.tglJatuhTempo
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
            .then(data => {
                form.resetFields();
                form.setFieldsValue({
                    status: "Lengkap",
                    flKriteria1: "Y",
                    flKriteria2: "Y",
                    flKriteria3: "Y",
                    flKriteria4: "Y",
                    flKriteria5: "Y",
                    flKriteria6: "Y",
                    flKriteria7: "Y",
                    flKriteria8: "Y",
                });
                setHiddenSearch(true);
                message.success("Data Berhasil di Tambahkan!");
            })
            .catch(err => message.error("Data Gagal di Kirimkan!"));
        console.log(bodyData, 'ini body')
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

    const onChange = val => {
        if (val.length > 1) { return message.info("Maksimal 1 Sengketa Yang diPilih!") }
        setValue(val);
    };

    const [inputSengketa, setInputSengketa] = useState(true);
    const onSelectSengketa = async (value, label, extra) => {
        if (value === "LAINNYA") {
            setInputSengketa(!inputSengketa);
            setValue([]);
            form.setFieldsValue({ pokokSengketa3: "" });
        } else {
            setInputSengketa(true);
            form.setFieldsValue({ pokokSengketa3: value });
        }
    }

    const [messageSearch, setMessageSearch] = useState("");
    const [typeSearch, setTypesSearch] = useState("");
    const [hiddenSearch, setHiddenSearch] = useState(false);
    const onSearch = async ({ value, name }) => {
        if (name === "onInput") {
            await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data.data.length > 1) {
                        setMessageSearch(`Data Yang di Masukkan Kurang Spesifik.`);
                        setTypesSearch("info");
                        setHiddenSearch(true);
                    }
                    setMessageSearch(`Data NPWP Yang di Maksud: ${data.data.data[0].npwp}.`);
                    setTypesSearch("success");
                    setHiddenSearch(true);
                    form.setFieldsValue({ idPerusahaan: data.data.data[0].idPerusahaan });
                }).catch(err => {
                    if (err) {
                        setMessageSearch("Data Tidak di Temukan!");
                        setTypesSearch("error");
                        setHiddenSearch(true);
                    }
                })
        } else if (name === "onPenetapan") {
            await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data.data.length > 1) {
                        setMessageSearch(`Data Yang di Masukkan Kurang Spesifik.`);
                        setTypesSearch("info");
                        setHiddenSearch(true);
                    }
                    setMessageSearch(`Data NPWP Yang di Maksud: ${data.data.data[0].npwp}.`);
                    setTypesSearch("success");
                    setHiddenSearch(true);
                    form.setFieldsValue({ idPerusahaan: data.data.data[0].idPerusahaan, npwp: data.data.data[0].npwp });
                }).catch(err => {
                    if (err) {
                        setMessageSearch("Data Tidak di Temukan!");
                        setTypesSearch("error");
                        setHiddenSearch(true);
                    }
                })
        }
    }

    const onCheckbox = e => {
        if (e.target.checked === true) {
            setIsNpwp(true);
        } else {
            setIsNpwp(false);
        }
    }

    const onPenetapan = () => {
        const noPenetapan = form.getFieldValue("noPenetapan")
        const tglPenetapan = moment(form.getFieldValue("tglPenetapan")).format('YYYY-MM-DD');
        const noDokumen = form.getFieldValue("jenisDokumen");
        fetch(`http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-browse?browse=${noPenetapan}&tanggalDokumen=${tglPenetapan}&jenisDokumen=${noDokumen}`)
            .then(res => res.json())
            .then(async data => {
                form.setFieldsValue({
                    kodeKantorMonitoring: data.data[0].kodeKantorMonitoring || "", // || data.data[0].kantorMonitor
                    kodeKantorPenerbit: data.data[0].kodeKantorPenerbit || "", // || data.data[0].kantorPenerbit
                    kodeKantorTujuan: data.data[0].kodeKantorTujuan || "", // || data.data[0].kantorTujuan
                    idHeaderPenetapan: data.data[0].idHeader,
                    alamat: data.data[0].alamatPerusahaan,
                    tglJatuhTempo: data.data[0].tanggalJatuhTempo.split(' ')[0]
                });
                onSearch({ value: data.data[0].npwpPerusahaan, name: "onPenetapan" });
                onSelect(data.data[0].kodeKantorPenerbit || "", null, { unique: "kodeKantorPenerbit" });
                onSelect(data.data[0].kodeKantorMonitoring || "", null, { unique: "kodeKantorMonitoring" });
                onSelect(data.data[0].kodeKantorTujuan || "", null, { unique: "kodeKantorTujuan" });
                message.success("Data di Temukan!");
            })
            .catch(err => message.error("Data Tidak di Temukan!"))
    }

    const secondColumnStart = Math.floor(optionsKeberatan.length / 2);

    return (
        <>
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
                                            rules={[{ required: true, message: "Kode Kantor Penerbit Tidak Boleh Kosong!" }]}
                                        >
                                            <AutoComplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                dropdownMatchSelectWidth={350}
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
                                            rules={[{ required: true, message: "Kode Kantor Monitoring Tidak Boleh Kosong!" }]}
                                        >
                                            <AutoComplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                dropdownMatchSelectWidth={350}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelect(value, option, { unique: "kodeKantorMonitoring" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
                                        <Form.Item
                                            name="labelKantorMonitoring"
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
                                            rules={[{ required: true, message: "Kode Kantor Penerusan Tidak Boleh Kosong!" }]}
                                        >
                                            <AutoComplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                dropdownMatchSelectWidth={350}
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
                            <Form.Item {...tailLayoutSmall} label="Nomor Agenda Kantor" colon={false}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="noAgendaKantor"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="tglAgendaKantor"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker style={{ width: '100%' }} format={'YYYY/MM/DD'} />
                                        </Form.Item>
                                    </Col>
                                </Row>
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
                                            <DatePicker style={{ width: '100%' }} format={'YYYY/MM/DD'} />
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
                                            <Input placeholder="Masukkan NPWP" onChange={(e) => onSearch({ value: e.target.value, name: "onInput" })} />
                                        </Form.Item>
                                        <Alert message={messageSearch} type={typeSearch} hidden={hiddenSearch} style={{ position: hiddenSearch ? 'relative' : 'absolute' }} />
                                    </Col>
                                    <Col span={12}>
                                        {/* <Form.Item
                                            name="isNpwp"
                                            noStyle
                                            rules={[{ required: true, message: "NPWP Tidak Boleh Kosong!" }]}
                                        > */}
                                        <Checkbox onChange={onCheckbox} checked={isNpwp}><span style={{ fontSize: 12 }}>* Bukan NPWP (BARKIR / Contoh -KTP)</span></Checkbox>
                                        {/* </Form.Item> */}
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="idPerusahaan" label="idPerusahaan" rules={[{ required: false }]} colon={false} hidden={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="alamat" label="Alamat" rules={[{ required: false }]} colon={false}>
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="idHeaderPenetapan" label="idHeaderPenetapan" rules={[{ required: false }]} colon={false} hidden={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="tglJatuhTempo" label="tglJatuhTempo" rules={[{ required: false }]} colon={false} hidden={true}>
                                <input type="date" />
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
                                            <Select dropdownMatchSelectWidth={300}>
                                                {jenisDokumen.map((item) => (
                                                    <Option value={item.kodeDokumen} key={item.kodeDokumen}>{item.uraianDokumen}</Option>
                                                ))}
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
                                            <DatePicker style={{ width: '100%' }} format={'YYYY/MM/DD'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Button type="info" htmlType="button" style={{ width: '100%' }} onClick={onPenetapan}>
                                            Cari
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
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
                                            <DatePicker style={{ width: '100%' }} format={'YYYY/MM/DD'} />
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
                            <Form.Item {...tailLayoutSmall} label="Pokok Sengketa" colon={false}>
                                <TreeSelect
                                    // showSearch
                                    style={{ width: '100%' }}
                                    value={value}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Pilih atau Cari Sengketa.."
                                    allowClear
                                    multiple
                                    // treeDefaultExpandAll
                                    onChange={onChange}
                                    onSelect={onSelectSengketa}
                                    name="pokokSengketa3"
                                >
                                    {optionPokokSengketa && optionPokokSengketa.map((item) => (
                                        <TreeNode value={item.title} title={<b>{item.title}</b>} key={item.title}>
                                            {item.LevelDua && item.LevelDua.map((item_dua) => (
                                                <TreeNode value={item_dua.title} title={item_dua.title} key={item_dua.title}>
                                                    {item_dua.LevelTiga !== undefined ?
                                                        item_dua.LevelTiga.map((item_tiga) => (
                                                            <TreeNode value={item_tiga.title} title={item_tiga.title} key={item_tiga.title}>
                                                                {item_tiga.LevelEmpat !== undefined ?
                                                                    item_tiga.LevelEmpat.map((item_empat) => (
                                                                        <TreeNode value={item_empat.title} title={item_empat.title} key={item_empat.title} />
                                                                    ))
                                                                    : null}
                                                            </TreeNode>
                                                        ))
                                                        : null}
                                                </TreeNode>
                                            ))}
                                        </TreeNode>
                                    ))}
                                </TreeSelect>
                                <Form.Item {...tailLayoutMedium} name="pokokSengketa3" rules={[{ required: false }]} colon={false} hidden={inputSengketa} style={{ marginTop: 18, marginBottom: 0 }}>
                                    <Input placeholder="Input Manual" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item {...tailLayoutLarge} label="Jaminan / Pelunasan" colon={false}>
                                <Row gutter={8}>
                                    <Col span={6}>
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
                                    <Col span={6}>
                                        <Form.Item
                                            name="noSuratPernyataan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={form.getFieldValue("flagJaminan") === "Tidak Wajib Meyerahkan Jaminan" ? "tglSuratPernyataan" : ""}
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker style={{ width: '100%' }} format={'YYYY/MM/DD'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
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
                            </Form.Item>
                            {/** Nilai Keberatan */}
                            <Form.Item {...tailLayoutSpacing} style={{ textAlign: 'center' }}>
                                <Form.Item
                                    name="NKBBatas"
                                    noStyle
                                    rules={[{ required: false }]}
                                >
                                    <span>Nilai Keberatan</span>
                                </Form.Item>
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    {
                                        optionsKeberatan.slice(0, secondColumnStart).map((item) => (
                                            <Form.Item colon={false} {...tailLayoutExtraSmallCustom} wrapperCol={{ offset: 0, span: 8 }} labelCol={{ span: 12 }} label={item.uraian} key={/**item.kodeAkun */item.uraian}>
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
                                            <Form.Item colon={false} {...tailLayoutExtraSmallCustom} wrapperCol={{ offset: 0, span: 8 }} labelCol={{ span: 12 }} label={item.uraian} key={/**item.kodeAkun */item.uraian}>
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
                            {/** Nilai Keberatan */}
                        </Form>
                    </Col >
                </Row >
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
        </>
    )
}

export default RekamKeberatan;