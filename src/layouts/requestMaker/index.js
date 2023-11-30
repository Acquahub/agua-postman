import styles from "./requestMaker.module.css";

import Tabs from "./tabs";
import HeadersTab from "./tabs/headersTab";
import ParamsTab from "./tabs/paramsTab";
import BodyTab from "./tabs/bodyTab";

import RequestTitle from "../../components/requestMaker/requestTitle";
import RequestBar from "./requestBar";
import RequestURLInput from "../../components/requestMaker/requestURLInput";
import React, {useEffect, useState} from "react";
import {ModalAlert} from "../../components/modalAlert";
import {forEach} from "react-bootstrap/ElementChildren";

export default function   RequestMaker({selectedRequest, setSelectedRequest, idItem, getClonedItemToPerformAction}) {

    const [show, setShow] = useState(false);

  // requestBar
    const [userInput, setUserInput] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

  // requestTabs
    const [rows, setRows] = useState([]);

        let urlWithPrefix = '';

    if(userInput.startsWith('http://') || userInput.startsWith('https://')) {
        urlWithPrefix = userInput;
    } else {
         urlWithPrefix = 'http://' + userInput;
    }

   try {

       const urlObject = new URL(urlWithPrefix);

       const hostname = urlObject.hostname;
       const port =  urlObject.port;
       const pathname = urlObject.pathname;
       const path = pathname.split('/').filter((part) => part !== '');

       console.log(hostname)
       console.log(port)
       console.log(path)

   } catch (e) {
         console.log(e)
   }





    const handleSave = () => {

        const rowsWithData = rows.filter((row) => row.key !== '');

          if( selectedRequest.request) {
              const parentId = idItem.substring(0, idItem.lastIndexOf('-'));
              const childId = idItem.substring(idItem.lastIndexOf('-') + 1);
              const parent = getClonedItemToPerformAction('update', parentId);

              if(parent.item[childId].request) {
                  parent.item[childId].request.method = selectedOption ? selectedOption.value : 'GET';
                  parent.item[childId].request.url.raw = userInput;

                    if(rowsWithData.length > 0)  parent.item[childId].request.header = rowsWithData;
              }
          } else {
            setShow(true);
          }




    }

  const tabs = [
    {
      name: 'Params',
      element: <ParamsTab selectedRequest={selectedRequest} />
    },
    {
      name: 'Headers',
      element: <HeadersTab selectedRequest={selectedRequest} rows={rows} setRows={setRows}  />
    },
    {
      name: 'Body',
      element: <BodyTab />
    }
  ];






  return (
    <div className={styles['container']}>
      <RequestURLInput userInput={userInput}
      />

      <div className="d-flex align-items-center justify-content-between">
        <div>
          <RequestTitle userInput={userInput}
                        selectedRequest={selectedRequest}
                        setSelectedRequest={setSelectedRequest}
                        idItem={idItem}
                        getClonedItemToPerformAction={getClonedItemToPerformAction}
          />
        </div>
        <div style={{marginRight: '9vw'}}>
          <button type="button" className={styles.send_button} onClick={handleSave}>
              <i className="bi bi-floppy ms"></i>
              <span className="ms-1">Save</span>
          </button>
        </div>
      </div>

      <RequestBar selectedRequest={selectedRequest}
                  setUserInput={setUserInput}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  setSelectedRequest={setSelectedRequest}
      />

      <Tabs tabs={tabs}
      />

        <ModalAlert title="Error"
                    content="You must select a request"
                    show={show}
                    setShow={setShow}
        />
    </div>
  );
}