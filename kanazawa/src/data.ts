export const program = {
 title:'金澤職人夢', subtitle:'青年百億海外圓夢基金計畫－海外翱翔組 M-2-8', dates:'2027.06.20–07.06', duration:17, places:10,
 category:'創業育成與產業交流', location:'日本・石川縣', motto:'從一片金箔、一抹釉彩，走進日本職人的世界。',
 source:'/documents/M-2-8.pdf',
}
export const crafts = [
 {id:'kutani',name:'九谷燒',en:'Kutani Ware', material:'赤繪、釉彩與瓷土', text:'從九谷五彩與瓷土製程出發，觀察赤繪細描與金彩技術如何在當代窯元的營運、創作與品牌展示中延續。'},
 {id:'lacquer',name:'山中漆器',en:'Yamanaka Lacquerware',material:'木紋、車削與漆面',text:'研究轆轤車削、蒔繪與相關漆藝，透過實作理解技術指導方式，以及公設機構的職人培育體系。'},
 {id:'gold',name:'金澤金箔',en:'Kanazawa Gold Leaf',material:'薄箔、光澤與金工',text:'走進金箔工廠理解製造流程、品質管理與商品化，再觀察金箔如何融入地方觀光與品牌應用。'},
 {id:'inlay',name:'加賀象嵌',en:'Kaga Inlay',material:'金屬、刻線與鑲嵌',text:'透過專門美術館導覽與作家工坊交流，探究金屬鑲嵌技法以及職人社群的傳承方式。'},
]
export const institutions = [
 {id:'hakuichi',name:'株式會社箔一',city:'金澤市',craft:'gold',about:'金澤金箔代表企業。',study:'金箔製作工序、工廠研修、品質管理、商品化應用及品牌經營。',url:'https://www.hakuichi.co.jp/'},
 {id:'fukushima',name:'福島武山工房',city:'能美市',craft:'kutani',about:'九谷燒赤繪細描代表工房之一。',study:'赤繪細描技法觀摩、專業導覽及工房交流。',url:'https://www.instagram.com/fukushima_buzan_kutani/'},
 {id:'akari',name:'陶藝晄（陶芸晄）',city:'能美市',craft:'kutani',about:'九谷燒相關作家工房。',study:'九谷燒技法示範、作家交流與工房研修。',url:'https://kutani-midori.jimdofree.com/'},
 {id:'miyayoshi',name:'宮吉製陶（株式会社宮吉製陶）',city:'小松市',craft:'kutani',about:'九谷燒窯元。',study:'窯元營運、製程導覽與實務研修。',url:'https://miyayoshiseitou.jp/'},
 {id:'soukei',name:'宗桂會館（公益財團法人宗桂会）',city:'金澤市',craft:'inlay',about:'加賀象嵌專門美術館與相關推廣據點。',study:'專業導覽、技法說明與加賀象嵌交流。',url:'https://www.soukeikai.or.jp/'},
 {id:'yamanaka',name:'石川縣立山中漆器產業技術中心',city:'加賀市',craft:'lacquer',about:'日本重要之山中漆器研修設施。',study:'轆轤車削、蒔繪及相關漆藝研修。',url:'https://yamanaka696.org/'},
 {id:'kinzan',name:'錦山窯（株式会社錦山窯）',city:'小松市',craft:'kutani',about:'九谷燒重要窯元，設有展示空間「嘸旦－MUTAN－」。',study:'展示空間導覽、品牌經營觀察與金彩技法相關交流。',url:'https://kinzangama.com/'},
]
type Day = {day:number;date:string;phase:string;title:string;crafts:string[];hosts:string[];activities:string[];goal?:string}
export const days: Day[] = [
 {day:1,date:'06/20',phase:'week1',title:'從臺灣啟程，抵達加賀',crafts:[],hosts:[],activities:['臺灣出發，抵達小松機場後前往加賀地區，辦理飯店入住。']},
 {day:2,date:'06/21',phase:'week1',title:'九谷燒的百年色彩體系',crafts:['kutani'],hosts:[],activities:['見學能美市九谷燒美術館・五彩館及淺藏五十吉紀念館。','參觀石川縣九谷燒技術中心與技術研修所。'],goal:'細察九谷五彩與巨匠作品的美學，了解無鉛和繪具的科學研究，以及公設體系如何支援年輕作家自立。'},
 {day:3,date:'06/22',phase:'week1',title:'從瓷土到現代窯元',crafts:['kutani'],hosts:['miyayoshi'],activities:['於 CERABO KUTANI（九谷陶瓷實驗室）學習瓷土製造基礎，進行手捏陶體驗。','參與宮吉製陶的專業工藝產業導覽與研究。'],goal:'在現代窯元學習營運、製程管理與製作實務。'},
 {day:4,date:'06/23',phase:'week1',title:'九谷燒赤繪細描實作',crafts:['kutani'],hosts:['fukushima','akari'],activities:['參加石川縣立九谷燒美術館專業導覽。','在福島武山工房與陶藝晄接受工藝指導並交流。'],goal:'觀察並體驗赤繪細描等代表技法，串聯九谷燒的歷史起源與當代作家實踐。'},
 {day:5,date:'06/24',phase:'week1',title:'再興九谷的登窯與金彩品牌',crafts:['kutani'],hosts:['kinzan'],activities:['上午了解九谷燒窯跡背景，參觀現存最古老的九谷燒登窯。','下午於錦山窯「嘸旦－MUTAN－」接受展示空間導覽並交流。'],goal:'理解再興九谷的磁器窯構造、逾 110 年傳承的金彩技術，以及傳統工藝如何透過現代設計、空間美學和行銷建立品牌。'},
 {day:6,date:'06/25',phase:'week1',title:'山中漆器的轆轤車削與蒔繪',crafts:['lacquer'],hosts:['yamanaka'],activities:['全天至石川縣立山中漆器產業技術中心研修，接受轆轤車削等實作指導。'],goal:'調查轆轤車削（ろくろ挽き）與蒔繪（蒔絵）的指導體系及手冊化機制，透過實作驗證。'},
 {day:7,date:'06/26',phase:'week1',title:'從加賀移動至金澤',crafts:[],hosts:[],activities:['移動至金澤並辦理飯店入住。','蒐集資料及整理報告。']},
 {day:8,date:'06/27',phase:'week2',title:'自主調查與第一週紀錄',crafts:[],hosts:[],activities:['自由時間，可於金澤市內自主調查或休息調整。','整理第一週學習內容，撰寫報告及製作影片初稿。']},
 {day:9,date:'06/28',phase:'week2',title:'傳統工藝 36 業種與現代市場',crafts:[],hosts:[],activities:['在石川縣立傳統工藝產業館（いしかわ生活工芸ミュージアム）參加特別講座及專業導覽。','參加金澤・Craft 廣坂（クラフト広坂）專業導覽。'],goal:'了解石川與金澤傳統工藝的基礎知識、色彩體系及現代市場流通。'},
 {day:10,date:'06/29',phase:'week2',title:'工藝教育與公設育成',crafts:[],hosts:[],activities:['與金澤美術工藝大學工藝科進行技術交流。','參加金澤卯辰山工藝工房專業導覽與工藝產業研究。'],goal:'驗證技術語言化、高等工藝教育與年輕作家獨立支援設施。透過館方導覽觀察工藝史、材料應用、品牌轉譯與地方創生，作為成果報告的比較素材。'},
 {day:11,date:'06/30',phase:'week2',title:'金箔製造科技與品質管理',crafts:['gold'],hosts:['hakuichi'],activities:['於株式會社箔一參加總店專業導覽及工廠研習。'],goal:'學習萬分之一毫米金箔的製造流程、現代品質管理系統與商品化進程。'},
 {day:12,date:'07/01',phase:'week2',title:'傳統工藝與觀光品牌',crafts:['gold'],hosts:[],activities:['探訪東山・東茶屋街與安江金箔工藝館。'],goal:'以東茶屋街為例，理解傳統工藝如何轉化為商業及觀光內容。'},
 {day:13,date:'07/02',phase:'week2',title:'加賀象嵌技法與社群傳承',crafts:['inlay'],hosts:['soukei'],activities:['參與宗桂會館加賀象嵌專門美術館的專業導覽。','與加賀象嵌作家工坊交流。'],goal:'調查加賀象嵌的金屬加飾技法，以及在地職人之間的技術傳承系統。'},
 {day:14,date:'07/03',phase:'week2',title:'自主調查與成果資料整理',crafts:[],hosts:[],activities:['自由時間，可整理成果發表的個人資料，或於金澤市內自主調查。'],goal:'為第 16 日的成果發表準備素材。'},
 {day:15,date:'07/04',phase:'final',title:'成果發表準備及業師面談',crafts:[],hosts:[],activities:['準備成果發表並與業師面談。'],goal:'彙整翌日的簡報資料、整理學習內容並提交報告及影片初稿。'},
 {day:16,date:'07/05',phase:'final',title:'臺日青年職人座談及成果發表',crafts:[],hosts:[],activities:['與石川縣傳統青年會議座談。','參加成果發表會。'],goal:'以 15 日研修累積的資料發表成果，與在地青年職人討論實際課題。'},
 {day:17,date:'07/06',phase:'final',title:'從小松機場返回臺灣',crafts:[],hosts:[],activities:['自金澤市內移動至小松機場，返回臺灣。']},
]
export const requirements = [
 '具中華民國國籍，年齡 18 至 30 歲。','能全程參與海外見習，並配合成果紀錄及社群宣傳。',
 '願意參與行前培訓與行前語言加強課程。','具備基礎日語會話與聽力（約 JLPT N4／CEFR A2 以上），或具備良好英語溝通能力（約 CEFR B1）。',
]
export const preferences = [
 '具工藝、美術、設計、陶藝、漆藝、金工、染織、文化資產保存或文化創意產業等相關背景或就學經驗。',
 '對日本傳統工藝、職人精神與地方文化傳承有濃厚興趣。','日語優於 N4（N3、N2、N1）。',
 '具良好溝通能力，以及社群媒體經營或影像紀錄能力。','符合簡章所列弱勢身分，如經濟弱勢、原住民、偏遠地區、新住民子女等。',
]
export const budget = {total:250000, partner:222983, personal:27017, items:[
 ['來回經濟艙機票','臺灣至計畫執行地往返',20000],['零用金','青年零用金',5217],['保險費','簡章列明意外險至少 200 至 300 萬元，海外醫療險 20 至 50 萬元',1800],
] as const, partnerItems:[
 ['生活費','餐費、住宿費及當地交通費'],['跨城市交通費','跨城市移動所需的大眾運輸及租車等費用'],['活動及參訪費','美術館導覽、技術中心研修及 CERABO KUTANI 等活動或機構費用'],
 ['講師費','行前培訓講師鐘點費'],['設備費','電腦、儀器設備或軟體'],['場地費','計畫所需場地租借'],['翻譯費','課程及專業參訪口譯'],['印刷費','文件印刷及裝訂'],['雜支','郵資、資料蒐集與檢索等'],['行政管理費','計畫執行所需行政管理'],['業師費用','業師機票、保險、生活費及輔導費等'],
]}
export const training = [
 {when:'出國前約 14 日',title:'第一次培訓',text:'海外研修安全與健康管理、當地生活與交通說明、詳細行程與分組確認，以及教材導讀與預習。'},
 {when:'出國前約 7 日',title:'第二次培訓',text:'工房實作禮儀、服裝與護具、漆液過敏防護、部分區域攝影限制、個人紀錄片拍攝企畫及最終行前確認。'},
]
export const faq = [
 ['需要如何辦理簽證？','依計畫內容辦理所需簽證，並在規定出發日前取得。逾期未取得者視同放棄錄取資格，不得提出異議。'],
 ['錄取後有哪些全程參與義務？','錄取者須全程參與計畫行程，包含行前培訓、說明會、集訓及成果發表會。'],
 ['成果發表與行政作業有哪些要求？','錄取者須出席成果發表會，並配合合作單位相關行政作業。相關事項依本計畫簡章辦理。'],
 ['出國期間可以請假嗎？','圓夢期間不得因個人因素請假或無故缺席。無法全程參與視同未完成計畫，須繳回未執行日數或全部獎勵金。'],
 ['違反團體規範或法令會如何處理？','未依計畫學習、未遵守團體規範，或違反本國、當地國相關法令，將提早終止計畫執行或酌情追回部分或全部獎勵金。'],
]
