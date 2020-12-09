<template>
<div>
  <div class="head_border">
  </div>

  <article class="content content-about">
    <main class="content__main content-about__main">
      <div class="content-about__head">
        <h1 class="level1-heading_detail">利用方法について</h1>
      </div>
      <section class="content-about__item">
        <div class="content-about__item__inner">
          <h2 class="level2-heading">データについて</h2>
          <p>データカタログサイトは、内閣官房情報通信技術（ＩＴ）総合戦略室による企画・立案の下、総務省行政管理局が運用するオープンデータに係る情報ポータルサイトです。</p>

          <h3 class="level3-heading">背景・目的</h3>
          <p>
            インターネット等の普及により、データを低コストかつ即時に提供することが可能となるとともに、データを利用する企業・国民等においても、コンピュータの能力向上、端末の高度化・多様化等により、大量・多様なデータを処理・利用できるようになってきています。このような状況において、政府、独立行政法人、地方公共団体等が保有する多様で膨大な公共データについて、ビジネスや身近な公共サービスへの活用が期待されるようになってきています。</p>
            <p>このような社会・経済状況を踏まえ、日本政府は、機械判読に適したデータ形式のデータを、営利目的も含めた二次利用が可能な利用ルールで公開する「オープンデータ」の取組を推進することとし、データの横断的検索等の機能を備えたオープンデータの「データカタログサイト」（ポータルサイト）の整備にも取り組むこととしました。</p>
            <p>このサイトは、各府省の保有データをオープンデータとして利用できる場として、データの提供側・利用側双方にオープンデータのイメージを分かりやすく示すことを目的とした、「データカタログサイト」です。</p>
            <p>これにより、オープンデータの利用を促進しその利用事例の収集に役立てるとともに、当サイトに寄せられた利用者等の意見をもとに、継続的な「データカタログサイト」の整備に向けた改善点の検討を行います。また、国際的には、日本政府の一元的なオープンデータのサイトの取組として認知向上を図ります。</p>
            登録しているデータについては、多くのデータを登録する観点から、過去の機械判読が難しいデータ形式のデータについても登録しておりますので、御理解をいただきたいと思います。</p>
          <h3 class="level3-heading">このサイトの制限</h3>
          <p>このサイトは、事前の予告なしに内容を変更、削除又は停止を伴う機能拡張等を実施することがあります。あらかじめ御了承ください。
          </p>
        </div>
      </section>
    </main>
  </article>
  <!-- /.content -->
</div>
</template>
<script lang="ts">
import { Vue, Component, PropSync, Provide } from 'nuxt-property-decorator'

@Component
export default class AboutPage extends Vue {
      head() {
        return {
          title: '利用方法について'
        }
      }
}

</script>