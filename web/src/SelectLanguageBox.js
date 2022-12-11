// Copyright 2021 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import * as Setting from "./Setting";
import {Dropdown, Menu} from "antd";
import "./App.less";

function flagIcon(country, alt) {
  return (
    <img width={24} alt={alt} src={`${Setting.StaticBaseUrl}/flag-icons/${country}.svg`} />
  );
}

export const countries = [{label: "English", key: "en", country: "US", alt: "English"},
  {label: "简体中文", key: "zh", country: "CN", alt: "简体中文"},
  {label: "Español", key: "es", country: "ES", alt: "Español"},
  {label: "Français", key: "fr", country: "FR", alt: "Français"},
  {label: "Deutsch", key: "de", country: "DE", alt: "Deutsch"},
  {label: "日本語", key: "ja", country: "JP", alt: "日本語"},
  {label: "한국어", key: "ko", country: "KR", alt: "한국어"},
  {label: "Русский", key: "ru", country: "RU", alt: "Русский"},
];

class SelectLanguageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      languages: props.languages ?? ["en", "zh", "es", "fr", "de", "ja", "ko", "ru"],
    };
  }

  items = countries.map((country) => this.getItem(country.label, country.key, flagIcon(country.country, country.alt)));

  getOrganizationLanguages(languages) {
    const select = [];
    for (const language of languages) {
      this.items.map((item, index) => item.key === language ? select.push(item) : null);
    }
    return select;
  }

  getItem(label, key, icon) {
    return {key, icon, label};
  }

  render() {
    const languageItems = this.getOrganizationLanguages(this.state.languages);
    const menu = (
      <Menu items={languageItems} onClick={(e) => {
        Setting.setLanguage(e.key);
      }}>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} >
        <div className="language-box" style={{display: languageItems.length === 0 ? "none" : null, ...this.props.style}} />
      </Dropdown>
    );
  }
}

export default SelectLanguageBox;
