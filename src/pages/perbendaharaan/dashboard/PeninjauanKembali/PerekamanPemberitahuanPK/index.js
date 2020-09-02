import {
  React,
  useState,
  Form,
  Upload,
  Button,
  Input,
  UploadOutlined,
  DatePicker,
  Select,
  MinusCircleOutlined,
  PlusOutlined,
} from "../../../libraries/dependencies";

const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 0 },
  labelAlign: "left",
};

const tailLayoutLarge = {
  labelCol: { span: 8 },
  wrapperCol: { span: 0 },
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
  labelAlign: "left",
};
const formItemLayoutWithOutLabel = {
  labelCol: { span: 8 },
  wrapperCol: { span: 0, offset: 8 },
  labelAlign: "left",
};
export default function PerekamanPemberitahuanPK(props) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append("files[]", file);
  });

  const submitData = (values) => {
    console.log(console.log(values));
    console.log(formData.getAll("files[]"));
  };

  const uploadHandler = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const newData = [...fileList, file];
      setFileList(newData);
      return false;
    },
    fileList,
  };

  const resetForm = () => {
    setFileList([]);
    form.resetFields();
  };

  return (
    <div hidden={props.hidden}>
      <h2>Perekaman Pemberitahuan Permohonan Peninjauan Kembali</h2>
      <Form
        form={form}
        onFinish={submitData}
        {...layout}
        initialValues={{
          nipPemeriksaKontraMPK: [{ NIP: "", namaPegawai: "" }],
        }}
      >
        <Form.Item
          {...tailLayoutLarge}
          label="No/Tanggal Objek Banding/Gugatan"
          style={{ margin: "0" }}
        >
          <Input.Group compact>
            <Form.Item name="noPutusanPP">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPutusanPP" style={{ margin: "0 5px" }}>
              <Input />
            </Form.Item>
            <Form.Item>
              <DatePicker />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="Pemohon Banding/Gugatan"
          style={{ margin: "0" }}
        >
          <Input.Group compact>
            <Form.Item name="noPemohon">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPemohon" style={{ margin: "0 5px" }}>
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="Pokok Sengketa"
          style={{ margin: "0" }}
        >
          <Form.Item name="pokokSengketa">
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="No Putusan PP"
          style={{ margin: "0" }}
        >
          <Input.Group compact>
            <Form.Item name="noUtusanPP">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPutusanPP" style={{ marginLeft: "5px" }}>
              <DatePicker />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          name="hasilAnalisa"
          label="Hasil Analisa dan Kesimpulan Penolakan"
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="Amar Putusan PP"
          name="amarPutusanPP"
        >
          <Select>
            <Option>Menolak</Option>
            <Option>Mengabulkan Seluruhnya</Option>
            <Option>Mengabulkan Sebagian</Option>
            <Option>Tidak Dapat Diterima</Option>
            <Option>Membatalkan</Option>
            <Option>Mencabut</Option>
          </Select>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="No/Tanggal Surat Pemberitahuan PK"
        >
          <Input.Group compact>
            <Form.Item>
              <Input />
            </Form.Item>
            <Form.Item style={{ margin: "0 5px" }}>
              <Input />
            </Form.Item>
            <Form.Item>
              <p style={{ color: "red" }}>
                <span>*Tanggal Jatuh tempo 30hr sejak tanggal</span>
                <br />
                <span> diterima surat pemberitahuan</span>
              </p>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          {...tailLayoutLarge}
          label="Tanggal Terima Surat Pemberitahuan PK"
          name="tanggalTerimaSuratPemberitahuanPK"
        >
          <DatePicker />
        </Form.Item>

        <Form.List
          name="nipPemeriksaKontraMPK"
          label="NIP Pemeriksa Kontra MPK"
          {...formItemLayoutWithOutLabel}
        >
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "Nip Pemeriksa MPK" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Input.Group compact>
                      <Form.Item
                        {...field}
                        // validateTrigger={["onChange", "onBlur"]}
                        name={[field.name, `NIP${index}`]}
                      >
                        <Input placeholder="NIP" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        // validateTrigger={["onChange", "onBlur"]}
                        name={[field.name, "namaPegawai"]}
                      >
                        <Input
                          placeholder="Nama Pegawai"
                          style={{ marginLeft: "5px" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Input.Group>
                  </Form.Item>
                ))}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "60%" }}
                  >
                    <PlusOutlined /> Tambah Pegawai
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item name="uploadBerkas" label="Upload Berkas">
          <Upload {...uploadHandler}>
            <Button>
              <UploadOutlined />
              Upload Berkas
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Simpan</Button>
          <Button onClick={() => resetForm()}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
