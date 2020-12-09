<template>
  <div v-if="dataset">
    <div class="head_border"></div>

    <article class="content content-detail">
      <div class="content-detail__meta">
        <div class="content-detail__meta__url">{{ dataset.xckan_id }}</div>
        <div class="content-detail__meta__update">
          {{ dataset.xckan_last_updated }}
        </div>
      </div>
      <main class="content__main content-detail__main">
        <div class="detail">
          <h1 class="level1-heading_detail">{{ dataset.xckan_title }}</h1>
          <a :href="siteUrl" class="content-detail__link" target="_blank">
            <span class="content-detail__link__source"
              >{{ dataset.xckan_site_url }} > dataset</span
            >
            <span class="content-detail__link__title"
              ><span v-if="dataset.xckan_site_name"
                >「{{ dataset.xckan_site_name }}」</span
              >に移動する​</span
            >
          </a>

          <section class="detaset__about">
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">データセットについて</h2>
            </div>
            <div class="detaset__description" v-html="notes"></div>
            <div class="dataset__about__footer">
              <div class="cc-icon" v-if="dataset.license_id">
                <template v-for="cc in creativeCommons">
                  <img :src="cc" />
                </template>
              </div>
              <ul
                class="tag"
                v-for="tag in dataset.tags"
                :key="tag.display_name"
              >
                <li class="tag__item">{{ tag.display_name }}</li>
              </ul>
            </div>
            <div class="update__meta" v-if="dataset.maintainer">
              <div class="update__user" v-if="dataset.maintainer">
                <span class="update__meta__title">更新者 :</span
                >{{ dataset.maintainer }}
              </div>
            </div>
          </section>

          <section class="dataset">
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">データセット</h2>
              <a
                :href="jsonDownlad"
                target="_blank"
                download="dataset.json"
                class="dataset__download"
                ><i class="fas fa-download"></i>JSONダウンロード</a
              >
            </div>
            <table class="dataset__table dataset__main">
              <tbody>
                <tr v-for="(value, key) in common">
                  <th>{{ getTitle("", key) }}</th>
                    <td v-if="dataType(value) == 1" v-html="_makeLink(value)"></td>
                    <td v-else><img :src="value" /></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section class="dataset" v-if="dataset.organization">
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">組織</h2>
            </div>
            <table class="dataset__table dataset__main">
              <tbody>
                <tr v-for="(value, key) in dataset.organization">
                  <th>{{ getTitle("organization", key) }}</th>
                  <td v-html="_makeLink(value)"></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section
            class="dataset"
            v-if="dataset.tags && dataset.tags.length > 0"
          >
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">データセットのキーワード</h2>
            </div>

            <div
              class="dataset__sub"
              v-for="(items, index) in dataset.tags"
              :key="index"
            >
              <h3 class="level3-heading_dataset">キーワード{{ index + 1 }}</h3>
              <table class="dataset__table dataset__main">
                <tbody>
                  <template v-for="(value, key) in items">
                    <tr>
                      <th>{{ getTitle("tags", key) }}</th>
                      <td v-html="_makeLink(value)"></td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </section>

          <section
            class="dataset"
            v-if="dataset.groups && dataset.groups.length > 0"
          >
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">グループ</h2>
            </div>

            <div
              class="dataset__sub"
              v-for="(items, index) in dataset.groups"
              :key="index"
            >
              <h3 class="level3-heading_dataset">グループ{{ index + 1 }}</h3>
              <table class="dataset__table dataset__main">
                <tbody>
                  <template v-for="(value, key) in items">
                    <tr>
                      <th>{{ getTitle("groups", key) }}</th>
                      <td v-html="_makeLink(value)"></td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </section>

          <section
            class="dataset"
            v-if="dataset.resources && dataset.resources.length > 0"
          >
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">配信</h2>
            </div>

            <div
              class="dataset__sub"
              v-for="(items, index) in dataset.resources"
              :key="index"
            >
              <h3 class="level3-heading_dataset">配信{{ index + 1 }}</h3>
              <table class="dataset__table dataset__main">
                <tbody>
                    <tr v-for="(value, key) in items" :key="key">
                      <th>{{ getTitle("resource", key) }}</th>
                      <td v-html="_makeLink(value)"></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section
            class="dataset"
            v-if="dataset.extras && dataset.extras.length > 0"
          >
            <div class="dataset__head">
              <h2 class="level2-heading_dataset">付加情報</h2>
            </div>
            <table class="dataset__table dataset__main">
              <tbody>
                <tr v-for="(value, key) in extras" :key="key">
                  <th>{{ getTitle("extras", key) }}</th>
                  <td v-html="_makeLink(value)"></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </article>
    <!-- /.content -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Provide } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { datasetStore } from "~/store";
