import styles from "./requestMaker.module.css";

import Tabs from "./tabs";
import HeadersTab from "./tabs/headersTab";
import ParamsTab from "./tabs/paramsTab";
import BodyTab from "./tabs/bodyTab";

import RequestTitle from "../../components/requestMaker/requestTitle";
import RequestBar from "./requestBar";
import RequestURLInput from "../../components/requestMaker/requestURLInput";
import React, {useEffect, useState} from "react";

export default function   RequestMaker({selectedRequest, setSelectedRequest, idItem, getClonedItemToPerformAction}) {

  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  console.log('selectedOption', selectedOption )
  console.log('userInput', userInput)

  const tabs = [
    {
      name: 'Params',
      element: <ParamsTab selectedRequest={selectedRequest} />
    },
    {
      name: 'Headers',
      element: <HeadersTab selectedRequest={selectedRequest}  />
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

      <div className="d-flex align-items-center">
        <div  className="me-5">
          <RequestTitle userInput={userInput}
                        selectedRequest={selectedRequest}
                        setSelectedRequest={setSelectedRequest}
                        idItem={idItem}
                        getClonedItemToPerformAction={getClonedItemToPerformAction}
          />
        </div>
        <div>
          <button type="button" className="btn btn-outline-warning">
            Save
          </button>
        </div>
      </div>

      <RequestBar selectedRequest={selectedRequest}
                  setUserInput={setUserInput}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  setSelectedRequest={setSelectedRequest}
                  idItem={idItem}
                  getClonedItemToPerformAction={getClonedItemToPerformAction}
      />

      <Tabs tabs={tabs}
      />
    </div>
  );
}