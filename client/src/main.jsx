import React from 'react'
import ReactDOM from 'react-dom/client';
import "@/components/app/index.scss";
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from 'antd';
import {Provider} from "react-redux";
import {store} from "@/lib/store.js";
import ru_RU from "antd/lib/locale/ru_RU";
import {router} from "@/lib/routing.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    locale={ru_RU}
    theme={{
      token: {
        colorPrimary: '#ff5555',
        borderRadius: 5,
        colorBgContainer: '#fff',
        colorText: '#343434',
      },
      components: {
        Statistic: {
          contentFontSize: 36,
          titleFontSize: 14
        },
        Calendar: {
          fullBg: 'transparent',
          transparent: 'transparent'
        },
        List: {
          itemPadding: '18px 18px'
        }
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </ConfigProvider>
);