import { Dataset } from "~/store/models";

import IndexPage from "../index.vue";

interface DisplayDataSetItem {
  title: String;
  parentKey: string;
  key: string;
}

interface DisplayItem {
  title: String;
  value: String;
}

interface DisplayTitle {
  key: String;
  title: String;
}

@Component
export default class DatasetPage extends Vue {
  private extras: { [key: string]: string } = {};
 
  get dataset(): any | null {
    let _dataset = datasetStore.of(this.$route.params.id);
    if (_dataset) {
      if (Object.keys(this.extras).length == 0 && _dataset.extras) {
        _dataset.extras.forEach((element) => {
          if (element.value.length > 0) {
            this.extras[element.key] = element.value;
          }
        });
      }
    }
    return _dataset as any;
  }

  get common(): any | null {
    var _common = Object.assign({}, this.dataset);
    delete _common["groups"];
    delete _common["extras"];
    delete _common["organization"];
    delete _common["resources"];
    delete _common["tags"];
    return _common;
  }

  get siteUrl(): String {
    if (this.dataset) {
      return this.dataset.xckan_site_url;
    } else {
      return "";
    }
  }

  get notes(): String {
    if (this.dataset && this.dataset.notes) {
      return this._makeLink(this.dataset.notes);
    } else {
      return "";
    }
  }

  get jsonDownlad(): String {
    return process.env.api + "/package_show?id=" + this.$route.params.id;
  }

  get creativeCommons(): String[] {
    let licenseId = this.dataset.license_id.toLowerCase();
    var marks: String[] = [];
    if (licenseId.search("by") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/by.svg"));
    }
    if (licenseId.search("nc") >= 0) {
      if (licenseId.search("eu") >= 0) {
        marks.push(require("@/static/images/cc-icons-svg/nc-eu.svg"));
      } else if (licenseId.search("ja") >= 0) {
        marks.push(require("@/static/images/cc-icons-svg/nc-jp.svg"));
      } else {
        marks.push(require("@/static/images/cc-icons-svg/nc.svg"));
      }
    }
    if (licenseId.search("sa") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/sa.svg"));
    }
    if (licenseId.search("nd") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/nd.svg"));
    }
    if (licenseId.search("pd") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/pd.svg"));
    }
    if (licenseId.search("zero") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/zero.svg"));
    }
    if (licenseId.search("sampling") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/sampling.svg"));
    }
    if (licenseId.search("share") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/share.svg"));
    }
    if (licenseId.search("remix") >= 0) {
      marks.push(require("@/static/images/cc-icons-svg/remix.svg"));
    }
    if (marks.length > 0) {
      marks.unshift(require("@/static/images/cc-icons-svg/cc.svg"));
    }
    return marks;
  }

  isTruthy(data: any): Boolean {
    type Falsy = false | 0 | "" | null | undefined;
    const _isTruthy = <T>(x: T | Falsy): x is T => !!x;
    return _isTruthy(data);
  }

  isExistValue(dataItem: DisplayDataSetItem): Boolean {
    if (dataItem.parentKey.length > 0) {
      if (dataItem.parentKey == "extras") {
        return this.isTruthy(this.extras[dataItem.key]);
      }
      return (
        this.isTruthy(this.dataset[dataItem.parentKey]) &&
        this.isTruthy(this.dataset[dataItem.parentKey][dataItem.key])
      );
    } else {
      return this.isTruthy(this.dataset[dataItem.key]);
    }
  }

  getValue(dataItem: DisplayDataSetItem): any {
    if (dataItem.parentKey.length > 0) {
      if (dataItem.parentKey == "extras") {
        return this.extras[dataItem.key];
      }
      return this.dataset[dataItem.parentKey][dataItem.key];
    } else {
      if (dataItem.key == "tags") {
        let elements = this.dataset["tags"].map(
          (element: any) => element.display_name
        );
        return elements.join(", ");
      }
      return this.dataset[dataItem.key];
    }
  }

