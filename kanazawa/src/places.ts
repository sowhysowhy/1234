import { institutions } from './data'

type Place = { name:string; japanese:string; city:string; cityJa:string; description:string; url?:string }

const hostNames: Record<string, [string,string]> = {
 hakuichi:['箔一 本店 箔巧館','金沢市'],
 fukushima:['福島武山 工房','能美市'],
 akari:['陶芸晄','能美市'],
 miyayoshi:['株式会社宮吉製陶','小松市'],
 soukei:['宗桂会館','金沢市'],
 yamanaka:['石川県立山中漆器産業技術センター','加賀市'],
 kinzan:['錦山窯 嘸旦 MUTAN','小松市'],
}

const hostPlaces = Object.fromEntries(institutions.map(host => {
 const [japanese,cityJa] = hostNames[host.id]
 return [host.id, {
  name:host.id==='hakuichi' ? '箔一總店・箔巧館' : host.name,
  japanese,city:host.city,cityJa,description:host.about+' '+host.study,url:host.url,
 }]
}))

export const places: Record<string,Place> = {
 ...hostPlaces,
 airport:{name:'小松機場',japanese:'小松空港',city:'小松市',cityJa:'小松市',description:'本次研修往返石川縣的機場。',url:'https://www.komatsuairport.jp/'},
 gosai:{name:'能美市九谷燒美術館・五彩館',japanese:'能美市九谷焼美術館 五彩館',city:'能美市',cityJa:'能美市',description:'透過館藏認識九谷燒的色彩、紋樣與歷史。',url:'https://www.kutaniyaki-museum.com/'},
 asakura:{name:'淺藏五十吉紀念館',japanese:'浅蔵五十吉記念館',city:'能美市',cityJa:'能美市',description:'能美市九谷燒美術館的展館之一，呈現淺藏五十吉的作品。',url:'https://www.kutaniyaki-museum.com/'},
 kutaniCenter:{name:'石川縣九谷燒技術中心與技術研修所',japanese:'石川県九谷焼技術センター 九谷焼技術研修所',city:'能美市',cityJa:'能美市',description:'參觀九谷燒技術研修設施，認識和繪具研究及公設作家育成。'},
 cerabo:{name:'CERABO KUTANI（九谷陶瓷實驗室）',japanese:'九谷セラミック・ラボラトリー CERABO KUTANI',city:'小松市',cityJa:'小松市',description:'本案於此學習瓷土製造基礎，並進行手捏陶體驗。',url:'https://cerabo-kutani.com/'},
 kutaniMuseum:{name:'石川縣立九谷燒美術館',japanese:'石川県九谷焼美術館',city:'加賀市',cityJa:'加賀市',description:'透過專業導覽，理解九谷燒的歷史與赤繪細描脈絡。',url:'https://www.kutani-mus.jp/'},
 kiln:{name:'九谷燒窯跡展示館',japanese:'九谷焼窯跡展示館',city:'加賀市',cityJa:'加賀市',description:'參觀登窯，認識再興九谷的磁器窯構造。'},
 craftMuseum:{name:'石川縣立傳統工藝產業館',japanese:'いしかわ生活工芸ミュージアム 石川県立伝統産業工芸館',city:'金澤市',cityJa:'金沢市',description:'透過講座與導覽認識石川的傳統工藝。',url:'https://www.ishikawa-densankan.jp/'},
 hirosaka:{name:'金澤・Craft 廣坂',japanese:'金沢・クラフト広坂',city:'金澤市',cityJa:'金沢市',description:'觀察金澤工藝作品的展示與當代市場流通。',url:'https://www.crafts-hirosaka.jp/'},
 college:{name:'金澤美術工藝大學',japanese:'金沢美術工芸大学',city:'金澤市',cityJa:'金沢市',description:'走訪工藝科進行技術交流，認識高等工藝教育。',url:'https://www.kanazawa-bidai.ac.jp/'},
 workshop:{name:'金澤卯辰山工藝工房',japanese:'金沢卯辰山工芸工房',city:'金澤市',cityJa:'金沢市',description:'透過工房導覽認識公設工藝育成與青年作家支援。',url:'https://www.utatsu-kogei.gr.jp/'},
 higashi:{name:'東山・東茶屋街',japanese:'ひがし茶屋街 東山',city:'金澤市',cityJa:'金沢市',description:'從街區觀察傳統工藝如何融入商業與觀光。',url:'https://www.kanazawa-kankoukyoukai.or.jp/spot/detail_10212.html'},
 yasue:{name:'安江金箔工藝館',japanese:'金沢市立安江金箔工芸館',city:'金澤市',cityJa:'金沢市',description:'透過金箔工藝展示了解材料、製程與應用。',url:'https://www.kanazawa-museum.jp/kinpaku/'},
 factory:{name:'株式會社箔一・工廠研習',japanese:'株式会社箔一 工場',city:'金澤市',cityJa:'金沢市',description:'研習金箔製程、品質管理與商品化。地圖以箔一工廠關鍵字搜尋，集合點以主辦單位通知為準。',url:'https://www.hakuichi.co.jp/'},
}

export const dayPlaces: Record<number,string[]> = {
 1:['airport'],2:['gosai','asakura','kutaniCenter'],3:['cerabo','miyayoshi'],
 4:['kutaniMuseum','fukushima','akari'],5:['kiln','kinzan'],6:['yamanaka'],
 9:['craftMuseum','hirosaka'],10:['college','workshop'],11:['higashi','yasue'],
 12:['hakuichi','factory'],13:['soukei'],17:['airport'],
}

export const dayLocationNotes: Record<number,string> = {
 1:'加賀地區飯店未公布名稱。',7:'金澤市飯店未公布名稱。',
 8:'金澤市內自主調查，無指定景點。',13:'加賀象嵌作家工坊的名稱與地址待主辦單位確認。',
 14:'金澤市內自主調查，無指定景點。',15:'業師面談與成果準備場地待主辦單位確認。',
 16:'座談及成果發表場地待主辦單位確認。',
}

export const mapsUrl = (place:Place) => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place.japanese+' '+place.cityJa)
