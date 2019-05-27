import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Loading from '~/pages/Loading';
import Settings from '~/pages/Settings';

// Main
import Coletanea from '~/pages/Main/Coletanea';
import Tema from '~/pages/Main/Tema';
import Avulsos from '~/pages/Main/Avulsos';
import CIA from '~/pages/Main/CIA';

// Autores
import AutoresHome from '~/pages/Autores/AutoresHome';
import AutoresListing from '~/pages/Autores/AutoresListing';
import AutorProfile from '~/pages/Autores/AutorProfile';

// Ritmos
import RitmosHome from '~/pages/Ritmos/RitmosHome';
import RitmosProfile from '~/pages/Ritmos/RitmosProfile';

// User
import Login from '~/pages/User/Login';
import PasswordForgot from '~/pages/User/PasswordForgot';
import NewAccount from '~/pages/User/NewAccount';

// Louvores
import LColetanea from '~/pages/Louvores/LColetanea';
import Letra from '~/pages/Louvores/Letra';
import LSearch from '~/pages/Louvores/LSearch';

const Routes = createAppContainer(
  createSwitchNavigator({
    Loading,
    Login,
    PasswordForgot,
    NewAccount,
    Coletanea,
    Tema,
    Avulsos,
    CIA,
    AutoresHome,
    AutoresListing,
    AutorProfile,
    RitmosHome,
    RitmosProfile,
    Settings,
    LColetanea,
    Letra,
    LSearch,
  }),
);

export default Routes;
