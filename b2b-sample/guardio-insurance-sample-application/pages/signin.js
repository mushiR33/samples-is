/*
 * Copyright (c) 2022 WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'rsuite';
import config from '../config.json';
import styles from '../styles/Signin.module.css';

import "rsuite/dist/rsuite.min.css";
import Logo from '../components/logo/logo';
import { stringIsEmpty } from '../util/util/common/common';
import { LOADING_DISPLAY_BLOCK, LOADING_DISPLAY_NONE } from '../util/util/frontendUtil/frontendUtil';
import { orgSignin } from '../util/util/routerUtil/routerUtil';

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {

    return {
      redirect: {
        destination: '/o',
        permanent: false,
      },
    }
  }

  const org_list = config.SAMPLE_ORGS;
  const subOrgActiveInitList = [];
  org_list.map(() => subOrgActiveInitList.push(false));

  return {
    props: { org_list, subOrgActiveInitList }
  }
}

export default function Signin(props) {

  useEffect(() => {
    document.body.className = ""
  }, []);

  const [subOrgId, setSubOrgId] = useState("");
  const [subOrgActive, setSubOrgActive] = useState(props.subOrgActiveInitList);
  const [title, setTitle] = useState("Organization");

  const [showError, setShowError] = useState(LOADING_DISPLAY_NONE);

  let orgSelect = (event) => {
    setSubOrgId(event);
    changeDropTitle(event);
  }

  const changeDropTitle = (event) => {
    setShowError(LOADING_DISPLAY_NONE);
    for (var i = 0; i < props.org_list.length; i++) {
      if (props.org_list[i].id == event) {
        setSubOrgId(props.org_list[i].id);

        setTitle(props.org_list[i].name);
        setSubOrgActive(changeSubOrgActive(i));
        break;
      }
    }
  }

  const changeSubOrgActive = (index) => {
    const subOrgActiveCopy = subOrgActive;
    subOrgActiveCopy[index] = true;
    for (var i = 0; i < subOrgActiveCopy.length; i++) {
      if (i == index) {
        continue;
      }
      subOrgActiveCopy[i] = false;
    }

    return subOrgActiveCopy;
  }

  let nextOnClick = (event) => {
    if (stringIsEmpty(subOrgId)) {
      setShowError(LOADING_DISPLAY_BLOCK);

      return;
    }
    setShowError(LOADING_DISPLAY_NONE);

    orgSignin(subOrgId);
  }

  const showDropDownItems = () => {
    
    return props.org_list.map((org) => (
      <Dropdown.Item key={org.id} eventKey={org.id} className={styles.signinDropdownItem}
        onSelect={(event) => orgSelect(event)}>{org.name}</Dropdown.Item>
    ));
  }

  return (
    <div className={styles.signinOuter}>
      <div className={styles.signinInner}>
        <Logo fontSize={28} letterSpacing={-2} wordSpacing={-3} />
        <div className={styles.signInTextDiv}>
          <p className={styles.signinText}>Sign in</p>
          <p className={styles.signinTag}>Select your organization to proceed</p>
        </div>

        <div className={styles.signinDropdownDiv}>
          <Dropdown activeKey={subOrgId} className={styles.signinDropdown} title={title} trigger={['click', 'hover']}
            onSelect={(event) => orgSelect(event)}>

            {showDropDownItems()}

          </Dropdown>

          <p style={showError}>Select an organization to proceed.</p>
        </div>

        <div className={styles.buttonCarousell}>
          <Button className={styles.nextButton} size="lg" appearance='primary'
            onClick={(event) => nextOnClick(event)}>Next</Button>
          <Button size="lg" appearance="link">Register</Button>
        </div>
      </div>
    </div>
  )
}
