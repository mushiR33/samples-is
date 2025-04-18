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
import React from 'react';
import config from '../../config.json';
import { redirect } from '../../util/util/routerUtil/routerUtil';

export async function getServerSideProps(context) {
    
    const session = await getSession(context);
    const setVar = 1;

    if (!session) {

        return redirect('/signin');
    } 

    if (setVar==1) {

        return redirect(`/o/${config.SAMPLE_ORGS[0].routerQuery}`);
    } else {

        return redirect(`/o/${config.SAMPLE_ORGS[1].routerQuery}`);
    }

}

export default function OIndex() {
  
  return (
    <div>index</div>
  )
}
