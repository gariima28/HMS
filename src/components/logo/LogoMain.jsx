// material-ui
import { useTheme } from '@mui/material/styles';
import Loggo from "../../assets/images/Loggo.svg"
const Logo = () => {
  const theme = useTheme();

  return (
    <>
      <img src={Loggo} alt="" />
    </>
  );
};

export default Logo;
