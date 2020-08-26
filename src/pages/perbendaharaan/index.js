import {
    React,
    useParams,
    Layout,
    Menu,
    FolderOpenOutlined,
    Link
} from './libraries/dependencies';
import './assets/css/customs.css';

// @Keberatan
import BrowseKeberatan from './dashboard/Keberatan/BrowseKeberatan';
import RekamKeberatan from './dashboard/Keberatan/RekamKeberatan';
import RekamKepKeberatan from './dashboard/Keberatan/RekamKepKeberatan';
// import DisposisiDokKeberatan from './dashboard/Keberatan/DisposisiDokKeberatan';
// import PencabutanKeberatan from './dashboard/Keberatan/PencabutanKeberatan';
// @Banding
import TampilBanding from './dashboard/Banding/TampilBanding';
import RekamSUB from './dashboard/Banding/RekamSUB';
import RekamPermintaanSUB from './dashboard/Banding/RekamPermintaanSUB';
// @Gugatan

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Perbendaharaan() {
    let { id } = useParams();
    // const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}>
                <div className="logo" style={{ fontSize: 18, paddingLeft: 24, paddingTop: 2, color: 'white' }}>SIAP TANDING</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                    {/** Menu Aside, Sub Menu, Navigasi */}
                    <SubMenu key="KB" icon={<FolderOpenOutlined />} title="KEBERATAN" style={{ marginLeft: -12 }} >
                        <Menu.Item key="1" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perbendaharaan/perekaman-keberatan">Perekaman Keberatan</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perbendaharaan/browse-keberatan">Browse Data Keberatan</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perbendaharaan/perekaman-keputusan-keberatan">Perekaman Kep Keberatan</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="BD" icon={<FolderOpenOutlined />} title="BANDING" style={{ marginLeft: -12 }} >
                        <Menu.Item key="5" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perbendaharaan/tampil-banding">Tampil Banding</Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perbendaharaan/perekaman-permintaan-sub">Perekaman Permintaan SUB</Link>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<FolderOpenOutlined style={{ marginLeft: -12 }} />}>
                            <Link to="/perbendaharaan/perekaman-sub">Perekaman SUB</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 400 }}>
                        {/** Tambah Component Disini */}
                        <RekamKeberatan hidden={id === "perekaman-keberatan" ? false : true} />
                        <BrowseKeberatan hidden={id === "browse-keberatan" ? false : true} />
                        <RekamKepKeberatan hidden={id === "perekaman-keputusan-keberatan" ? false : true} />
                        <TampilBanding hidden={id === "tampil-banding" ? false : true} />
                        <RekamPermintaanSUB hidden={id === "perekaman-permintaan-sub" ? false : true} />
                        <RekamSUB hidden={id === "perekaman-sub" ? false : true} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Perbendaharaan;