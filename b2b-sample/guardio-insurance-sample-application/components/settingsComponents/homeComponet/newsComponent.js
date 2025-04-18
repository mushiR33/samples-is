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

import Image from 'next/image';
import React from 'react';
import { Panel } from 'rsuite';
import image1 from '../../../public/news1.jpeg';
import image2 from '../../../public/news2.jpeg';
import image3 from '../../../public/news3.jpeg';
import image4 from '../../../public/news4.jpeg';
import { getCurrentDate } from '../../../util/util/common/common';

export default function NewsComponent(props) {

    return (
        <div>
            <Panel>
                <Image src={selectImage()} height={800} width={1000} alt='news image'/>
                <p><br /></p>
                <p>{getCurrentDate()}</p>
                <br />
                <h4>{props.header}</h4>
                <p>{props.body}</p>
            </Panel>
        </div>
    )
}

function selectImage(){
    var imageList = [image1,image2,image3,image4];
    
    return imageList[imageList.length * Math.random() | 0];
}