  isExistResourceValue(index: number, dataItem: DisplayDataSetItem): Boolean {
    if (dataItem.parentKey == "extras") {
      return this.isTruthy(this.extras[dataItem.key]);
    }
    return this.isTruthy(this.dataset.resources[index][dataItem.key]);
  }

  getResourceValue(index: number, dataItem: DisplayDataSetItem): any {
    if (dataItem.parentKey == "extras") {
      return this.isTruthy(this.extras[dataItem.key]);
    }
    return this.dataset.resources[index][dataItem.key];
  }

  get displayTitles(): { [key: string]: string } {
    return {
      title: "データセットのタイトル",
      notes: "データセットの説明",
      "extras:issued": "データセットの発行日",
      metadata_created: "データセットの発行日（自動設定）",
      "extras:modified": "データセットの更新日または修正日",
      metadata_modified: "データセットの更新日または修正日（自動設定）",
      "extra:language": "データセットの情報を記述する言語",
      "extra:publisher_name": "データセットの公開者",
      "extras:publisher_uri": "データセットの公開者（URL)",
      "extra:creator_name": "データセットの作成者",
      "extras:creator_url": "データセットの作成者（URL）",
      "extras:frequency": "データセットの提供頻度",
      "extras:identifier": "データセットのID",
      "extras:spatial_url": "データセットの対象地域(URL)",
      "extras:spatial_text": "データセットの対象地域",
      "extras:spatial": "データセットの対象地域（緯度経度）",
      "extras:temporal_start": "データセットの対象期間（開始）",
      "extras:temporal_end": "データセットの対象期間（終了）",
      "extras:theme": "データセットの主分類",
      tags: "データセットのキーワード",
      "extras:contact_name": "データセットの窓口",
      "extras:contact_url": "データセットの窓口（URL）",
      url: "データセットの説明ページURL",
      "extras:dataset_url": "データセットのURL",
      license_url: "データセットのライセンス（URL）",
      "extras:vocabulary": "語彙",
      "extras:term": "用語",
      "extras:trading_policy_contract_type": "契約形態",
      "extras:trading_policy_nda": "秘密保持義務",
      "extras:trading_policy_use_application": "利用用途",
      "extras:terms_of_use_redistribution_range": "開示範囲",
      "extras:terms_of_use_permissible_region": "データ活用地域",
      "extras:terms_of_use_notices": "利用に関する注意事項",
      "extras:privacy_policy_contains_personal_data": "パーソナルデータの類別",
      "extras:usage_period_effective_period_of_data": "データの有効期間",
      "extras:usage_period_expiration_period": "利用ライセンスの期限",
      "extras:fee": "有償無償",
      "extras:sales_info_url": "販売情報URL",
      "extras:pricing_price_range": "価格帯",
      "extras:pricing_notices_of_price": "データ販売に関わる特記事項",
      "extras:warranty_express_warranty": "明示された保証",
      "extras:warranty_legal_compliance": "準拠法の対象国",
      "resource:name": "配信の名称",
      "resource:description": "配信の説明",
      "resource:created": "配信の開始日（自動設定）",
      "resource:issued": "配信の発行日",
      "resource:last_modified": "配信の最終変更日（自動設定）",
      "resource:modified": "配信の変更日",
      license_title: "配信のライセンス",
      "resource:license_url": "配信のライセンス（URL）",
      "extras:rights": "配信の利用規約",
      "resource:url": "配信の情報提供ページURL",
      "resource:access_url": "配信のアクセスURL",
      "resource:download_url": "配信のダウンロードURL",
      "resource:size": "配信のバイトサイズ",
      "resource:mime_type": "配信のメディアタイプ",
      "resource:format": "配信のファイル形式",
      "resource:schema": "スキーマ",
      "resource:schema_type": "スキーマタイプ",
      "resource:ngsi_tenant": "NGSIテナント",
      "resource:ngsi_service_path": "NGSIサービスパス",
      "extras:caddec_provider_id": "提供者ID",
      "resource:caddec_resource_type": "リソース提供手段の識別子",
      "resource:caddec_contract_required": "契約確認の要否",
      "resource:caddec_required": "コネクタ利用の要否",
      "resource:caddec_resource_id_for_provenance": "交換実績記録用リソースID",
      "extras:caddec_dataset_id_for_detail": "詳細検索用データセットID",
    };
  }

