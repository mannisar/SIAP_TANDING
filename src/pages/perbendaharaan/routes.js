import Perbendaharaan from '../perbendaharaan';
import BrowseKeberatan from './dashboard/BrowseKeberatan';
import RekamKeberatan from './dashboard/RekamKeberatan';
import RekamKepKeberatan from './dashboard/RekamKepKeberatan';
import DisposisiDokKeberatan from './dashboard/DisposisiDokKeberatan';

const appRoutes = [
    {
        name: "Disposisi Dokumen Keberatan",
        component: DisposisiDokKeberatan,
        exact: true,
        path: "/disposisi-dokumen-keberatan"
    },
    {
        name: "Rekam Keputusan Keberatan",
        component: RekamKepKeberatan,
        exact: true,
        path: "/perekaman-keputusan-keberatan"
    },
    {
        name: "Rekam Keberatan",
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