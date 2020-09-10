import React from "react";

// @Keberatan
import BrowseKeberatan from "./dashboard/Keberatan/BrowseKeberatan";
import RekamKeberatan from "./dashboard/Keberatan/RekamKeberatan";
// import RekamKepKeberatan from "./dashboard/Keberatan/RekamKepKeberatan";
// import DisposisiDokKeberatan from './dashboard/Keberatan/DisposisiDokKeberatan';
// import PencabutanKeberatan from './dashboard/Keberatan/PencabutanKeberatan';
// @Banding
// import TampilanBanding from "./dashboard/Banding/TampilanBanding";
// import RekamSUB from "./dashboard/Banding/RekamSUB";
// import RekamPermintaanSUB from "./dashboard/Banding/RekamPermintaanSUB";
// @Gugatan
// import TampilanGugatan from "./dashboard/Gugatan/TampilanGugatan";
// import RekamSuratTanggapan from "./dashboard/Gugatan/RekamSuratTanggapan";
// import RekamPermintaanTanggapan from "./dashboard/Gugatan/RekamPermintaanTanggapan";
// @Sidang
// import TampilanSidang from "./dashboard/Sidang/TampilanSidang";
// import RekamRiwayatSidang from "./dashboard/Sidang/RekamRiwayatSidang";
// @Peninjauan Kembali
// import TampilanPK from "./dashboard/PeninjauanKembali/TampilanPeninjauanKembali";
// import PerekamanPenerimaanNDUsulanPK from "./dashboard/PeninjauanKembali/PerekamanPenerimaanNDUsulanPK";
// import PerekamanMemoriPK from "./dashboard/PeninjauanKembali/PerekamanMemoriPK";
// import PerekamanNDPenolakanUsulanPK from "./dashboard/PeninjauanKembali/PerekamanNDPenolakanUsulanPK";
// import PerekamanPemberitahuanPK from "./dashboard/PeninjauanKembali/PerekamanPemberitahuanPK";
// import PerekamanKontraMPK from "./dashboard/PeninjauanKembali/PerekamanKontraMPK";
// import PerekamanPutusanPK from "./dashboard/PeninjauanKembali/PerekamanPutusanPK";
// @Putusan Pengadilan Pajak
// import TampilanPPP from "./dashboard/PutusanPengadilanPajak/TampilanPPP";

const Dashboard = () => {
    return <h1>DASHBOARD PERBEN</h1>
}

const appRoutes = [
    {
        name: "Rekam Keberatan",
        component: RekamKeberatan,
        path: "/perbendaharaan/perekaman-keberatan"
    },
    {
        name: "Browse Keberatan",
        component: BrowseKeberatan,
        path: "/perbendaharaan/browse-keberatan"
    },
    {
        name: "Dashboard",
        component: Dashboard,
        exact: true,
        path: "/perbendaharaan"
    }
];

export default appRoutes;