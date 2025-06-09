import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import ThemeCustomization from 'themes';
import { GlobalStyles } from "@mui/material";
import ScrollTop from 'components/ScrollTop';


export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <GlobalStyles
          styles={{
            "::-webkit-scrollbar": {
              display: "none",
            },
            "*": {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            },
            "@keyframes fadeIn": {
              from: {
                opacity: 0,
                transform: "translate(-50%, -55%)",
              },
              to: {
                opacity: 1,
                transform: "translate(-50%, -50%)",
              },
            },
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": {
                transform: "translateY(0)",
              },
              "40%": {
                transform: "translateY(-10px)",
              },
              "60%": {
                transform: "translateY(-5px)",
              },
            },
            '& .css-rsqidq-MuiPickersSectionList-root-MuiPickersInputBase-sectionsContainer-MuiPickersOutlinedInput-sectionsContainer': {
              padding: '10.5px 0px',
            },
            ".css - 1tgopf7- MuiPickersInputBase - root - MuiPickersOutlinedInput - root": {
              padding: '8.5px 0px',
            }
          }}
        />
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
