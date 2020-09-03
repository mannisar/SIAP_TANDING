import {
  React,
  useParams,
  Layout,
  Menu,
  FolderOpenOutlined,
  Link,
} from "./libraries/dependencies";
import "./assets/css/customs.css";

// @Keberatan
import BrowseKeberatan from "./dashboard/Keberatan/BrowseKeberatan";
import RekamKeberatan from "./dashboard/Keberatan/RekamKeberatan";
import RekamKepKeberatan from "./dashboard/Keberatan/RekamKepKeberatan";
// import DisposisiDokKeberatan from './dashboard/Keberatan/DisposisiDokKeberatan';
// import PencabutanKeberatan from './dashboard/Keberatan/PencabutanKeberatan';
// @Banding
import TampilanBanding from "./dashboard/Banding/TampilanBanding";
import RekamSUB from "./dashboard/Banding/RekamSUB";
import RekamPermintaanSUB from "./dashboard/Banding/RekamPermintaanSUB";
// @Gugatan
import TampilanGugatan from "./dashboard/Gugatan/TampilanGugatan";
import RekamSuratTanggapan from "./dashboard/Gugatan/RekamSuratTanggapan";
import RekamPermintaanTanggapan from "./dashboard/Gugatan/RekamPermintaanTanggapan";
// @Sidang
import TampilanSidang from "./dashboard/Sidang/TampilanSidang";
import RekamRiwayatSidang from "./dashboard/Sidang/RekamRiwayatSidang";
// @Peninjauan Kembali
import TampilanPK from "./dashboard/PeninjauanKembali/TampilanPeninjauanKembali";
import PerekamanPenerimaanNDUsulanPK from "./dashboard/PeninjauanKembali/PerekamanPenerimaanNDUsulanPK";
import PerekamanMemoriPK from "./dashboard/PeninjauanKembali/PerekamanMemoriPK";
import PerekamanNDPenolakanUsulanPK from "./dashboard/PeninjauanKembali/PerekamanNDPenolakanUsulanPK";
import PerekamanPemberitahuanPK from "./dashboard/PeninjauanKembali/PerekamanPemberitahuanPK";
import PerekamanKontraMPK from "./dashboard/PeninjauanKembali/PerekamanKontraMPK";
import PerekamanPutusanPK from "./dashboard/PeninjauanKembali/PerekamanPutusanPK";
// @Putusan Pengadilan Pajak
import TampilanPPP from "./dashboard/PutusanPengadilanPajak/TampilanPPP";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Perbendaharaan() {
  let { id } = useParams();
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div
          className="logo"
          style={{
            fontSize: 18,
            paddingLeft: 24,
            paddingTop: 2,
            color: "white",
          }}
        >
          SIAP TANDING
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {/** Menu Aside, Sub Menu, Navigasi */}
          <SubMenu
            key="KB"
            icon={<FolderOpenOutlined />}
            title="KEBERATAN"
            style={{ marginLeft: -12 }}
          >
            <Menu.Item
              key="1"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-keberatan">
                Perekaman Keberatan
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/browse-keberatan">
                Browse Data Keberatan
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-keputusan-keberatan">
                Perekaman Kep Keberatan
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="BD"
            icon={<FolderOpenOutlined />}
            title="BANDING"
            style={{ marginLeft: -12 }}
          >
            <Menu.Item
              key="5"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/tampil-banding">Tampilan Banding</Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-permintaan-sub">
                Perekaman Permintaan SUB
              </Link>
            </Menu.Item>
            <Menu.Item
              key="7"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-sub">Perekaman SUB</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="GT"
            icon={<FolderOpenOutlined />}
            title="GUGATAN"
            style={{ marginLeft: -12 }}
          >
            <Menu.Item
              key="10"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/tampilan-gugatan">
                Tampilan Gugatan
              </Link>
            </Menu.Item>
            <Menu.Item
              key="11"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-surat-tanggapan">
                Perekaman Surat Tanggapan
              </Link>
            </Menu.Item>
            <Menu.Item
              key="12"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-permintaan-tanggapan">
                Perekaman Permintaan Tanggapan
              </Link>
            </Menu.Item>
            <Menu.Item
              key="13"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-pemberitahuan-pk">
                Perekaman Pemberitahuan PK
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="SD"
            icon={<FolderOpenOutlined />}
            title="SIDANG"
            style={{ marginLeft: -12 }}
          >
            <Menu.Item
              key="15"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/tampilan-sidang">Tampilan Sidang</Link>
            </Menu.Item>
            <Menu.Item
              key="16"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-riwayat-sidang">
                Perekaman Riwayat Sidang
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="PK"
            icon={<FolderOpenOutlined />}
            title="PENINJAUAN KEMBALI"
            style={{ marginLeft: -12 }}
          >
            <Menu.Item
              key="17"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/tampilan-peninjauan-kembali">
                Tampilan Peninjauan Kembali
              </Link>
            </Menu.Item>
            <Menu.Item
              key="18"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-penerimaan-nd-usulanpk">
                PerekamanPenerimaanNDUsulanPK
              </Link>
            </Menu.Item>
            <Menu.Item
              key="19"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-memori-pk">
                PerekamanMemoriPK
              </Link>
            </Menu.Item>
            <Menu.Item
              key="20"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/Perekaman-ND-Penolakan-UsulanPK">
                PerekamanNDPenolakanUsulanPK
              </Link>
            </Menu.Item>
            <Menu.Item
              key="21"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-pemberitahuan-pk">
                PerekamanPemberitahuanPK
              </Link>
            </Menu.Item>
            <Menu.Item
              key="22"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-kontra-mpk">
                PerekamanKontraMPK
              </Link>
            </Menu.Item>
            <Menu.Item
              key="23"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-putusan-pk">
                PerekamanPutusanPK
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="PPP"
            icon={<FolderOpenOutlined />}
            title="PUTUSAN PENGADILAN PAJAK"
            style={{ marginLeft: -12 }}
          >
            <Menu.Item
              key="25"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/tampilan-putusan-pengadilan-pajak">
                Tampilan PPP
              </Link>
            </Menu.Item>
            <Menu.Item
              key="26"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-putusan-pengadilan-pajak">
                Perekaman PPP
              </Link>
            </Menu.Item>
            <Menu.Item
              key="27"
              icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}
            >
              <Link to="/perbendaharaan/perekaman-evaluasi-putusan-pengadilan-pajak">
                Perekaman Evaluasi PPP
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 400 }}
          >
            {/** Tambah Component Disini */}
            <RekamKeberatan
              hidden={id === "perekaman-keberatan" ? false : true}
            />
            <BrowseKeberatan
              hidden={id === "browse-keberatan" ? false : true}
            />
            <RekamKepKeberatan
              hidden={id === "perekaman-keputusan-keberatan" ? false : true}
            />
            <TampilanBanding hidden={id === "tampil-banding" ? false : true} />
            <RekamPermintaanSUB
              hidden={id === "perekaman-permintaan-sub" ? false : true}
            />
            <RekamSUB hidden={id === "perekaman-sub" ? false : true} />
            <TampilanGugatan
              hidden={id === "tampilan-gugatan" ? false : true}
            />
            <RekamSuratTanggapan
              hidden={id === "perekaman-surat-tanggapan" ? false : true}
            />
            <RekamPermintaanTanggapan
              hidden={id === "perekaman-permintaan-tanggapan" ? false : true}
            />
            <TampilanSidang hidden={id === "tampilan-sidang" ? false : true} />
            <RekamRiwayatSidang
              hidden={id === "perekaman-riwayat-sidang" ? false : true}
            />
            <TampilanPK
              hidden={id === "tampilan-peninjauan-kembali" ? false : true}
            />
            <PerekamanPenerimaanNDUsulanPK
              hidden={id === "perekaman-penerimaan-nd-usulanpk" ? false : true}
            />
            <PerekamanMemoriPK
              hidden={id === "perekaman-memori-pk" ? false : true}
            />
            <PerekamanNDPenolakanUsulanPK
              hidden={id === "Perekaman-ND-Penolakan-UsulanPK" ? false : true}
            />
            <PerekamanPemberitahuanPK
              hidden={id === "perekaman-pemberitahuan-pk" ? false : true}
            />
            <PerekamanKontraMPK
              hidden={id === "perekaman-kontra-mpk" ? false : true}
            />
            <PerekamanPutusanPK
              hidden={id === "perekaman-putusan-pk" ? false : true}
            />
            <TampilanPPP
              hidden={id === "tampilan-putusan-pengadilan-pajak" ? false : true}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          SIAP TANDING by Perben Team
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Perbendaharaan;
