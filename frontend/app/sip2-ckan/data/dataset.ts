/**
 * @file dataset.ts
 * @description 詳細画面、日本語表示項目
 * --------
 * {
 *    "レスポンスのキー": "表示したい日本語"
 * }
 *  
 * 辞書型の場合は、各セクションで表示されている。セクションの値は以下の5種類あり、
 * ":"区切りで、キーを構成する。
 * - organization
 * - tag 
 * - group
 * - resource
 * - extras
 */
export const DatasetTitles: { [key: string]: string } = {
    "title": "データセットのタイトル",
    "notes": "データセットの説明",
    "extras:issued": "データセットの発行日",
    "metadata_created": "データセットの発行日（自動設定）",
    "extras:modified": "データセットの更新日または修正日",
    "metadata_modified": "データセットの更新日または修正日（自動設定）",
    "extras:language": "データセットの情報を記述する言語",
    "extras:publisher_name": "データセットの公開者",
    "extras:publisher_uri": "データセットの公開者（URL)",
    "extras:creator_name": "データセットの作成者",
    "extras:creator_url": "データセットの作成者（URL）",
    "extras:frequency": "データセットの提供頻度",
    "extras:identifier": "データセットのID",
    "extras:spatial_url": "データセットの対象地域(URL)",
    "extras:spatial_text": "データセットの対象地域",
    "extras:spatial": "データセットの対象地域（緯度経度）",
    "extras:temporal_start": "データセットの対象期間（開始）",
    "extras:temporal_end": "データセットの対象期間（終了）",
    "extras:theme": "データセットの主分類",
    "tags": "データセットのキーワード",
    "extras:contact_name": "データセットの窓口",
    "extras:contact_url": "データセットの窓口（URL）",
    "url": "データセットの説明ページURL",
    "extras:dataset_url": "データセットのURL",
    "license_title": "データセットのライセンス",
    "license_url": "データセットのライセンス（URL）",
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
    "resource:license_title": "配信のライセンス",
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
    "extras:caddec_dataset_id_for_detail": "詳細検索用データセットID",
    "resource:caddec_resource_type": "リソース提供手段の識別子",
    "resource:caddec_contract_required": "契約確認の要否",
    "resource:caddec_required": "コネクタ利用の要否",
    "resource:caddec_resource_id_for_provenance": "交換実績記録用リソースID"
  }