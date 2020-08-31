import {
  React,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "../../../libraries/dependencies";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
  labelAlign: "left",
};

const tailLayoutLarge = {
  labelCol: { span: 8 },
  wrapperCol: { span: 0 },
};

const onFinish = (values) => {
  console.log(console.log(values));
};

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default function TampilanPK(props) {
  const [form] = Form.useForm();
  return (
    <>
      {" "}
      <h2 hidden={props.hidden}>Peninjauan Kembali</h2>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          jenisSidang: "BANDING",
          noSengketaPajak: "005670.45/2019/PP",
          jenisGugatan: "KEBERATAN",
          nomorGugatan: "KEP-810/KPU.03/2019",
          amarPutusanPP: "Mengabulkan Seluruhnya",
          nomorPutusanpengadilanPajak:
            "PUT-005670.45/2019/PP/M.XVIIA TAHUN 2020",
          idPemohon: "019980770038000",
          namaPemohon: "PT TATARASA PRIMATAMA",
          kantorPenanganan: "Direktorat KBP",
          jenisSuratPutusan: "Memori PK",
          amarPutusanPK:
            "Memerintahkan Pengadilan Pajak Melaksanakan Pemeriksaan Tambahan",
          statusPK: "Proses MPK",
        }}
      >
        <Form.Item name="noSengketaPajak" label="No Sengketa Pajak">
          <Input />
        </Form.Item>
        <Form.Item name="jenisSidang" label="Jenis Sidang">
          <Select placeholder="Jenis Sidang">
            <Option value="BANDING">BANDING</Option>
            <Option value="GUGATAN">GUGATAN</Option>
          </Select>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="No/Tanggal Objek Banding/Gugatan"
          style={{
            marginBottom: 0,
            padding: "1px 1px 1px 5px",
          }}
        >
          <Input.Group compact>
            <Form.Item name="jenisGugatan">
              <Select placeholder="Jenis Gugatan">
                <Option value="KEBERATAN">KEBERATAN</Option>
                <Option value="SPKTNP">SPKTNP</Option>
                <Option value="SPKPBK">SPKPBK</Option>
                <Option value="Lain-lain">Lain-lain</Option>
              </Select>
            </Form.Item>
            <Form.Item name="nomorGugatan" style={{ margin: "0 5px" }}>
              <Input />
            </Form.Item>
            <Form.Item nama="tanggalGugatan">
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="No/Tgl Putusan Pengadilan Pajak" {...tailLayoutLarge}>
          <Input.Group compact>
            <Form.Item
              name="nomorPutusanpengadilanPajak"
              style={{ margin: "0 5px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPutusanpengadilanPajak">
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Amar Putusan PP" name="amarPutusanPP">
          <Select>
            <Option value="Menolak">Menolak</Option>
            <Option value="Mengabulkan Seluruhnya">
              Mengabulkan Seluruhnya
            </Option>
            <Option value="Mengabulkan Sebagian">Mengabulkan Sebagian</Option>
            <Option value="Tidak Dapat Diterima">Tidak Dapat Diterima</Option>
            <Option value="Membatalkan">Membatalkan</Option>
            <Option value="Mencabut">Mencabut</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="Pemohon Banding/Gugatan">
          <Input.Group compact>
            <Form.Item name="idPemohon">
              <Input />
            </Form.Item>
            <Form.Item name="namaPemohon">
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name="kantorPenanganan"
          label="Kantor Penanganan Sidang Banding/Gugatan"
        >
          <Select>
            <Option value="Direktorat KBP">Direktorat KBP</Option>
            <Option value="Kanwil DJBC Jateng dan DIY">
              Kanwil DJBC Jateng dan DIY
            </Option>
            <Option value="Kanwil DJBC Jatim I">Kanwil DJBC Jatim I</Option>
            <Option value="KPU BC Tanjung Priok">KPU BC Tanjung Priok</Option>
            <Option value="Semua">Semua</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="No/Tanggal ND Usulan PK">
          <Input.Group compact>
            <Form.Item name="nomorNDUsulanPK">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalNDUsulanPK">
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label=" No/Tanggal Surat Pemberitahuan PK
        (Kontra MPK)"
        >
          <Input.Group compact>
            <Form.Item name="nomorSuratPemberitahuanPK">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalSuratPemberitahuanPK">
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="No/Tgl Putusan PK">
          <Input.Group compact>
            <Form.Item name="nomorPutusanPK">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPutusanPK">
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="Tanggal Jatuh Tempo">
          <Input.Group compact>
            <Form.Item name="jenisSuratPutusan">
              <Select>
                <Option value="Memori PK">Memori PK</Option>
                <Option value="Kontra MPK">Kontra MPK</Option>
              </Select>
            </Form.Item>
            <Form.Item name="dari-tanggalJatuhTempo">
              <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item label="s/d"></Form.Item>
            <Form.Item name="sampai-tanggalJatuhTempo">
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Amar Putusan PK" name="amarPutusanPK">
          <Select>
            <Option value="Menolak">Menolak</Option>
            <Option value="Mengabulkan">Mengabulkan</Option>
            <Option value="Tidak Diterima (lewat waktu)">
              Tidak Diterima (lewat waktu)
            </Option>
            <Option value="Memerintahkan Pengadilan Pajak Melaksanakan Pemeriksaan Tambahan">
              Memerintahkan Pengadilan Pajak Melaksanakan Pemeriksaan Tambahan
            </Option>
            <Option value="Memerintahkan Pengadilan Pajak Memeriksa Pokok Perkara">
              Memerintahkan Pengadilan Pajak Memeriksa Pokok Perkara
            </Option>
            <Option value="Tidak Dapat DIterima(N.O)">
              Tidak Dapat DIterima(N.O)
            </Option>
            <Option value="Mengabulkan Permohonan Pencabutan">
              Mengabulkan Permohonan Pencabutan
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status PK" name="statusPK">
          <Select>
            <Option value="Proses MPK">Proses MPK</Option>
            <Option value="MPK Selesai">MPK Selesai</Option>
            <Option value="Usulan PK ditolak">Usulan PK ditolak</Option>
            <Option value="Proses Rekomendasi ke Unit terkait">
              Proses Rekomendasi ke Unit terkait
            </Option>
            <Option value="Rekomendasi ke Unit terkait selesai">
              Rekomendasi ke Unit terkait selesai
            </Option>
            <Option value="Proses KMPK">Proses KMPK</Option>
            <Option value="KMPK Selesai">KMPK Selesai</Option>
            <Option value="Putusan PK">Putusan PK</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Cari
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
