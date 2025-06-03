// const locations = globalMapData;

// const summary = {
//   totalRevenue: locations.reduce((sum, l) => sum + l.revenue, 0),
//   totalEmployees: locations.reduce((sum, l) => sum + l.employees, 0),
//   avgGrowth: (locations.reduce((sum, l) => sum + l.growth, 0) / locations.length).toFixed(1),
//   totalLocations: locations.length,
//   abnormalCount: locations.filter(l => l.isAbnormal).length
// };

// const SidePanel = ({ summary }) => (
//   <div style={{
//     position: 'absolute', left: 20, top: 20, zIndex: 10,
//     background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: 260
//   }}>
//     <h2 style={{marginTop:0}}>グローバル事業概要</h2>
//     <div style={{background:'#E0F7FA', borderRadius:8, padding:12, marginBottom:8}}>
//       <div>総売上</div>
//       <div style={{fontWeight:'bold', fontSize:20}}>¥{summary.totalRevenue.toLocaleString()}</div>
//     </div>
//     <div style={{background:'#EDE7F6', borderRadius:8, padding:12, marginBottom:8}}>
//       <div>総従業員数</div>
//       <div style={{fontWeight:'bold', fontSize:20}}>{summary.totalEmployees.toLocaleString()}人</div>
//     </div>
//     <div style={{background:'#FFF8E1', borderRadius:8, padding:12, marginBottom:8}}>
//       <div>平均成長率</div>
//       <div style={{fontWeight:'bold', fontSize:20}}>{summary.avgGrowth}%</div>
//     </div>
//     <div style={{background:'#E3F2FD', borderRadius:8, padding:12, marginBottom:8}}>
//       <div>グローバル拠点</div>
//       <div style={{fontWeight:'bold', fontSize:20}}>{summary.totalLocations}ヶ所</div>
//     </div>
//     <div style={{background:'#FFF3E0', borderRadius:8, padding:12, marginBottom:8, border:'1px solid #FFB300'}}>
//       <div style={{color:'#FF9800', fontWeight:'bold'}}>要注意拠点</div>
//       <div style={{fontWeight:'bold', fontSize:20}}>{summary.abnormalCount}ヶ所</div>
//       <div style={{fontSize:12, color:'#FF9800'}}>パフォーマンス監視中</div>
//     </div>
//     <div style={{marginTop:16, fontSize:13}}>
//       <div style={{fontWeight:'bold'}}>拠点マーカー説明</div>
//       <div><span style={{color:'#10B981'}}>●</span> 高成長（15%以上）</div>
//       <div><span style={{color:'#F59E0B'}}>●</span> 中程度成長（10-15%）</div>
//       <div><span style={{color:'#EF4444'}}>●</span> 安定成長（10%未満）</div>
//       <div><span style={{color:'#F59E0B'}}>★</span> 要注意拠点</div>
//     </div>
//   </div>
// );