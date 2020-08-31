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
  labelCol: { span: 6 },
  wrapperCol: { span: 4 },
  labelAlign: "left",
};

const tailLayoutLarge = {
  wrapperCol: { span: 0 },
};

const onFinish = (values) => {
  console.log(console.log(values));
};

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default function TampilanPK(props) {
  return (
    <>
      {" "}
      <h2 hidden={props.hidden}>Peninjauan Kembali</h2>
      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item name="noSengketaPajak" label="No Sengketa Pajak">
          <Input value="005670.45/2019/PP" />
        </Form.Item>
        <Form.Item name="jenisSidang" label="Jenis Sidang">
          <Select placeholder="Jenis Sidang">
            <Option>BANDING</Option>
            <Option>GUGATAN</Option>
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
                <Option>KEBERATAN</Option>
                <Option>SPKTNP</Option>
                <Option>Lain-lain</Option>
                <Option>KEBERATAN</Option>
              </Select>
            </Form.Item>
            <Form.Item nama="nomorGugatan" style={{ margin: "0 5px" }}>
              <Input placeholder="" value="KEP-810/KPU.03/2019" />
            </Form.Item>
            <Form.Item nama="tanggalGugatan">
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
