import { React, useState, useLocation, Form, Input, DatePicker, Row, Col, Select, Button, Checkbox, Radio, Modal, useEffect, AutoComplete, message, Alert, moment, InputNumber, TreeSelect, Upload, UploadOutlined } from '../../../libraries/dependencies';

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
// const { TreeNode } = TreeSelect;

function RekamKeberatan() {
    const [form] = Form.useForm();
    const [detailPIBVisible, setDetailPIBVisible] = useState(false);
    const [jaminanPelunasanVisible, setJaminanPelunasanVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [optionsKeberatan, setOptionKeberatan] = useState([]);
    const [optionsKeberatanFromTarik, setOptionKeberatanFromTarik] = useState([]);
    const [optionPokokSengketa, setOptionPokokSengketa] = useState([]);
    const [value, setValue] = useState(undefined);
    const [isNpwp, setIsNpwp] = useState(false);
    const [jenisDokumen, setJenisDokumen] = useState([]);
    const [params, setParams] = useState(false);

    const disabledComponent = {
        disabled: params
    }
    const location = useLocation();
    useEffect(() => {
        if (location.state === undefined && location.state === null) return undefined;
        if (location.state) {
            setParams(!params);
        }
        // ** Fetch Data */
        async function fetchData() {
            // ** Kode Kantor */
            let arrKantor = [];
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor")
                .then(res => res.json())
                .then(data => data.data.map((item) => arrKantor.push({ value: `${item.kodeKantor} - ${item.namaKantorPendek}` })))
            await setOptions(arrKantor);

            // ** List Pungutan */
            let arrPungutan = []
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-pungutan")
                .then(res => res.json())
                .then(data => data.data.map((item) => arrPungutan.push({
                    kodeAkun: item.kodeAkun,
                    uraian: item.uraian,
                })))
            await setOptionKeberatan(arrPungutan);
            await setOptionKeberatanFromTarik(arrPungutan);

            /** Jenis Dokumen */
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-jenis-dokumen?keterangan=keberatan")
                .then(res => res.json())
                .then(data => setJenisDokumen(data.data));


            /** Pokok Sengketa */
            const treeData = [];
            await fetch("http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=1")
                .then(res => res.json())
                .then(data => data.data.map((item) => treeData.push({ title: item.namaObjekKeberatan, value: item.idObjekKeberatan })));
            // ----------------------------------------
            for (let x = 1; x < treeData.length; x++) {
                if (x === 1) {
                    let arrSptnp = [];
                    let psIdPokok1 = [];
                    let psIdPokok2 = [];
                    let psIdPokok3 = [];
                    let psSatu = [];
                    let psDua = [];
                    let objTingkatDua = {};
                    let objTingkatTiga = {};
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => arrSptnp.push(data.data))
                    arrSptnp[0].slice(0, 4).map((item) =>
                        psSatu.push({
                            title: item.detilUraian1,
                            value: item.idPokokSengketaKeberatan + 99 //for unique
                        })
                    )
                    treeData[x - 1].children = psSatu;
                    // ------------------------------
                    let arrTarifUrai2 = [];
                    let arrNilaiPabUrai2 = [];
                    let arrTarifDanPabUrai2 = [];
                    // let arrFTAUrai2 = [];
                    arrSptnp[0].map((item) => {
                        if (item.detilUraian1 === "TARIF") {
                            arrTarifUrai2.push({
                                title: item.detilUraian2,
                                value: item.idPokokSengketaKeberatan
                            });
                            treeData[x - 1].children[0].children = arrTarifUrai2;
                        }
                        if (item.detilUraian1 === "NILAI PABEAN") {
                            arrNilaiPabUrai2.push({
                                title: item.detilUraian2,
                                value: item.idPokokSengketaKeberatan
                            });
                            treeData[x - 1].children[1].children = arrNilaiPabUrai2;
                        }
                        if (item.detilUraian1 === "TARIF DAN PABEAN") {
                            arrTarifDanPabUrai2.push({
                                title: item.detilUraian2 === null ? "-" : item.detilUraian2,
                                value: item.idPokokSengketaKeberatan
                            });
                            treeData[x - 1].children[2].children = arrTarifDanPabUrai2;
                        }
                        // if (item.detilUraian1 === "FTA") {
                        //     arrFTAUrai2.push({
                        //         title: item.detilUraian2,
                        //         value: item.idPokokSengketaKeberatan
                        //     })
                        //     treeData[x - 1].children[3].children = arrFTAUrai2;
                        // }
                        if (item.detilUraian1 === "FTA") {
                            objTingkatDua[item.detilUraian2] = objTingkatDua[item.detilUraian2]
                        }
                        if (item.detilUraian2 === item.detilUraian2) {
                            objTingkatTiga[item.detilUraian3] = objTingkatTiga[item.detilUraian3]
                        }
                    })
                    // ------------------------------
                    for (let xyz = 12; xyz < 46; xyz++) {
                        if (xyz % 3 === 0) {
                            psIdPokok1.push(xyz)
                        }
                        if ((xyz + 1) % 3 === 0) {
                            psIdPokok2.push(xyz)
                        }
                        if ((xyz + 2) % 3 === 0) {
                            psIdPokok3.push(xyz)
                        }
                    }
                    // ------------------------------
                    for (let y = 0; y < Object.keys(objTingkatDua).length; y++) {
                        psDua.push({
                            title: Object.keys(objTingkatDua)[y],
                            value: "30" + y
                        })
                    }
                    treeData[x - 1].children[3].children = psDua;
                    for (let z = 0; z < Object.keys(objTingkatDua).length; z++) {
                        treeData[x - 1].children[3].children[z].children = [{
                            title: Object.keys(objTingkatTiga)[1],
                            value: psIdPokok1[z]
                        }, {
                            title: Object.keys(objTingkatTiga)[2],
                            value: psIdPokok2[z]
                        }, {
                            title: Object.keys(objTingkatTiga)[3],
                            value: psIdPokok3[z]
                        }]
                    }
                    // ------------------------------
                    treeData[x - 1].children[3].children[11].children = [{
                        title: "LAINNYA",
                        value: "LAINNYA"
                    }]
                } else if (x === x) {
                    let psSatu = [];
                    await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/objek-keberatan?tingkat=2&pokokSengketa=${x}`)
                        .then(res => res.json())
                        .then(data => data.data.map((item) =>
                            psSatu.push({
                                title: item.detilUraian1,
                                value: item.idPokokSengketaKeberatan
                            })
                        ));
                    treeData[x - 1].children = psSatu;
                }
            }
            await setOptionPokokSengketa(treeData);
        }
        fetchData();

        // ** Set Field Value */
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

        // eslint-disable-next-line
    }, [location.state]);

    function generateSequence(noAgenda) {
        const result = noAgenda.split("/")
        const first = parseInt(result[0]) + 1 // seq
        const second = result[1] // agenda kantor
        const three = result[2] // year now

        if (String(first).length === 1) {
            return `${"00000" + first}/${second}/${three}`
        } else if (String(first).length === 2) {
            return `${"0000" + first}/${second}/${three}`
        } else if (String(first).length === 3) {
            return `${"000" + first}/${second}/${three}`
        } else if (String(first).length === 4) {
            return `${"00" + first}/${second}/${three}`
        } else if (String(first).length === 5) {
            return `${"0" + first}/${second}/${three}`
        } else {
            return `${first}/${second}/${three}`
        }
    }

    const [visibleTanggalAgendaKantor, setVisibleTanggalAgendaKantor] = useState(true);
    function onSelectKodeKantor(value, option, name) {
        const kodeKantor = value.substring(0, 6); // Character Ke 1 - 6
        const yearNow = moment().format('YYYY');
        if (name.unique === "kodeKantorPenerbit") {
            fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor?search=${kodeKantor}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorPenerbit: data.data[0].namaKantorPanjang }), form.setFieldsValue({ kodeKantorPenerbit: kodeKantor }));
        } else if (name.unique === "kodeKantorMonitoring") {
            fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor?search=${kodeKantor}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorMonitoring: data.data[0].namaKantorPanjang }), form.setFieldsValue({ kodeKantorMonitoring: kodeKantor }));
            fetch(`http://10.162.71.119:9090/perbendaharaan/perben/keberatan/no-agenda-kantor?kodeKantor=${kodeKantor}&tahun=${yearNow}`)
                .then(res => res.json())
                .then(data => form.setFieldsValue({ noAgendaKantor: generateSequence(data.data.noAgenda), tglAgendaKantor: moment() }))
                .catch(err => {
                    if (err) form.setFieldsValue({ noAgendaKantor: `000001/${kodeKantor}/2020`, tglAgendaKantor: moment() });
                })
            setVisibleTanggalAgendaKantor(false);
        } else if (name.unique === "kodeKantorTujuan") {
            fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor?search=${kodeKantor}`) // GET KANTOR GROUP BY KODE
                .then(res => res.json())
                .then(data => form.setFieldsValue({ labelKantorTujuan: data.data[0].namaKantorPanjang }), form.setFieldsValue({ kodeKantorTujuan: kodeKantor }));
        }
    }

    async function onSetKodeKantorPenerbit(kodeKantor) {
        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor?search=${kodeKantor}`)
            .then(res => res.json())
            .then(data => form.setFieldsValue({ labelKantorPenerbit: data.data[0].namaKantorPanjang, kodeKantorPenerbit: data.data[0].kodeKantor }));
    }

    async function onSetKodeKantorMonitoring(kodeKantor) {
        const yearNow = moment().format('YYYY');
        const getKodeNow = [];
        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor?search=${kodeKantor}`)
            .then(res => res.json())
            .then(data => {
                form.setFieldsValue({ labelKantorMonitoring: data.data[0].namaKantorPanjang, kodeKantorMonitoring: data.data[0].kodeKantor });
                getKodeNow.push(data.data[0].kodeKantor);
            });

        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/keberatan/no-agenda-kantor?kodeKantor=${getKodeNow[0]}&tahun=${yearNow}`)
            .then(res => res.json())
            .then(data => form.setFieldsValue({ noAgendaKantor: generateSequence(data.data.noAgenda), tglAgendaKantor: moment() }))
            .catch(err => {
                if (err) form.setFieldsValue({ noAgendaKantor: `000001/${getKodeNow[0]}/2020`, tglAgendaKantor: moment() });
            })
        await setVisibleTanggalAgendaKantor(false);
    }

    const onTanggalAgendaKantor = (date, dateString) => {
        if (date === null) return null;
        const yearNow = date.format('YYYY') || "";
        const noAgenda = form.getFieldValue("noAgendaKantor");
        const kodeKantor = noAgenda.split("/")[1]
        fetch(`http://10.162.71.119:9090/perbendaharaan/perben/keberatan/no-agenda-kantor?kodeKantor=${kodeKantor}&tahun=${yearNow}`)
            .then(res => res.json())
            .then(data => form.setFieldsValue({ noAgendaKantor: generateSequence(data.data.noAgenda) }))
            .catch(err => {
                if (err) {
                    form.setFieldsValue({ noAgendaKantor: `000001/${kodeKantor}/${yearNow}` });
                }
            })
    }

    const [nipPetugas, setNipPetguas] = useState("");
    const onFinish = values => {
        let loopObj = optionsKeberatan.map(({ kodeAkun, uraian }) => ({
            idAkun: parseInt(kodeAkun),
            nilaiKeberatan: values[uraian], // values[uraian] === undefined ? null : values[uraian]
        }))
        loopObj = loopObj.filter(item => item.nilaiKeberatan !== undefined);
        for (let x = 0; x < loopObj.length; x++) {
            loopObj[x].idKeberatan = x + 1
            loopObj[x].idAkun = String(loopObj[x].idAkun);
            loopObj[x].nilaiKeberatan = String(loopObj[x].nilaiKeberatan);
        }
        const bodyData = {
            listTdKeberatanNilai: loopObj,
            nipRekam: "090000000000000000", // || nip from localStorage || nipPetugas
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
                idHeaderPib: values.idHeaderPenetapan, // GET /perben/piutang/get-data-browse
                idKeberatan: "",
                idPerusahaan: values.idPerusahaan, // values.idPerusahaan || NPWP
                idProsesKeberatan: "",
                kodeKantorMonitoring: values.kodeKantorMonitoring,
                kodeKantorPenerbit: values.kodeKantorPenerbit,
                kodeKantorTujuan: values.kodeKantorTujuan,
                noAgenda: values.noAgendaKantor, // dari get browse data keberatan
                noSurat: values.noSuratKeberatan,
                noSuratPernyataan: values.noSuratPernyataan,
                pokokSengketa3: values.pokokSengketa3,
                status: values.status,
                tglAgenda: moment(values.tglAgendaKantor).format('YYYY-MM-DD'),
                tglJatuhTempo: moment(values.tglAgendaKantor).add(60, 'days').format('YYYY-MM-DD'),
                tglSurat: moment(values.tglSuratKeberatan).format('YYYY-MM-DD'),
                uraianPokokSengketa: values.uraianPokokSengketa === undefined ? "" : values.uraianPokokSengketa
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
                setValue([]);
                setHiddenSearch(true);
                message.success("Data Berhasil di Tambahkan!");
            })
            .catch(err => {
                console.log(err, "[ERROR] - Data Gagal di Kirimkan!");
                message.error("Data Gagal di Kirimkan!");
            });
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

    const onChangePokokSengketa = (value, selectedOptions) => {
        if (value.length > 1) { return message.info("Maksimal 1 Sengketa Yang diPilih!") }
        setValue(value);
    };


    const [inputSengketa, setInputSengketa] = useState(true);
    const onSelectSengketa = async (value, label, extra) => {
        if (label.title === "LAINNYA") {
            setInputSengketa(!inputSengketa);
            setValue([]);
            form.setFieldsValue({ pokokSengketa3: value });
        } else {
            setInputSengketa(true);
            form.setFieldsValue({ pokokSengketa3: value, uraianPokokSengketa: "" });
        }
    }

    const [messageSearch, setMessageSearch] = useState("");
    const [descriptionSearch, setDescriptionSearch] = useState("");
    const [typeSearch, setTypesSearch] = useState("");
    const [hiddenSearch, setHiddenSearch] = useState(true);
    const onChangeNpwp = async (val) => {
        if (val === "") {
            form.setFieldsValue({ alamat: "" });
            return setHiddenSearch(true);
        }
        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${val}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.data.length > 1) {
                    setMessageSearch("[INFO]");
                    setDescriptionSearch("NPWP Yang di Masukkan Kurang Spesifik.");
                    setTypesSearch("info");
                    return setHiddenSearch(false);
                }
                if (data.data.data[0].kodeId === "2" || data.data.data[0].kodeId === "3" || data.data.data[0].kodeId === "4" || data.data.data[0].kodeId === "6" || data.data.data[0].kodeId === "7") {
                    setIsNpwp(true);
                    setHiddenSearch(true);
                    return form.setFieldsValue({ idPerusahaan: data.data.data[0].idPerusahaan, alamat: data.data.data[0].alamatPerusahaan });
                }
                setMessageSearch("[SUCCESS]");
                setDescriptionSearch(`NPWP Yang di Maksud: ${data.data.data[0].npwp}.`);
                setTypesSearch("success");
                setHiddenSearch(false);
                setIsNpwp(false);
                form.setFieldsValue({ idPerusahaan: data.data.data[0].idPerusahaan, alamat: data.data.data[0].alamatPerusahaan });
            }).catch(err => {
                if (err) {
                    setMessageSearch("[ERROR]");
                    setDescriptionSearch("Data Tidak di Temukan!");
                    setTypesSearch("error");
                    setHiddenSearch(false);
                    form.setFieldsValue({ idPerusahaan: "", alamat: "" })
                }
            })
    }

    const onSetNpwp = async (val) => {
        await fetch(`http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${val}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.data[0].kodeId === "2" || data.data.data[0].kodeId === "3" || data.data.data[0].kodeId === "4" || data.data.data[0].kodeId === "6" || data.data.data[0].kodeId === "7") {
                    setIsNpwp(true);
                    setHiddenSearch(true);
                    return form.setFieldsValue({ idPerusahaan: data.data.data[0].idPerusahaan, alamat: data.data.data[0].alamatPerusahaan });
                }
                setMessageSearch("[SUCCESS]");
                setDescriptionSearch(`NPWP Yang di Maksud: ${data.data.data[0].npwp}.`);
                setTypesSearch("success");
                setHiddenSearch(false);
                setIsNpwp(false);
                form.setFieldsValue({ idPerusahaan: data.data.data[0].idPerusahaan, alamat: data.data.data[0].alamatPerusahaan, npwp: data.data.data[0].npwp });
            }).catch(err => {
                if (err) {
                    setMessageSearch("[ERROR]");
                    setDescriptionSearch("Data Tidak di Temukan!");
                    setTypesSearch("error");
                    setHiddenSearch(false);
                }
            })
    }

    const onCheckNpwp = e => {
        setIsNpwp(e.target.checked);
        if (e.target.checked === true) {
            if (Object.values(form.getFieldValue("npwp")).length > 0) {
                return setHiddenSearch(true);
            }
            form.setFieldsValue({
                idPerusahaan: "",
                alamat: ""
            })
        } else {
            if (Object.values(form.getFieldValue("npwp")).length > 0) {
                return setHiddenSearch(true);
            }
            form.setFieldsValue({
                npwp: ""
            })
        }
    }

    const currencyFormatter = selectedCurrOpt => value => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: selectedCurrOpt.split("::")[1]
        }).format(value);
    };

    const locale = "en-us";
    const currencyParser = val => {
        try {
            // for when the input gets clears
            if (typeof val === "string" && !val.length) {
                val = "0.0";
            }

            // detecting and parsing between comma and dot
            var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
            var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
            var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
            reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
            //  => 1232.21 €

            // removing everything except the digits and dot
            reversedVal = reversedVal.replace(/[^0-9.]/g, "");
            //  => 1232.21

            // appending digits properly
            const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
            const needsDigitsAppended = digitsAfterDecimalCount > 2;

            if (needsDigitsAppended) {
                reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
            }

            return Number.isNaN(reversedVal) ? 0 : reversedVal;
        } catch (err) {
            console.err(err, "[ERROR] - Currency Parser!");
        }
    };

    function mergeArrayObjectsPungutan(arr1, arr2) {
        const arrMerged = [];
        const map = new Map();
        arr1.forEach(item => map.set(item.kodeAkun, item));
        arr2.forEach(item => map.set(item.kode, { ...map.get(item.kode), ...item }));
        const arrThree = Array.from(map.values());
        for (let x = 0; x < arrThree.length; x++) {
            let keyOne = arrThree[x].kodeAkun.match(/[0-9]/g) ? arrThree[x].kode : arrThree[x].kodeAkun
            let keyTwo = arrThree[x].uraian;
            let keyThree = arrThree[x].nilai === undefined ? null : arrThree[x].nilai;
            let newObj = {
                kodeAkun: keyOne,
                uraian: keyTwo,
                nilai: keyThree,
            }
            arrMerged.push(newObj);
        }
        setOptionKeberatan(arrMerged);
    }

    const onPenetapan = () => {
        const noPenetapan = form.getFieldValue("noPenetapan")
        const tglPenetapan = moment(form.getFieldValue("tglPenetapan")).format('DD-MM-YYYY');
        const noDokumen = form.getFieldValue("jenisDokumen");
        fetch(`http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-browse?browse=${noPenetapan}&tanggalDokumen=${tglPenetapan}&jenisDokumen=${noDokumen}`)
            .then(res => res.json())
            .then(async data => {
                mergeArrayObjectsPungutan(optionsKeberatanFromTarik, data.data[0].pungutan.data);
                form.setFieldsValue({
                    idHeaderPenetapan: data.data[0].idHeader,
                    alamat: data.data[0].alamatPerusahaan,
                    npwp: data.data[0].npwpPerusahaan,
                    noPIB: data.data[0].nomorDokumen,
                    tglPIB: moment(data.data[0].tanggalDokumen, "DD-MM-YYYY")
                });
                await data.data[0].pungutan.data.map(({ kodeAkun, nilai }) => {
                    const obj = {}
                    obj[kodeAkun] = nilai
                    form.setFieldsValue(obj)
                })
                await setNipPetguas(data.data[0].nipPetugas1);
                await onSetNpwp(data.data[0].npwpPerusahaan);
                await onSetKodeKantorPenerbit(data.data[0].kantorPenerbit);
                await onSetKodeKantorMonitoring(data.data[0].kantorMonitor);
                await message.success("Data di Temukan!");
            })
            .catch(err => {
                console.log(err, '[ERROR] - Data Tidak di Temukan!');
                message.error("Data Tidak di Temukan!");
            });
    }

    const secondColumnStart = Math.floor(optionsKeberatan.length / 2);


    const fileList = [];

    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture',
        defaultFileList: [...fileList],
    };

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
                                                {...disabledComponent}
                                                style={{
                                                    width: '100%',
                                                }}
                                                dropdownMatchSelectWidth={350}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelectKodeKantor(value, option, { unique: "kodeKantorPenerbit" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
                                        <Form.Item
                                            name="labelKantorPenerbit"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input {...disabledComponent} />
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
                                                {...disabledComponent}
                                                style={{
                                                    width: '100%',
                                                }}
                                                dropdownMatchSelectWidth={350}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelectKodeKantor(value, option, { unique: "kodeKantorMonitoring" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
                                        <Form.Item
                                            name="labelKantorMonitoring"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input {...disabledComponent} />
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
                                                {...disabledComponent}
                                                style={{
                                                    width: '100%',
                                                }}
                                                dropdownMatchSelectWidth={350}
                                                options={options}
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                autoFocus={false}
                                                onSelect={(value, option) => onSelectKodeKantor(value, option, { unique: "kodeKantorTujuan" })}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={18}>
                                        <Form.Item
                                            name="labelKantorTujuan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Input {...disabledComponent} />
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
                                            <Input {...disabledComponent} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="tglAgendaKantor"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker {...disabledComponent} style={{ width: '100%' }} format={'DD-MM-YYYY'} onChange={onTanggalAgendaKantor} disabled={visibleTanggalAgendaKantor} />
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
                                            <Input {...disabledComponent} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="tglSuratKeberatan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker {...disabledComponent} style={{ width: '100%' }} format={'DD-MM-YYYY'} />
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
                                            <Input {...disabledComponent} placeholder="Masukkan NPWP" onChange={(e) => onChangeNpwp(e.target.value)} allowClear />
                                        </Form.Item>
                                        <Alert
                                            message={messageSearch}
                                            description={descriptionSearch}
                                            type={typeSearch}
                                            style={{ display: hiddenSearch ? 'none' : '' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox {...disabledComponent} onChange={onCheckNpwp} checked={isNpwp}><span style={{ fontSize: 12 }}>* Bukan NPWP (BARKIR / Contoh -KTP)</span></Checkbox>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="idPerusahaan" label="idPerusahaan" rules={[{ required: false }]} colon={false} hidden={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="alamat" label="Alamat" rules={[{ required: false }]} colon={false}>
                                <Input.TextArea {...disabledComponent} />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="idHeaderPenetapan" label="idHeaderPenetapan" rules={[{ required: false }]} colon={false} hidden={true}>
                                <Input />
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
                                            <Select {...disabledComponent} dropdownMatchSelectWidth={300} >
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
                                            <Input {...disabledComponent} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="tglPenetapan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker {...disabledComponent} style={{ width: '100%' }} format={'DD-MM-YYYY'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Button {...disabledComponent} type="info" htmlType="button" style={{ width: '100%' }} onClick={onPenetapan}>
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
                                            <Input {...disabledComponent} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="tglPIB"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker {...disabledComponent} style={{ width: '100%' }} format={'DD-MM-YYYY'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Button {...disabledComponent} type="primary" style={{ width: '100%' }} onClick={() => showModal("detailPIB")}>
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
                            <Form.Item {...tailLayoutMedium} label="Pokok Sengketa" colon={false}>
                                <Row gutter={8}>
                                    <Col span={16}>
                                        <Form.Item
                                            name="pokokSengketa3"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                value={value}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                placeholder="- Pilih Sengketa -"
                                                allowClear
                                                multiple
                                                onChange={onChangePokokSengketa}
                                                onSelect={onSelectSengketa}
                                                treeData={optionPokokSengketa}
                                                showSearch={false}
                                            >
                                                {/* {optionPokokSengketa && optionPokokSengketa.map((item) => (
                                                <TreeNode value={item.value} title={<b>{item.title}</b>} key={item.value}>
                                                    {item.children !== undefined ? item.children && item.children.map((item_dua) => (
                                                        <TreeNode value={item_dua.value} title={item_dua.title} key={item_dua.value}>
                                                            {item_dua.children !== undefined ? item_dua.children && item_dua.children.map((item_tiga) => (
                                                                <TreeNode value={item_tiga.value} title={item_tiga.title} key={item_tiga.value}>
                                                                    {item_tiga.children !== undefined ? item_tiga.children && item_tiga.children.map((item_empat) => (
                                                                        <TreeNode value={item_empat.value} title={item_empat.title} key={item_empat.value} />
                                                                    )) : null}
                                                                </TreeNode>
                                                            )) : null}
                                                        </TreeNode>
                                                    )) : null}
                                                </TreeNode>
                                            ))} */}
                                            </TreeSelect>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="uraianPokokSengketa"
                                            rules={[{ required: false }]}
                                            noStyle
                                            colon={false}
                                            hidden={inputSengketa}
                                        >
                                            <Input placeholder="Input Manual" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item {...tailLayoutLarge} label="Jaminan / Pelunasan" colon={false}>
                                <Row gutter={8}>
                                    <Col span={6}>
                                        <Form.Item
                                            name="flagJaminan"
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <Select {...disabledComponent}>
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
                                            <Input {...disabledComponent} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={form.getFieldValue("flagJaminan") === "Tidak Wajib Meyerahkan Jaminan" ? "tglSuratPernyataan" : ""}
                                            noStyle
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker {...disabledComponent} style={{ width: '100%' }} format={'DD-MM-YYYY'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Button {...disabledComponent} type="primary" style={{ width: '100%' }} onClick={() => showModal("jaminanPelunasan")}>
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
                                    {optionsKeberatan &&
                                        optionsKeberatan.slice(0, secondColumnStart).map((item) => (
                                            <Form.Item colon={false} {...tailLayoutExtraSmallCustom} wrapperCol={{ offset: 0, span: 8 }} labelCol={{ span: 12 }} label={item.uraian} key={item.uraian}>
                                                <Form.Item
                                                    name={item.uraian}
                                                    noStyle
                                                    rules={[{ required: false }]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: 175,
                                                            marginRight: "1rem"
                                                        }}
                                                        formatter={currencyFormatter("INDONESIA::IDR")}
                                                        parser={currencyParser}
                                                        // disabled={item.nilai === null ? true : false}
                                                        {...disabledComponent}
                                                    />
                                                </Form.Item>
                                            </Form.Item>
                                        ))
                                    }
                                </Col>
                                <Col span={12} style={{ textAlign: "right", display: 'block' }}>
                                    {optionsKeberatan &&
                                        optionsKeberatan.slice(secondColumnStart).map((item) => (
                                            <Form.Item colon={false} {...tailLayoutExtraSmallCustom} wrapperCol={{ offset: 0, span: 8 }} labelCol={{ span: 12 }} label={item.uraian} key={item.uraian}>
                                                <Form.Item
                                                    name={item.uraian}
                                                    noStyle
                                                    rules={[{ required: false }]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: 175,
                                                            marginRight: "1rem"
                                                        }}
                                                        formatter={currencyFormatter("INDONESIA::IDR")}
                                                        parser={currencyParser}
                                                        // disabled={item.nilai === null ? true : false}
                                                        {...disabledComponent}
                                                    />
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
                    <h1 style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 16 }} hidden={params === false ? false : true}>CEK KELENGKAPAN BERKAS</h1>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form {...normalLayout} form={form} labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ paddingLeft: 16 }} hidden={params === false ? false : true}>
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
                        </Form>
                        <Form {...normalLayout} form={form} labelAlign={"left"} size={"small"} onFinish={onFinish} style={{ paddingLeft: 16 }}>
                            <Form.Item {...tailLayoutExtraSmall} name="keputusan" label="Keputusan" rules={[{ required: false }]}>
                                <Select {...disabledComponent}>
                                    <Option value="Terima">Terima</Option>
                                    <Option value="Kembalikan">Kembalikan</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} name="alasan" label="Alasan" rules={[{ required: false }]}>
                                <Input.TextArea {...disabledComponent} />
                            </Form.Item>
                            <Form.Item {...tailLayoutSmall} label="Upload Berkas" rules={[{ required: false }]} hidden={params === false ? true : false}>
                                <Upload {...props} style={{ width: "100%" }}>
                                    <Button style={{ width: "100%" }}>
                                        <UploadOutlined style={{ width: "100%" }} type="primary" htmltype="button" />
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item {...tailLayoutBtn}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                            Simpan
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button type="primary" htmltype="button" style={{ width: '100%' }} onClick={() => onReset}>
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