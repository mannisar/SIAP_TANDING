import {
  React,
  useState,
  Form,
  Upload,
  Button,
  Input,
  UploadOutlined,
} from "../../../libraries/dependencies";

const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 0 },
  labelAlign: "left",
};

const tailLayoutLarge = {
  labelCol: { span: 8 },
  wrapperCol: { span: 0 },
};

export default function PerekamanNDPenolakanUsulanPK(props) {
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
      <h2>Perekaman Penolakan Usulan PK</h2>
      <Form form={form} onFinish={submitData} {...layout}>
        <Form.Item {...tailLayoutLarge} label="No /Tanggal Putusan PP">
          <Input.Group compact>
            <Form.Item name="noPutusanPP">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPutusanPP" style={{ marginLeft: "5px" }}>
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="Pemohon Banding/Gugatan">
          <Input.Group compact>
            <Form.Item name="noPemohon">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalPemohon" style={{ marginLeft: "5px" }}>
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="No /Tanggal ND Usulan PK">
          <Input.Group compact>
            <Form.Item name="noND">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalND" style={{ marginLeft: "5px" }}>
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item {...tailLayoutLarge} label="No /Tanggal ND Penolakan">
          <Input.Group compact>
            <Form.Item name="noMPK">
              <Input />
            </Form.Item>
            <Form.Item name="tanggalMPK" style={{ marginLeft: "5px" }}>
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name="hasilAnalisa"
          label="Hasil Analisa dan Kesimpulan Penolakan"
        >
          <TextArea />
        </Form.Item>

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