  getTitle(prefix: string, key: string): string {
    var _key = key;
    if (prefix.length > 0) {
      _key = prefix + ":" + key;
    }

    return this.displayTitles[_key] ? this.displayTitles[_key] : key;
  }

  @Provide() headData: { [name: string]: any } = {};

  async asyncData(context: Context): Promise<any> {
    let data = await datasetStore.fetch({
      id: context.params.id,
    });
    if (!data) {
      return context.redirect("/404");
    }
    var head: { [name: string]: any } = {};
    if (data.xckan_site_name) {
      head["title"] = data.xckan_site_name;
    } else {
      head["title"] = "";
    }
    if (data.notes) {
      head["description"] = data.notes;
    }
    if (data.tags) {
      let keywords = data.tags.map((elem: any) => elem.display_name).join(",");
      head["keywords"] = keywords;
    }
    if (data.organization && data.organization.image_url) {
      head["image_url"] = data.organization.image_url;
    }
    if (data.organization && data.organization.title) {
      head["creator"] = data.organization.title;
    }
    return data ? { headData: head } : context.redirect("/404");
  }

  head() {
    var meta: { [name: string]: any }[] = [];
    meta.push({
      hid: "og:site_name",
      property: "og:site_name",
      content: "データカタログ横断検索システム",
    });
    meta.push({
      hid: "og:title",
      property: "og:title",
      content: this.headData["title"],
    });
    meta.push({
      hid: "twitter:title",
      property: "twitter:title",
      content: this.headData["title"],
    });
    let url = process.env.web + this.$route.path;
    meta.push({ hid: "og:url", property: "og:url", content: url });
    meta.push({
      hid: "twitter:card",
      property: "twitter:card",
      content: "summary",
    });
    if (this.headData["description"]) {
      meta.push({
        hid: "description",
        name: "description",
        content: this.headData["description"],
      });
      meta.push({
        hid: "og:description",
        property: "og:description",
        content: this.headData["description"],
      });
      meta.push({
        hid: "twitter:description",
        property: "twitter:description",
        content: this.headData["description"],
      });
    }
    if (this.headData["keywords"]) {
      meta.push({
        hid: "keywords",
        name: "keywords",
        content: this.headData["keywords"],
      });
    }
    if (this.headData["image_url"]) {
      meta.push({
        hid: "og:image",
        property: "og:image",
        content: this.headData["image_url"],
      });
    }
    if (this.headData["image_url"]) {
      meta.push({
        hid: "og:image",
        property: "og:image",
        content: this.headData["image_url"],
      });
      meta.push({
        hid: "twitter:image",
        property: "twitter:image",
        content: this.headData["image_url"],
      });
    }
    if (this.headData["creator"]) {
      meta.push({
        hid: "twitter:creator",
        property: "twitter:creator",
        content: this.headData["creator"],
      });
    }
    return {
      title: this.headData.title,
      meta: meta,
    };
  }

  dataType(content: any): number {
    return (typeof content === 'string' && content.indexOf("data:image") >= 0) ? 0 : 1
  }

  convertString(content: any): any {
    var conv: any = content
    let self = this
    if(content == null || content === undefined) {
      return ""
    } else if(typeof content == 'object') {
      if(Array.isArray(content)) {
        var convArray = content.map(x => self.convertString(x))
        conv = convArray.join("<br/>")
      } else {
        var convArray = []
        Object.keys(content).forEach(key => {
          //console.log(key, content[key])
          convArray.push(key + ":" + self.convertString(content[key]))
        })
        conv = convArray.join("<br/>")
      }
    } 
    return conv
  }

  _makeLink(target: any): String {
    //var content = target
    var content = this.convertString(target)
    var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; 
    var regexp_makeLink = function (
      all: String,
      url: String,
      h: String,
      href: String
    ) {
      return '<a href="h' + href + '">' + url + "</a>";
    };
    let _target = `${content}`;
    if(_target.indexOf("data:image") >= 0) {
      console.log(typeof content)
      console.log("image")
    }
    return _target.replace(regexp_url, regexp_makeLink);
  }
}
</script>