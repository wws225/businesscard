import { supabase } from "../src/utils/supabase";

const tableNames = ["businesscard","user_skill"]
async function deleteYesterdayRows(tableName:string): Promise<void> {
  try {
    console.log(`${tableName}テーブルから前日に作成されたデータを削除します...`);
    
    // 日付の範囲を計算（昨日の00:00:00から23:59:59まで）
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const yesterdayStart = yesterday.toISOString();
    const yesterdayEnd = new Date(today.getTime() - 1).toISOString();
    
    console.log(`対象期間: ${yesterdayStart} から ${yesterdayEnd}`);
    
    // 削除対象の行数を確認
    const { count, error: countError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .gte('created_at', yesterdayStart)
      .lte('created_at', yesterdayEnd);
    
    if (countError) {
      throw new Error(`削除対象行の計数中にエラーが発生しました: ${countError.message}`);
    }
    
    console.log(`削除対象: ${count}行`);
    
    // 実際の削除処理
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .gte('created_at', yesterdayStart)
      .lte('created_at', yesterdayEnd)
      .select();
    
    if (error) {
      throw new Error(`行の削除中にエラーが発生しました: ${error.message}`);
    }
    
    console.log(`削除完了: ${data?.length}行が削除されました`);
  } catch (error) {
    console.error('エラーが発生しました:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

async function processAllTables(): Promise<void> {
  console.log(`処理対象のテーブル: ${tableNames.join(', ')}`);
  
  const results = await Promise.allSettled(
    tableNames.map(tableName => deleteYesterdayRows(tableName))
  );
  
  // 結果の集計
  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  console.log(`処理結果: 成功=${succeeded}, 失敗=${failed}`);
  
  // エラーがあった場合は詳細を表示
  if (failed > 0) {
    console.error('エラーが発生したテーブル:');
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`- ${tableNames[index]}: ${result.reason}`);
      }
    });
    
    // 一つでも失敗があればエラー終了
    if (failed > 0) {
      process.exit(1);
    }
  }
}

// メイン処理の実行
processAllTables()
  .then(() => {
    console.log('すべてのテーブルの処理が完了しました');
    process.exit(0);
  })
  .catch((error) => {
    console.error('予期せぬエラーが発生しました:', error instanceof Error ? error.message : error);
    process.exit(1);
  });