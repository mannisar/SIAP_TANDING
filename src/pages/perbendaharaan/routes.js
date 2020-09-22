import React from "react";

// @Keberatan
import BrowseKeberatan from "./dashboard/Keberatan/BrowseKeberatan";
import RekamKeberatan from "./dashboard/Keberatan/RekamKeberatan";
import RekamKepKeberatan from "./dashboard/Keberatan/RekamKepKeberatan";
// import DisposisiDokKeberatan from './dashboard/Keberatan/DisposisiDokKeberatan';
// import PencabutanKeberatan from './dashboard/Keberatan/PencabutanKeberatan';
// // @Banding
import TampilanBanding from "./dashboard/Banding/TampilanBanding";
import RekamSUB from "./dashboard/Banding/RekamSUB";
import RekamPermintaanSUB from "./dashboard/Banding/RekamPermintaanSUB";
// // @Gugatan
import TampilanGugatan from "./dashboard/Gugatan/TampilanGugatan";
import RekamSuratTanggapan from "./dashboard/Gugatan/RekamSuratTanggapan";
import RekamPermintaanTanggapan from "./dashboard/Gugatan/RekamPermintaanTanggapan";
// // @Sidang
import TampilanSidang from "./dashboard/Sidang/TampilanSidang";
import RekamRiwayatSidang from "./dashboard/Sidang/RekamRiwayatSidang";
// // @Peninjauan Kembali
import TampilanPK from "./dashboard/PeninjauanKembali/TampilanPeninjauanKembali";
import PerekamanPenerimaanNDUsulanPK from "./dashboard/PeninjauanKembali/PerekamanPenerimaanNDUsulanPK";
import PerekamanMemoriPK from "./dashboard/PeninjauanKembali/PerekamanMemoriPK";
// import PerekamanNDPenolakanUsulanPK from "./dashboard/PeninjauanKembali/PerekamanNDPenolakanUsulanPK";
// import PerekamanPemberitahuanPK from "./dashboard/PeninjauanKembali/PerekamanPemberitahuanPK";
// import PerekamanKontraMPK from "./dashboard/PeninjauanKembali/PerekamanKontraMPK";
// import PerekamanPutusanPK from "./dashboard/PeninjauanKembali/PerekamanPutusanPK";
// // // @Putusan Pengadilan Pajak
// import TampilanPPP from "./dashboard/PutusanPengadilanPajak/TampilanPPP";

const Dashboard = () => {
    return <h1>DASHBOARD PERBEN</h1>
}

const appRoutes = [
    {
        name: "Perekaman Memori PK",
        component: PerekamanMemoriPK,
        path: "perbendaharaan/perekaman-memori-pk"
    },
    {
        name: "Perekaman Penerimaan ND Usulan PK",
        component: PerekamanPenerimaanNDUsulanPK,
        path: "perbendaharaan/perekaman-penerimaan-nd-usulanpk"
    },
    {
        name: "Tampilan PK",
        component: TampilanPK,
        path: "/perbendaharaan/tampilan-peninjauan-kembali"
    },
    {
        name: "Rekam Riwayat Sidang",
        component: RekamRiwayatSidang,
        path: "/perbendaharaan/perekaman-riwayat-sidang"
    },
    {
        name: "Tampilan Sidang",
        component: TampilanSidang,
        path: "/perbendaharaan/tampilan-sidang"
    },
    {
        name: "Rekam Permintaan Tanggapan",
        component: RekamPermintaanTanggapan,
        path: "/perbendaharaan/perekaman-permintaan-tanggapan"
    },
    {
        name: "Rekam Surat Tanggapan",
        component: RekamSuratTanggapan,
        path: "/perbendaharaan/perekaman-surat-tanggapan"
    },
    {
        name: "Tampilan Gugatan",
        component: TampilanGugatan,
        path: "/perbendaharaan/tampilan-gugatan"
    },
    {
        name: "Rekam Permintaan SUB",
        component: RekamPermintaanSUB,
        path: "/perbendaharaan/perekaman-permintaan-sub"
    },
    {
        name: "Rekam SUB",
        component: RekamSUB,
        path: "/perbendaharaan/perekaman-sub"
    },
    {
        name: "Tampilan Banding",
        component: TampilanBanding,
        path: "/perbendaharaan/tampilan-banding"
    },
    {
        name: "Rekam Keputusan Keberatan",
        component: RekamKepKeberatan,
        path: "/perbendaharaan/perekaman-keputusan-keberatan"
    },
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