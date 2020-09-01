import {
  React,
  useState,
  Form,
  Upload,
  Button,
  Select,
  Input,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "../../../libraries/dependencies";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
  labelAlign: "left",
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
  labelAlign: "left",
};

export default function PerekamanPenerimaanNDUsulanPK(props) {
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

  return (
    <div hidden={props.hidden}>
      <h2>Perekaman Pemberitahuan Permohonan Peninjauan Kembali</h2>
      <Form
        onFinish={submitData}
        initialValues={{
          noPutusanPP: "PUT.73190/PP/M.IV/15/2016",
          tanggalPutusanPP: "22/01/2020",
          amarPutusanPP: "Menolak",
          noNDUsulanPK: "S-00001/PP/2020",
          nipPemeriksaMPK: [{ NIP: "", namaPegawai: "" }],
        }}
      >
        <Form.Item label="No Putusan PP" {...formItemLayout}>
          <Input.Group compact>
            <Form.Item name="noPutusanPP">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPutusanPP">
              <Input style={{ marginLeft: "5px" }} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Amar Putusan PP"
          name="amarPutusanPP"
          {...formItemLayout}
        >
          <Select>
            <Option value="Menolak">Menolak</Option>
            <Option>Mengaabulkan Seluruhnya</Option>
            <Option>Mengabulkan Sebagian</Option>
            <Option>Tidak Dapat Diterima</Option>
            <Option>Membatalkan</Option>
            <Option>Mencabut</Option>
          </Select>
        </Form.Item>

        <Form.Item label="No/Tanggal ND Usulan PK" {...formItemLayout}>
          <Input.Group compact>
            <Form.Item name="noNDUsulanPK">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalNDUsulanPK">
              <Input style={{ marginLeft: "5px" }} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.List name="nipPemeriksaMPK" label="Nip Pemeriksa MPK">
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

        <Form.Item label="Upload" name="upload" {...formItemLayout}>
          <Upload {...uploadHandler}>
            <Button icon={<UploadOutlined />}>Upload Berkas</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={() => form.resetFields()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
