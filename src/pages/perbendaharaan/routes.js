import Perbendaharaan from '../perbendaharaan';
// @Keberatan
import BrowseKeberatan from './dashboard/Keberatan/BrowseKeberatan';
import RekamKeberatan from './dashboard/Keberatan/RekamKeberatan';
import RekamKepKeberatan from './dashboard/Keberatan/RekamKepKeberatan';
import DisposisiDokKeberatan from './dashboard/Keberatan/DisposisiDokKeberatan';
import PencabutanKeberatan from './dashboard/Keberatan/PencabutanKeberatan';
// @Banding
import TampilBanding from './dashboard/Banding/TampilBanding';
import RekamSUB from './dashboard/Banding/RekamSUB';
import RekamPermintaanSUB from './dashboard/Banding/RekamPermintaanSUB';

const appRoutes = [
    {
        name: "Pencabutan Keberatan",
        component: PencabutanKeberatan,
        exact: true,
        path: "/pencabutan-keberatan"
    },
    {
        name: "Perekaman Permintaan SUB",
        component: RekamPermintaanSUB,
        exact: true,
        path: "/perekaman-permintaan-sub"
    },
    {
        name: "Perekaman SUB",
        component: RekamSUB,
        exact: true,
        path: "/perekaman-sub"
    },
    {
        name: "Tampil Banding",
        component: TampilBanding,
        exact: true,
        path: "/tampil-banding"
    },
    {
        name: "Disposisi Dokumen Keberatan",
        component: DisposisiDokKeberatan,
        exact: true,
        path: "/disposisi-dokumen-keberatan"
    },
    {
        name: "Perekaman Keputusan Keberatan",
        component: RekamKepKeberatan,
        exact: true,
        path: "/perekaman-keputusan-keberatan"
    },
    {
        name: "Perekaman Keberatan",
        component: RekamKeberatan,
        exact: true,
        path: "/perekaman-keberatan"
    },
    {
        name: "Browse Keberatan",
        component: BrowseKeberatan,
        exact: true,
        path: "/browse-keberatan"
    },
    {
        name: "Home",
        component: Perbendaharaan,
        exact: true,
        path: "/"
    }
];

export default appRoutes;